<template>
 	<div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" :active-name="aname" @on-select="selectHandler">
                    <Row>
                        <Col :span="3">
                            <div class="layout-logo"></div>
                        </Col>
                        <Col :span="10" :offset="8">
                             <div class="layout-nav">
                                <MenuItem name="index">
                                    <Icon type="ios-navigate"></Icon>
                                    首页
                                </MenuItem>
                                <MenuItem name="carlist">
                                    <Icon type="ios-keypad"></Icon>
                                    卖车
                                </MenuItem>
                            </div>
                        </Col>
                        <Col :span="3">
                            <div class="layout-userinfo" style="padding-top:8px;">
                                <img style="width:50px;float:left;margin-right:10px;" v-if="avatar" :src="'http://127.0.0.1:3000/images/avatar/' + avatar" alt="">
                                
                                    <Dropdown @on-click="DropdownclickHandler">
                                        <a href="javascript:void(0)">
                                            {{nickname}}
                                            <Icon type="arrow-down-b"></Icon>
                                        </a>
                                        <DropdownMenu slot="list" >
                                            <DropdownItem name="personinfo">个人信息</DropdownItem>
                                            <DropdownItem name="logout">退出登陆</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                            </div>
                        </Col>
                    </Row>
                </Menu>
            </Header>
            <router-view></router-view>
         
        </Layout>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        created(){
            this.$store.dispatch("userinfoStore/fetchServer");
        },
        methods : {
            selectHandler(name){
                this.$router.push({"name" : name});
            },
            DropdownclickHandler(name){
                if(name == "logout"){
                    axios.get("/api/logout");
                }
            }
        },
        computed : {
            aname(){
                if(this.$router.history.current.fullPath.indexOf("/index/index") != -1){
                    return "index";
                }else if(this.$router.history.current.fullPath.indexOf("/index/sale") != -1){
                    return "carlist"
                }
            },
            avatar(){
                return this.$store.state.userinfoStore.avatar;
            },
            nickname(){
                return this.$store.state.userinfoStore.nickname;
            }
        }
    }
</script>

<style lang="less">
	.layout-logo{
        margin-top: 16px;
	    width: 100px;
	    height: 30px;
	    background: #5b6270;
	}
    .layout-nav{
        float: right;
        line-height:60px;
    }
    .layout-userinfo{
        color:white;
        line-height: 40px;
        a{
            color:white;
        }
    }
</style>