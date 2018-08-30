//块的构造函数数据来自blocktypes.js文件
function Block(game){
	this.game=game;
	this.type=["L","J","S","Z","O","I","T"][parseInt(Math.random()*7)];
	//一种方块所有方向
	this.rotateAll=blocktypes[this.type];
	//一种方块的方向随机数
	this.fangxiang=parseInt(Math.random()*this.rotateAll.length);
	//一种方块一种方向
	this.rotates=this.rotateAll[this.fangxiang];
	//实例在表格中的坐标
	this.row=0;
	this.col=4;
}
//Block块染色
Block.prototype.Branse=function(){
	for( i=0;i<4;i++){
		for( j=0;j<4;j++){
			if(this.rotates[i][j]!==0){
				this.game.ranse(this.row+i,this.col+j,"c"+this.rotates[i][j]);
			}
		}
	}
}

//向下移动
Block.prototype.toxia=function(){
	this.row++;
}
//向左移动
Block.prototype.toleft=function(){
	this.col--;
}
//向右移动
Block.prototype.toright=function(){
	this.col++;
}
//旋转
Block.prototype.toRotates=function(){

	var n=this.rotateAll.length;
	this.fangxiang++
	if(this.fangxiang>=n){
		this.fangxiang=0;
	}
	this.rotates=this.rotateAll[this.fangxiang];
}