const express = require("express");
const mongoose = require("mongoose");
const formidable = require("formidable");
var session = require('express-session');
const url = require("url");
const crypto = require("crypto");
const app = express();
mongoose.connect("mongodb://127.0.0.1/ershouche");


app.use("/images" , express.static("images"));

 
app.set('trust proxy', 1) // trust first proxy
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized : true
}));


//创建数据库的model
const Car = mongoose.model("Car" , {
	"id" 		: Number,
	"brand" 	: String,
	"series" 	: String,
	"price" 	: Number,
	"km" 		: Number,
	"images" 	: Object,
	"color" 	: String,
	"type"		: String,
	"gearbox"   : String,
	"engine"	: String,
	"license"	: Boolean
});

const User = mongoose.model("User" , {
	"username" 		: String,
	"password" 		: String,
	"type" 			: String,
	"avatar"		: String,
	"nickname"		: String
});



//查询是否登陆
app.get("/login" , (req,res) => {
	res.json({"login" : req.session.login == true});
});

app.get("/logout" , (req,res) => {
	req.session.login = false;
	res.json({"result" : 1});
});


//查询登陆这个人的信息
app.get("/userinfo" , (req,res)=>{
	//如果没有登陆就报错
	if(!req.session.login){
		res.json({"userinfo" : -1});
		return;
	}

	User.find({username : req.session.username} , (err , docs)=>{
		res.json({"userinfo" : docs[0]});
	});
});

//登陆
app.post("/login" , (req,res)=>{
	var form = new formidable.IncomingForm();
	form.parse(req , (err , fileds) => {
		var username = fileds.username;
		var password = fileds.password;

		password = crypto.createHash('sha256').update(password).digest("hex");

		//数据库查询
		User.find({username , password} , (err , docs) => {
			if(docs.length != 0){
				//登陆成功
				req.session.login = true;
				req.session.username = docs[0].username;
				res.json({"result" : 1});
			}else{
				//登陆失败
				res.json({"result" : -1});
			}
		});
	});
})


//查某某个id的车辆
app.get("/cars" , (req,res)=>{
	var id = url.parse(req.url , true).query.id;
	Car.find({"id" : id}).exec((err , docs) => {
		res.json({"result" : docs[0]});
	});
});


//查询接口
app.post("/carsearch" , (req,res)=>{
	var form = new formidable.IncomingForm();
	form.parse(req , (err , fileds) => {
		console.log(fileds);

		//页码
		var page = fileds.page;
		//页面尺寸
		var pagesize = fileds.pagesize;

		//查询对象
		var searchOBJ = {};
		//品牌加进去
		if(fileds.brand != ""){
			searchOBJ.brand = fileds.brand;
		}
		//车系加进去
		if(fileds.series != ""){
			searchOBJ.series = fileds.series;
		}
		//颜色加进去
		if(fileds.color != ""){
			searchOBJ.color = fileds.color.split(",");
		}
		//价格加进去
		if(fileds.price != ""){
			var arr = fileds.price.split(",");
			searchOBJ.price = {"$gte" : arr[0] , "$lte" : arr[1]};
		}
		//公里数加进去
		if(fileds.km != ""){
			var arr = fileds.km.split(",");
			searchOBJ.km = {"$gte" : arr[0], "$lte" : arr[1]};
		}
		//类型加进去
		if(fileds.type != ""){
			searchOBJ.type = fileds.type.split(",");
		}
		//变速箱加进去
		if(fileds.gearbox != ""){
			searchOBJ.gearbox = fileds.gearbox.split(",");
		}
		//发动机加进去
		if(fileds.engine != ""){
			searchOBJ.engine = fileds.engine.split(",");
		}
		//是否上牌加进去
		if(fileds.license != ""){
			searchOBJ.license = fileds.license == 1;
		}

		console.log(searchOBJ);

	

		Car.count(searchOBJ , (err , count) => {
			Car.find(searchOBJ).skip((page - 1) * pagesize).limit(pagesize).exec((err , docs) => {
				res.json({"results" : docs , count});
			});
		});
	});
});

app.listen(3000);