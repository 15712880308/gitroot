function Map(game){
	this.game=game;
	this.plat=[
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[]
	]
}
//Map染色
Map.prototype.Mranse=function(){
	for(var i=0;i<20;i++){
		for(var j=0;j<12;j++){
			if(this.plat[i][j]!==0){
				this.game.ranse(i,j,"c"+this.plat[i][j]);
			}
		}
	}
}
//消行
Map.prototype.xiaohang=function(){
	for(var i=0;i<20;i++){
		if(this.plat[i].indexOf(0)===-1){
			this.plat.splice(i,1);
			this.plat.unshift([0,0,0,0,0,0,0,0,0,0,0,0]);
		}
	}
}