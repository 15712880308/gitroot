<template>
	<div class="wrap">
		<div class="box">
			<Row>
				<Col span="4">
					用户名：
				</Col>
				<Col span="20">
					<Input name="username" v-model="form.username"></Input>
				</Col>
			</Row>
			<Row>
				<Col span="4">
					密码：
				</Col>
				<Col span="20">
					<Input type="password" name="password" v-model="form.password"></Input>
				</Col>
			</Row>
			<Row>
				<Col span="4">
					&nbsp;
				</Col>
				<Col span="20">
					<Button :disabled="!(form.password != '' && form.username != '')" @click="login">登陆</Button>
				</Col>
			</Row>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
 
	export default {
		data(){
			return {
				form: {
					username : "",
					password : ""
				}
			}
		},
		methods : {
			login: async function(){
				const {result} = await axios.post("/api/login" , {
					username : this.form.username,
					password: this.form.password
				}).then(data=>data.data);

				if(result == -1){
					alert("登陆失败");
					return;
				}
				if(result == 1){
					this.$router.push({"name" : "index"});
				}
			}
		}
	}
</script>


<style lang="less" scoped>
	.wrap{
		position: fixed;
		width:100%;
		height:100%;
		background: -webkit-linear-gradient(top, #8BC34A, #4CAF50);
	}
	@w:500px;
	@h:200px;
	.box{
		position: absolute;
		width:@w;
		height:@h;
		background-color: white;
		top:50%;
		left:50%;
		margin-left:-@w/2;
		margin-top:-@h/2;
		box-shadow:0px 0px 2px black;
		border-radius:10px;
		padding:20px;
	}
	.ivu-row{
		height:50px;
	}
</style>