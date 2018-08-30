import Vue from "vue";
import Vuex from "vuex";
import iview from "iview";
import VueRouter from "vue-router";
import store from "./stores/index.js";
import routes from "./routes.js";
import axios from "axios";

Vue.use(Vuex);
Vue.use(iview);
Vue.use(VueRouter);

const router =  new VueRouter({routes})

//前置守卫，检查是否已经登陆
router.beforeEach(async function(to, from, next){
	if(to.name != "login"){
		//发出Ajax请求，检查是否登陆
		const {login} = await axios.get("/api/login").then(data => data.data);
		if(!login){
			//如果没有登陆
			router.push({"name": "login"});
		}else{
			//如果登陆了，放行
			next();
		}
	}else{
		next();
	}
});

new Vue({
	el : "#app",
	render(h){
		return h({
			template : "<router-view></router-view>"
		});
	},
	store : new Vuex.Store(store),
	router
});