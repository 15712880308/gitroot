import Index from "./components/Index/Index.vue";
import Carlist from "./components/Carlist/Carlist.vue";
import Kanming from "./components/Kanming/Kanming.vue";
import Login from "./components/Login/Login.vue";
import Layout_Main from "./layout/Layout_Main.vue";
import Layout_Sale from "./layout/Layout_Sale.vue";


export default [
	{
		path: '/login',
		component: Login,
		name: "login"
	},
	{
		path: '/index', 
		component: Layout_Main,
		children : [
			{
				name : "index",
				path: 'index',
				component: Index
			},
			{
				path: 'sale',
				component: Layout_Sale,
				children : [
					{
						name: "kanming",
						path: 'kanming',
						component: Kanming
					},
					{
						name: "carlist",
						path: 'carlist',
						component: Carlist
					}
				]
			}
		]
	},
	{
		path: "*",
		redirect: "/index/index"
	}
]

