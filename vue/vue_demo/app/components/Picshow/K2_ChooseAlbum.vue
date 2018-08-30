<template>
	<div class="choosealbum">
		<ul>
			<li @click="changeAlbum('view')" :class="{'cur': nowalbum == 'view'}">外观({{images.view.length}})</li>
			<li @click="changeAlbum('inner')" :class="{'cur': nowalbum == 'inner'}">内饰({{images.inner.length}})</li>
			<li @click="changeAlbum('engine')" :class="{'cur': nowalbum == 'engine'}">发动机({{images.engine.length}})</li>
			<li @click="changeAlbum('more')" :class="{'cur': nowalbum == 'more'}">更多({{images.more.length}})</li>
		</ul>
	</div>
</template>

<script>
	export default {
		computed : {
			images(){
				return this.$store.state.picshowStore.result.images;
			},
			nowalbum(){
				return this.$store.state.picshowStore.nowalbum;
			}
		},
		methods : {
			changeAlbum(nowalbum){
				this.$store.dispatch("picshowStore/changeNowalbum" , {nowalbum});
			}
		}
	}
</script>

<style lang="less">
	.choosealbum{
		padding-top: 20px;
		ul{
			list-style: none;
		}
		li{
			box-sizing:border-box;
			float: left;
			width:50%;
			height:60px;
			border-right:6px solid black;
			background-color: rgba(255,255,255,.3);
			text-align: center;
			line-height:60px;
			font-size:20px;
			margin-bottom: 10px;
			cursor: pointer;

			&.cur{
				background-color: gold;
			}
		}
	}
</style>