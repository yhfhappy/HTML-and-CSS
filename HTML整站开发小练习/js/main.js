/*
JavaScript Document

如何在一个网站或者一个页面，去书写你的JS代码：
	1.js的分层(功能) : jquery(tools)  组件(ui：尽量自己来写)  应用(app), mvc(backboneJs)
	2.js的规划(管理) : 避免全局变量和方法(命名空间，闭包，面向对象) , 模块化(seaJs,requireJs)

	var mv = {};
	mv.tools = {};
	mv.ui = {};
	mv.app = {};
	mv.app.toTip = function(){};
*/

window.onload = function(){
	mv.app.toTip();
	mv.app.toBanner();
	mv.app.toSel();
	mv.app.toRun();
};

//首先声明一个 mv 的全局对象；
//1. 命名空间
var mv = {};

//2. 功能性对象;
mv.tools = {};

mv.tools.getByClass = function(oParent,sClass){
	var aEle = oParent.getElementsByTagName('*');
	var arr = [];
	
	for(var i=0;i<aEle.length;i++){
		if(aEle[i].className == sClass){
			arr.push(aEle[i]);
		}
	}
	
	return arr;
};

mv.tools.getStyle = function(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,false)[attr];
	}
};

/********** UI **********/
mv.ui = {};

// UI-1：改变输入框获取和失去焦点是文本的状态；
mv.ui.textChange = function(obj,str){
	// 获取焦点：onfocus
	/*说明：
		1.如果输入框有值；
		2.且这个值和原本的提示值相等；
		3.说明这个值不是后期期望输入的值；
		4.最后，清空这个默认值；
	*/
	obj.onfocus = function(){
		if(this.value == str){
			this.value = '';
		}
	};
	
	// 离开焦点：onblur
	/*说明：
		1.如果输入框的值为空，则变成默认值；
		2.其它状态则不做处理；
	*/
	obj.onblur = function(){
		if(this.value == ''){
			this.value = str;
		}
	};
	
};

// UI-2：
mv.ui.fadeIn = function(obj){
	
	var iCur = mv.tools.getStyle(obj,'opacity');
	if(iCur==1){ return false; }
	
	var value = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iSpeed = 5;
		if(value == 100){
			clearInterval(obj.timer);
		}
		else{
			value += iSpeed;
			obj.style.opacity = value/100;
			obj.style.filter = 'alpha(opacity='+value+')';
		}
	},30);
	
};

mv.ui.fadeOut = function(obj){
	
	var iCur = mv.tools.getStyle(obj,'opacity');
	if(iCur==0){ return false; }
	
	var value = 100;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iSpeed = -5;
		if(value == 0){
			clearInterval(obj.timer);
		} else{
			value += iSpeed;
			obj.style.opacity = value/100;
			obj.style.filter = 'alpha(opacity='+value+')';
		}
	},30);
	
};

mv.ui.moveLeft = function(obj,old,now){
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		
		var iSpeed = (now - old)/10;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		
		if(now == old){
			clearInterval(obj.timer);
		}
		else{
			old += iSpeed;
			obj.style.left = old + 'px';
		}
		
	},30);
	
};

mv.app = {};

/********** APP **********/
/* 这个效果可以复用，所以应该写到UI组件上，以便以后再用 */
mv.app.toTip = function(){
	var oText1 = document.getElementById('text1');
	var oText2 = document.getElementById('text2');
	
	mv.ui.textChange(oText1,'Search website');
	mv.ui.textChange(oText2,'Search website');
	
};

