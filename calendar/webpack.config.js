//Node 内置的 path
const path = require("path");

module.exports = {
	//入口
	entry : "./app/main.js" ,
	//出口
	output : {
		filename : "all.js" ,							//文件名
		publicPath : "dist"
	},
	//模式，表示当前是开发模式
	mode : "development",
	module : {
		rules : [
			{
				test : /\.js$/ ,			//所有以js结尾的文件
				loader : "babel-loader" ,	//要用babel-loader
				options : {					//选项
					presets : ["env","react"],// loader 的可选项
					plugins : ["transform-object-rest-spread"]
				},
			 	include: [					//哪个文件夹要翻译
          			path.resolve(__dirname, "app")
        		],
    		  	exclude: [					//排除哪个文件夹
         			path.resolve(__dirname, "node_modules")
        		]
			}
		]
	}
}