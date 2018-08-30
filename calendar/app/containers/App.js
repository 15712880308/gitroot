import React from "react";
import classnames from "classnames";
export default class App extends React.Component{
	constructor(){
		super();
		var time=new Date();
		this.state={
			nian:time.getFullYear(), //年
			yue:time.getMonth(),	//月
			ri:time.getDate(),  	//日
			xingqi:new Date(time.getFullYear(),time.getMonth()).getDay(),	//本月初星期
			ben:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
			prev:[21,22,23,24,25,26,27,28,29,30,31],
			next:[1,2,3,4,5,6,7,8,9,10,11,12,13,14]
		}
	}
	//本月的天数
	benyue(){
		const s=new Date(this.state.nian,this.state.yue+1,-0).getDate();
		return s
	}
	//下月的天数数组
	xiayue(){
		const s=new Date(this.state.nian,this.state.yue+2,-0).getDate();
		return s
	}
	//上月的天数数组
	shangyue(){
		const s=new Date(this.state.nian,this.state.yue,-0).getDate();
		return s
	}
	jia(a,b,c){
		this.setState({
			yue:this.state.yue+a,	//月
			ri:1,
			xingqi:new Date(this.state.nian,this.state.yue+a).getDay(),	//星期
		})
		if(this.state.yue===b){
				this.setState({
				nian:this.state.nian+a,
				yue:c,	//月
				ri:1,
				xingqi:new Date(this.state.nian+a,c).getDay(),	//星期
			})
		}	
	}
	//复用函数
	sange(a,b){
		let Plength;
		if(this.state.xingqi===0){
		Plength=7;
		}else{
		 Plength=this.state.xingqi;
		}
		const arr=this.state.ben.filter(val=>val>a-Plength&&val<=b-Plength)
		.map(val=><td key={Math.random()*9999} className={classnames({"red":this.state.ri===val})}>{val}</td>);
		return arr;
	}
	render(){
		let Plength;
		if(this.state.xingqi===0){
		Plength=7;
		}else{
		 Plength=this.state.xingqi;
		}
		{/*筛选*/}
		let arrP,arrB1,arrB2,arrB3,arrB4,arrB5,arrB6,arrB7,arrN1,arrN2,arrN3;
			arrP=this.state.prev.filter(val=>val<=this.shangyue() &&val > (this.shangyue()-Plength))
			.map(val=><td key={Math.random()*9999} style={{
			"color":"#cad"
			}}>{val}</td>);
		{/*上一行*/}
			arrB1=this.state.ben.filter(val=>val<=7-Plength)
			.map(val=><td key={Math.random()*9999} className={classnames({"red":this.state.ri===val})}>{val}</td>);
			arrB2=this.sange(7,14);
			arrB3=this.sange(14,21);
			arrB4=this.sange(21,28);
		{/*下两行*/}
		let ft=42-Plength-this.benyue()>=7;
		{/*true*/}
			arrB5=this.sange(28,this.benyue()+Plength);
			arrN1=this.state.next.filter(val=>val<=(42-Plength-this.benyue())-7)
			.map(val=><td key={Math.random()*9999} style={{"color":"#cad"}}>{val}</td>);
			arrN2=this.state.next.filter(val=>val>(42-Plength-this.benyue())-7 &&val<=42-Plength-this.benyue())
			.map(val=><td key={Math.random()*9999} style={{"color":"#cad"}}>{val}</td>);
		{/*false*/}
		 	arrB6=this.sange(28,35);
			arrB7=this.sange(35,this.benyue()+Plength);
			arrN3=this.state.next.filter(val=>val<=(42-Plength-this.benyue()))
			.map(val=><td key={Math.random()*9999} style={{"color":"#cad"}}>{val}</td>);
		
		return(
			<div>
			<button onClick={e=>this.jia(-1,0,11)} ref="0">上个月</button>    
			{this.state.nian}年{this.state.yue+1}月    
			<button onClick={e=>this.jia(1,11,0)}>下个月</button>
				<table>
					<thead>
						<tr>
							<th>日</th>
							<th>one</th>
							<th>tow</th>
							<th>three</th>
							<th>四</th>
							<th>五</th>
							<th>六</th>
						</tr>
					</thead>
					<tbody>
						<tr>{arrP}{arrB1}</tr>
						<tr>{arrB2}</tr>
						<tr>{arrB3}</tr>
						<tr>{arrB4}</tr>
						<tr>{ft?arrB5:arrB6}{ft?arrN1:false}</tr>
						<tr>{ft?arrN2:arrB7}{ft?false:arrN3}</tr>
					</tbody>
				</table>
			</div>
		)
	}
}