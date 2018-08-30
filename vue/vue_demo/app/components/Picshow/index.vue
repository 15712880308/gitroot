<template>
	<div class="picshow" v-if="images[nowalbum].length != 0">
		<img :src="`carimages/${id}/${nowalbum}/${images[nowalbum][nowidx]}`" width="600px"/>
		<button @click="goNext">下一张</button>
		<div class="rightPart">
			<K1_CarInfo></K1_CarInfo>
			<K2_ChooseAlbum></K2_ChooseAlbum>
			<K3_SmallNav></K3_SmallNav>
		</div>
	</div>
</template>

<script>
	import K1_CarInfo from "./K1_CarInfo.vue";
	import K2_ChooseAlbum from "./K2_ChooseAlbum.vue";
	import K3_SmallNav from "./K3_SmallNav.vue";

	export default {
		beforeCreate(){
			this.$store.dispatch("picshowStore/fetchServer" , {"id" : 1000001});
		},
		components : {
			K1_CarInfo,
			K2_ChooseAlbum,
			K3_SmallNav,
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
			nowidx(){
				return this.$store.state.picshowStore.nowidx;
			}
		},
		methods : {
			goNext(){
				this.$store.dispatch("picshowStore/goNext");
			}
		}
	}
</script>

<style lang="less">
	*{
		margin:0;
		padding:0;
	}
	.picshow{
		position: absolute;
		width:100%;
		height:100%;
		top:0;
		left:0;
		background-color: black;
		color:white;

		.rightPart{
			position: absolute;
			right:0;
			top:0;
			width:310px;
			height:100%;
			border-left:1px solid #ccc;
			padding:6px;
		}
	}
</style>