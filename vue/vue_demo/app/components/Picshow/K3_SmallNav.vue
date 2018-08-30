<template>
	<div class="smallnav" ref="smallnav">
		<div class="unit" ref="unit">
			<ul v-for="i in allpage">
				<li v-for="(j , index) in images[nowalbum].slice((i - 1) * 4 , i * 4)"  :class="{'cur' : (i - 1) * 4 + index == nowidx}" @click="changeNowidx((i - 1) * 4 + index)">
					<img :src="`carimages_small/${id}/${nowalbum}/${j}`"/>
				</li>
			</ul>
		</div>

		<div ref="bar" class="bar" v-show="allpage != 1">
			<span v-for="(i , index) in allpage" :style="'width:' + (parseInt(310 / allpage) - 10) +'px'"  :data-idx="index" ></span>
		</div>
	</div>
</template>

<script>
	export default {
		//更新生命周期
		updated(){
			//换页span加cur
			const nowpage = Math.floor(this.$store.state.picshowStore.nowidx / 4);
			$(this.$refs.bar).find("span").eq(nowpage).addClass('cur').siblings().removeClass('cur');

			$(this.$refs.unit).css({"left" : nowpage * -310});
		},
		//上树生命周期
		mounted(){
			var self = this;

			//换页span加cur
			const nowpage = Math.floor(this.$store.state.picshowStore.nowidx / 4);
			$(this.$refs.bar).find("span").eq(nowpage).addClass('cur').siblings().removeClass('cur');

			//点击换页span的事件，事件委托
			$(this.$refs.bar).delegate("span" , "mouseenter" , function(){
				 
				$(this).addClass('cur').siblings().removeClass('cur');
				$(self.$refs.unit).stop(true).animate({"left" : $(this).data("idx") * -310},400);
			});

			//鼠标离开拉回
			$(this.$refs.smallnav).mouseleave(function(){
				const nowpage = Math.floor(self.$store.state.picshowStore.nowidx / 4);
				$(self.$refs.unit).animate({"left" : nowpage* -310},400);
				$(self.$refs.bar).find("span").eq(nowpage).addClass('cur').siblings().removeClass('cur');
			});
		},
		computed : {
			images(){
				return this.$store.state.picshowStore.result.images;
			},
			nowalbum(){
				return this.$store.state.picshowStore.nowalbum;
			},
			id(){
				return this.$store.state.picshowStore.result.id;
			},
			allpage(){
				return Math.ceil(this.images[this.nowalbum].length / 4);
			},
			nowidx(){
				return this.$store.state.picshowStore.nowidx;
			}
		},
		methods : {
			changeNowidx(nowidx){
				this.$store.commit("picshowStore/changeNowidx" , {nowidx})
			} 
		}
	}
</script>

<style lang="less">
	.smallnav{
		clear: both;
		overflow: hidden;
		height:300px;

		.unit{
			width:8000px;
			position: relative;
			 

			ul{
				list-style: none;
				float: left;
				width:320px;

				li{
					float: left;
					width:150px;
					margin-right: 6px;
					position: relative;

					&:nth-child(2n){
						margin-right:0;
					}

					&::before{
						content:"";
						position: absolute;
						width:100%;
						height:100%;
						background-color: rgba(0,0,0,.6);
					}
					&.cur::before{
						display: none;
					}

					img{
						width: 100%;
					}
				}
			}
		}

		.bar{
			clear: both;

			span{
				float: left;
				height:16px;
				background: #eee;
				border-right:10px solid black;

				&.cur{
					background-color: gold;
				};

				&:last-child{
					border-right:none;
				}
			}
		}
	}
</style>