/* banner图片轮播 */
mv.app.toBanner = function(){
	var oDd = document.getElementById('ad');
	var aLi = oDd.getElementsByTagName('li');
	
	var oPrevBg = mv.tools.getByClass(oDd,'prev_bg')[0];
	var oNextBg = mv.tools.getByClass(oDd,'next_bg')[0];
	
	var oPrev = mv.tools.getByClass(oDd,'prev')[0];
	var oNext = mv.tools.getByClass(oDd,'next')[0];
	
	var iNow = 0;
	
	var timer = setInterval(auto,3000);
	
	function auto(){
		
		if(iNow == aLi.length-1){
			iNow = 0;
		} else{
			iNow++;
		}
		
		for(var i=0;i<aLi.length;i++){
			mv.ui.fadeOut(aLi[i]);
		}
		
		mv.ui.fadeIn(aLi[iNow]);
		
	};
	
	function autoPrev(){
		
		if(iNow == 0){
			iNow = aLi.length-1;
		} else{
			iNow--;
		}
		
		for(var i=0;i<aLi.length;i++){
			mv.ui.fadeOut(aLi[i]);
		}
		
		mv.ui.fadeIn(aLi[iNow]);
		
	};
	
	oPrevBg.onmouseover = oPrev.onmouseover = function(){
		oPrev.style.display = 'block';
		clearInterval(timer);
	};
	
	oNextBg.onmouseover = oNext.onmouseover = function(){
		oNext.style.display = 'block';
		clearInterval(timer);
	};
	
	oPrevBg.onmouseout = oPrev.onmouseout = function(){
		oPrev.style.display = 'none';
		timer = setInterval(auto,3000);
	};
	
	oNextBg.onmouseout = oNext.onmouseout = function(){
		oNext.style.display = 'none';
		timer = setInterval(auto,3000);
	};
	
	oPrev.onclick = function(){
		autoPrev();
	};
	
	oNext.onclick = function(){
		auto();
	};
	
};

mv.app.toSel = function(){
	var oSel = document.getElementById('sel1');
	var aDd = oSel.getElementsByTagName('dd');
	var aUl = oSel.getElementsByTagName('ul');
	var aH2 = oSel.getElementsByTagName('h2');
	
	for(var i=0;i<aDd.length;i++){
		aDd[i].index = i;
		aDd[i].onclick = function(ev){
			var ev = ev || window.event;
			var This = this;
			
			for(var i=0;i<aUl.length;i++){
				aUl[i].style.display = 'none';
			}
			
			aUl[this.index].style.display = 'block';
			
			document.onclick = function(){
				aUl[This.index].style.display = 'none';
			};
			
			ev.cancelBubble = true;
			
		};
		
	}
	
	for(var i=0;i<aUl.length;i++){
		
		aUl[i].index = i;
		
		(function(ul){
			
			var aLi = ul.getElementsByTagName('li');
			
			for(var i=0;i<aLi.length;i++){
				aLi[i].onmouseover = function(){
					this.className = 'active';
				};
				aLi[i].onmouseout = function(){
					this.className = '';
				};
				aLi[i].onclick = function(ev){
					var ev = ev || window.event;
					aH2[this.parentNode.index].innerHTML = this.innerHTML;
					ev.cancelBubble = true;
					this.parentNode.style.display = 'none';
				};
			}
			
		})(aUl[i]);
	}
	
};

mv.app.toRun = function(){
	var oRun = document.getElementById('run1');
	var oUl = oRun.getElementsByTagName('ul')[0];
	var aLi = oUl.getElementsByTagName('li');
	
	var oPrev = mv.tools.getByClass(oRun,'prev')[0];
	var oNext = mv.tools.getByClass(oRun,'next')[0];
	
	var iNow = 0;
	
	oUl.innerHTML += oUl.innerHTML;
	
	oUl.style.width = aLi.length * aLi[0].offsetWidth + 'px';
	
	oPrev.onclick = function(){
		
		if(iNow == 0){
			iNow = aLi.length/2;
			oUl.style.left = -oUl.offsetWidth/2 + 'px';
		}
		
		mv.ui.moveLeft(oUl,-iNow*aLi[0].offsetWidth,-(iNow-1)*aLi[0].offsetWidth);
		
		iNow--;
		
	};
	
	oNext.onclick = function(){
		
		if(iNow == aLi.length/2){
			iNow = 0;
			oUl.style.left = 0;
		}
		
		mv.ui.moveLeft(oUl,-iNow*aLi[0].offsetWidth,-(iNow+1)*aLi[0].offsetWidth);
		
		iNow++;
		
	};
	
	
};