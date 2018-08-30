import axios from "axios";

export default {
	namespaced: true,
	state : {
		nickname : "",
		avatar : "",
		type : ""
	},
	//同步
	mutations : {
		setNickname(state , {nickname}){
			state.nickname = nickname;
		},
		setAvatar(state , {avatar}){
			state.avatar = avatar;
		},
		setType(state , {type}){
			state.type = type;
		}
	},
	//有副作用
	actions : {
		async fetchServer(context){
			const {userinfo} = await axios.get("/api/userinfo").then(data=>data.data);
			context.commit("setNickname" , {nickname : userinfo.nickname});
			context.commit("setAvatar" , {avatar : userinfo.avatar});
			context.commit("setType" , {type : userinfo.type});
		}
	}
}