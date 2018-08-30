//引入服务器依赖
var express=require("express");
//创建服务器
var app=express();
//设置端口号
app.listen(3000);
//设置根目录
app.use(express.static("www"));
//服务器接收数据的依赖
var formidable=require("formidable");

console.log(express.urlencoded)
//内置的文本文件读写依赖
var fs = require("fs");
//内置的读取url数据依赖
// var url = require("url");
//数据
var arr = [
	{"id" :1001, "name" : "王宝强"},
	{"id" :1002, "name" : "王宝璐"},
	{"id" :1003, "name" : "周杰伦"},
	{"id" :1004, "name" : "杨幂"},
	{"id" :1005, "name" : "鹿晗"}
];

//路由查询方法1   ?cd=1访问
// app.get("/student" , function(req,res){
// 	var cd = url.parse(req.url , true).query.cd;
// 	res.send("<p>" + arr[cd].id+arr[cd].name+"</p>");
// });
//当接收get请求的时候   给
app.get("/student",function(req,res){
		res.send(arr);
});
//路由查询方法2  
app.get("/student/:id" , function(req,res){
	var id = req.params.id;
	for(var i=0;i<arr.length;i++){
		if(""+arr[i].id===id){
			res.send("<h1>学号:&nbsp&nbsp" + arr[i].id + "</h1><h1>姓名:&nbsp&nbsp" + arr[i].name + "</h1>");
		}
	}
});
//当接收post请求的时候  增加
app.post("/student",function(req,res){
	var form=formidable.IncomingForm();
	form.parse(req,function(err,content){
		arr.push(content);
		//写入外部文件
		fs.appendFile("./jieguo.txt" , JSON.stringify(content),function(err,content){
		});
		//读取外部文件
		// fs.readFile("./结果.txt",JSON.parse(content),function(err,content){	
		// });
		res.send("ok");
	});
});
//当接收delete请求的时候  删除
app.delete("/student",function(req,res){
	var form=formidable.IncomingForm();
	form.parse(req,function(err,content){
		for(var i=0;i<arr.length;i++){
			if(arr[i].id+""===content.id){
				arr.splice(i,1);
			}
		}
		res.send("ok");
	});
});
//当接收patch请求的时候   改写
app.patch("/student",function(req,res){
	var form=formidable.IncomingForm();
	form.parse(req,function(err,content){
		for(var i=0;i<arr.length;i++){
			if(arr[i].id+""===content.id){
				arr[i].name=content.name;
			}
		}
		res.send("ok");
	});
});

