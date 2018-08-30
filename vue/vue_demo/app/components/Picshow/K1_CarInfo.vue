<template>
	<div class="carinfo">
		<h1>{{result.brand + result.series}} <small>{{result.id}}</small></h1>
		<h4>{{result.color}}色{{result.price}}万元{{km}}公里</h4>
	</div>
</template>

<script>
	export default {
		computed : {
			result(){
				return this.$store.state.picshowStore.result;
			},
			km(){
				return Math.round(this.result.km / 10000)
			}
		}
	}
</script>

<style lang="less">
	.carinfo{
		
	}
</style>