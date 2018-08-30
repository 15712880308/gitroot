<template>
	<div>
        <Row>
            <Col :span="4">颜色</Col>
            <Col :span="20">
                <CheckboxGroup v-model="color">
                    <Checkbox v-for="item in colorOptions" :key="item" :label="item">
                        <span>{{item}}</span>
                    </Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>
        <Row>
            <Col :span="4">发动机</Col>
            <Col :span="20">
                <CheckboxGroup v-model="engine">
                    <Checkbox v-for="item in engineOptions" :key="item" :label="item">
                        <span>{{item}}</span>
                    </Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>
        <Row>
            <Col :span="4">变速箱</Col>
            <Col :span="20">
                <CheckboxGroup v-model="gearbox">
                    <Checkbox v-for="item in gearboxOptions" :key="item" :label="item">
                        <span>{{item}}</span>
                    </Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>
        <Row>
            <Col :span="4">售价</Col>
            <Col :span="20">
                <Slider range :min="0" :max="100" :value="price" @on-change="changePrice"></Slider>
            </Col>
        </Row>
         <Row>
            <Col :span="4">公里数</Col>
            <Col :span="20">
                <Slider range :min="0" :max="100" :value="km" @on-change="changeKm"></Slider>
            </Col>
        </Row>

        <Row style="height:30px;">
            <Col :span="24">
                <Tag closable v-for="item in tags" :key="item.k" @on-close="delTag(item.k)">{{item.k}}：{{item.v}}</Tag>
            </Col>
        </Row>
        <Row>
            <Col  :span="24" >
                共找到{{$store.state.carlistStore.count}}个车符合条件
            </Col>
        </Row>
       
        <Table :columns="col"  :data="$store.state.carlistStore.results"></Table>
        <Page :total="$store.state.carlistStore.count" :page-size="$store.state.carlistStore.pagesize" :page-size-opts="[3,5,10,20]" @on-change="changePage" @on-page-size-change="changePagesize"></Page>
	</div>
</template>

