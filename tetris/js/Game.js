function Game(){
	//初始化dom
	this.init();
	//Block块实例
	this.b = new Block(this);
	//Map地图实例
	this.m = new Map(this);
	//定时器
	this.setI();
}
//初始化dom
Game.prototype.init=function(){
	this.dom=document.createElement("table");
	for(var i=0 ;i<20;i++){
		var tr=document.createElement("tr");
		for(var j=0 ;j<12;j++){
			var td=document.createElement("td");
			tr.appendChild(td);
		}
			this.dom.appendChild(tr);
	}
	document.body.appendChild(this.dom);
}
//清屏
Game.prototype.clearTable=function(){
	for(var i=0;i<20;i++){
		for(var j=0;j<12;j++){
				this.ranse(i,j,"");
		}
	}
}
//改变dom颜色方法(Map实例，Block实例)
Game.prototype.ranse=function(row,col,cla){
	this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].className=cla;
}
//块转化到Map上
Game.prototype.BtoM=function(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(this.b.rotates[i][j]!==0){
				this.m.plat[this.b.row+i][this.b.col+j]=this.b.rotates[i][j];
			}
		}
	}
}
//判断能否下移动
Game.prototype.goxia=function(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(this.b.rotates[i][j]!==0 && this.m.plat[this.b.row+i+1][this.b.col+j]!==0){
				return false;
			}
		}
	}
	return true;
}
//判断能否左移
Game.prototype.goleft=function(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(this.b.rotates[i][j]!==0 && this.m.plat[this.b.row+i][this.b.col+j-1]!==0){
				return false;
			}
		}
	}
	return true;
}
//判断能否右移
Game.prototype.goright=function(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(this.b.rotates[i][j]!==0 && this.m.plat[this.b.row+i][this.b.col+j+1]!==0){
				return false;
			}
		}
	}
	return true;
}
//判断能否旋转
Game.prototype.goRotates=function(){
	var n=this.b.rotateAll.length;
	var fix=this.b.fangxiang+1
	if(fix>=n){
		fix=0;
	}
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(this.b.rotateAll[fix][i][j]!==0 && this.m.plat[this.b.row+i][this.b.col+j]!==0)
			return false;
		}
	}
	return true;
}
//定时器
Game.prototype.setI=function(){
	//备份this
	var self=this;
	//设置帧
	var f=0;
	setInterval(function(){
		//清屏
		self.clearTable();
		//渲染块
		self.b.Branse();
		//渲染Map 
		self.m.Mranse();
		f++;
		//帧
		if(f%50===0){
			//默认能go下就to下
			if(self.goxia()){
				self.b.toxia();
			}else{
			//否则块转Map上,new出新块
				self.BtoM();
				self.b=new Block(self);
			}
			}
		//事件监听
		self.Event();
		//满足条件消行
		self.m.xiaohang();
	},20)
}
//写事件
Game.prototype.Event=function(){
	var self=this;
	document.onkeydown=function(event){
		if(event.keyCode===38 && self.goRotates()){
				self.b.toRotates();
		}else if(event.keyCode===40 && self.goxia()){
				self.b.toxia();
		}else if(event.keyCode===37 && self.goleft()){
				self.b.toleft();
		}else if(event.keyCode===39 && self.goright()){
				self.b.toright();
		}else if(event.keyCode===32 && self.goxia()){
				while(self.goxia()){
					self.b.toxia();
			}
		}
	}
}