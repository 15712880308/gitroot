import axios from "axios";

async function loadData({state , commit}){
	//带着全部参数去请求服务器的数据
	const {count , results} = await axios.post('/api/carsearch', {
	  	page : state.page,
	  	pagesize : state.pagesize ,
	  	color : state.color ,
	  	price : state.price ,
	  	type : state.type ,
	  	km : state.km,
	  	gearbox : state.gearbox,
	  	engine : state.engine,
	  	series : state.series,
	  	brand : state.brand,
	  	license : state.license
  	}).then(response => {
    	return response.data;
  	});

  	commit("changeResults" , {results});
	commit("changeCount" , {count});
} 

export default {
	namespaced: true,
	state : {
		page : 1,
		pagesize : 3,
		brand : "",
		series : "",
		color : "",
		price : "",
		km : "",
		type : "",
		gearbox : "",
		engine : "",
		license : "",
		results : [] ,
		count : 0 
	},
	//同步
	mutations : {
		changeResults(state , {results}){
			state.results = results;
		},
		changeCount(state, {count}){
			state.count = count;
		},
		changePage(state, {page}){
			state.page = page;
		},
		changePagesize(state, {pagesize}){
			state.pagesize = pagesize;
		},
		changeColor(state , {color}){
			state.color = color;
		},
		changeEngine(state , {engine}){
			state.engine = engine;
		},
		changeGearbox(state , {gearbox}){
			state.gearbox = gearbox;
		},
		changePrice(state , {price}){
			state.price = price;
		},
		changeKm(state , {km}){
			state.km = km;
		},
		changeLicense(state , {license}){
			state.license = license;
		}
	},
	//有副作用
	actions : {
		fetchServer(context){
			loadData(context);
		},
		async changePage(context , {page}){
			context.commit("changePage" , {page});
			loadData(context);
		},
		async changePagesize(context , {pagesize}){
			context.commit("changePagesize" , {pagesize});
			context.commit("changePage" , {page : 1});
			loadData(context);
		},
		async changeColor(context , {color}){
			context.commit("changeColor" , {color});
			loadData(context);
		},
		async changeEngine(context , {engine}){
			context.commit("changeEngine" , {engine});
			loadData(context);
		},
		async changeGearbox(context , {gearbox}){
			context.commit("changeGearbox" , {gearbox});
			loadData(context);
		},
		async changePrice(context , {price}){
			context.commit("changePrice" , {price});
			loadData(context);
		},
		async changeKm(context , {km}){
			context.commit("changeKm" , {km});
			loadData(context);
		},
		async changeLicense(context , {license}){
			context.commit("changeLicense" , {license});
			loadData(context);
		}
	}
}