<script>
	export default {
        //上树之前，这是10个生命周期中的最早的周期
        // beforeCreate、created、beforeMounted、mounted、beforeUpdate、updated、beforeDestroy、destroyed、beforeActive、actived。
		mounted(){
			this.$store.dispatch("carlistStore/fetchServer");
		},
		data(){
			return {
                colorOptions : ["红","黄","蓝","绿","黑","白","灰"],
                engineOptions : ["1.0T","1.0L","1.2T","1.2L","1.4T","1.4L","1.6T","1.6L","1.8T","1.8L","2.0T"],
                gearboxOptions : ["手动","自动","手自一体"],
                tags : [],
				col: [
					{
                        title: '缩略图',
                        key: 'images',
                        render(h , {row}){
                        	return h({
                        		template : "<img src='carimages_small/" + row.id + "/view/" + row.images.view[0]  + "'/>"
                        	});
                        }
                    },
                    {
                        title: '品牌',
                        key: 'brand'
                    },
                    {
                        title: '车系',
                        key: 'series'
                    },
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: '价格',
                        key: 'price'
                    },
                    {
                        title: '公里数（万公里)',
                        key: 'km',
                        render(h , {row}){
                            return h({
                                template : "<div>" + Math.round(row.km / 1000) / 10 + "</div>"
                            })
                        }
                    },
                    {
                        title: '变速箱',
                        key: 'gearbox'
                    },
                    {
                        title: '发动机',
                        key: 'engine'
                    },
                    {
                        title: '是否上牌',
                        key: 'license',
                        render(h , {row}){
                            return h({
                                template : "<div>" + (row.license ? "是" : "否") +"</div>"
                            })
                        }
                    }
                ]
			}
		},
        methods : {
            changePage(page){
                this.$store.dispatch("carlistStore/changePage" , {page});
            },
            changePagesize(pagesize){
                this.$store.dispatch("carlistStore/changePagesize" , {pagesize});
            },
            delTag(k){
                this.tags = this.tags.filter(item=>item.k != k);
                if(k == "颜色"){
                    this.$store.dispatch("carlistStore/changeColor" , {"color" : ""});
                }else if(k == "发动机"){
                    this.$store.dispatch("carlistStore/changeEngine" , {"engine" : ""});
                }else if(k == "变速箱"){
                    this.$store.dispatch("carlistStore/changeGearbox" , {"gearbox" : ""});
                }else if(k == "价格"){
                    this.$store.dispatch("carlistStore/changePrice" , {"price" : ""});
                }else if(k == "公里数"){
                    this.$store.dispatch("carlistStore/changeKm" , {"km" : ""});
                }else if(k == "是否含牌照"){
                    this.$store.dispatch("carlistStore/changeLicense" , {"license" : ""});
                }
            },
            setTag(k , v){
                var isExist = false;
                this.tags.forEach(item=>{
                    if(item.k == k){
                        item.v = v;
                        isExist = true; //存在了
                    }
                });
                if(!isExist){
                    this.tags.push({k,  v});
                }
            },
            changePrice(v){
                //发到store中，在actions中进行真正的ajax检索
                this.$store.dispatch("carlistStore/changePrice" , {"price" : v.join(",")});
                //设置Tag
                this.setTag("价格" , v[0] + "万元 到 " + v[1] + "万元");
                //删除项
                if(v[0] == 0 && v[1] == 100){
                    this.delTag("价格");
                }
            },
            changeKm(v){
                //发到store中，在actions中进行真正的ajax检索
                this.$store.dispatch("carlistStore/changeKm" , {"km" : v.map(item=>item*10000).join(",")});
                //设置Tag
                this.setTag("公里数" , v[0] + "万公里 到 " + v[1] + "万公里");
                //删除项
                if(v[0] == 0 && v[1] == 100){
                    this.delTag("公里数");
                }
            }
        },
        computed : {
            color: {
                get(){
                    if(this.$store.state.carlistStore.color != ""){
                        return this.$store.state.carlistStore.color.split(",");
                    }else{
                        return [];
                    }
                },
                set(v){
                    //发到store中，在actions中进行真正的ajax检索
                    this.$store.dispatch("carlistStore/changeColor" , {"color" : v.join(",")});
                    //设置Tag
                    this.setTag("颜色" , v.join(" 或 "));
                    //删除项
                    if(v.length == 0){
                        this.delTag("颜色");
                    }
                }
            },
            engine: {
                get(){
                    if(this.$store.state.carlistStore.engine != ""){
                        return this.$store.state.carlistStore.engine.split(",");
                    }else{
                        return [];
                    }
                },
                set(v){
                    //发到store中，在actions中进行真正的ajax检索
                    this.$store.dispatch("carlistStore/changeEngine" , {"engine" : v.join(",")});
                    //设置Tag
                    this.setTag("发动机" , v.join(" 或 "));
                    //删除项
                    if(v.length == 0){
                        this.delTag("发动机");
                    }
                }
            },
            gearbox: {
                get(){
                    if(this.$store.state.carlistStore.gearbox != ""){
                        return this.$store.state.carlistStore.gearbox.split(",");
                    }else{
                        return [];
                    }
                },
                set(v){
                    //发到store中，在actions中进行真正的ajax检索
                    this.$store.dispatch("carlistStore/changeGearbox" , {"gearbox" : v.join(",")});
                    //设置Tag
                    this.setTag("变速箱" , v.join(" 或 "));
                    //删除项
                    if(v.length == 0){
                        this.delTag("变速箱");
                    }
                }
            },
            price: {
                get(){
                    if(this.$store.state.carlistStore.price != ""){
                        var arr = this.$store.state.carlistStore.price.split(",");
                        return arr;
                    }else{
                        return [0,100];
                    }
                }
            },
            km: {
                get(){
                    if(this.$store.state.carlistStore.km != ""){
                        var arr = this.$store.state.carlistStore.km.split(",").map(item=>item/10000);
                        return arr;
                    }else{
                        return [0,200];
                    }
                }
            },
            license : {
                get(){
                    if(this.$store.state.carlistStore.license != ""){
                        return this.$store.state.carlistStore.license;
                    }else{
                        return 0;
                    }
                },
                set(v){
                    //发到store中，在actions中进行真正的ajax检索
                    this.$store.dispatch("carlistStore/changeLicense" , {"license" : v});
                    //设置Tag
                    this.setTag("是否含牌照" , v == 1 ? "是" : "否");

                    //删除项
                    if(v == 0){
                        this.delTag("是否含牌照");
                    }
                }
            },
        }
	}
</script>


<style lang="less" scoped>
	.ivu-row{
        height:30px;
    }
</style>