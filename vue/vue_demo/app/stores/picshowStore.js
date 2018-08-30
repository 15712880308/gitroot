export default {
	namespaced: true,
	state : {
		nowalbum : "view",
		nowidx : 0,
		//汽车信息
		result : {
			images : {
				view : [],
				inner : [],
				engine : [],
				more : []
			}
		} 
	},
	//同步
	mutations : {
		changeResult(state , {result}){
			state.result = result;
		},
		changeNowalbum(state , {nowalbum}){
			state.nowalbum = nowalbum;
		},
		changeNowidx(state , {nowidx}){
			state.nowidx = nowidx;
		}
	},
	//有副作用
	actions : {
		async fetchServer({commit} , {id}){
			const {result} = await fetch("/api/cars?id=" + id).then(data => data.json());
			commit("changeResult" , {result});
		},
		changeNowalbum({commit} , {nowalbum}){
			commit("changeNowalbum" , {nowalbum});
			commit("changeNowidx" , {nowidx : 0});
		},
		goNext({commit , state}){
			if(state.nowidx < state.result.images[state.nowalbum].length - 1){
				commit("changeNowidx" , {nowidx : state.nowidx + 1});
			}else{
				commit("changeNowidx" , {nowidx : 0});
				const arr = ["view", "inner", "engine", "more"];
				var _iii = arr.indexOf(state.nowalbum);
				_iii++;
				_iii %= 4;
				commit("changeNowalbum" , {nowalbum : arr[_iii]});
			}
		}
	},
	getters : {
		lifang(state){
			 
			return state.nowidx * state.nowidx * state.nowidx;
		}
	}
}