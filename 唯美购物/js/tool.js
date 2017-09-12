/************ 浏览器检测 ************/
(function () {
	window.sys = {};
	var ua = navigator.userAgent.toLowerCase();	
	var s;		
	(s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
	(s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
	(s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] : 
	(s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] : 
	(s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
	
	if (/webkit/.test(ua)) sys.webkit = ua.match(/webkit\/([\d.]+)/)[1];
})();

/************ DOM加载 ************/
function addDomLoaded(fn) {
	var isReady = false;
	var timer = null;
	function doReady() {
		if (timer) clearInterval(timer);
		if (isReady) return;
		isReady = true;
		fn();
	}
	
	if ((sys.opera && sys.opera < 9) || (sys.firefox && sys.firefox < 3) || (sys.webkit && sys.webkit < 525)) {
		//无论采用哪种，基本上用不着了
		/*timer = setInterval(function () {
			if (/loaded|complete/.test(document.readyState)) { 	//loaded是部分加载，有可能只是DOM加载完毕，complete是完全加载，类似于onload
				doReady();
			}
		}, 1);*/

		timer = setInterval(function () {
			if (document && document.getElementById && document.getElementsByTagName && document.body) {
				doReady();
			}
		}, 1);
	} else if (document.addEventListener) {//W3C
		addEvent(document, 'DOMContentLoaded', function () {
			fn();
			removeEvent(document, 'DOMContentLoaded', arguments.callee);
		});
	} else if (sys.ie && sys.ie < 9){
		var timer = null;
		timer = setInterval(function () {
			try {
				document.documentElement.doScroll('left');
				doReady();
			} catch (e) {};
		}, 1);
	}
}

/************ 跨浏览器添加事件绑定 ************/
function addEvent(obj, type, fn) {
	if (typeof obj.addEventListener != 'undefined') {
		obj.addEventListener(type, fn, false);
	} else {
		//创建一个存放事件的哈希表(散列表)
		if (!obj.events) obj.events = {};
		//第一次执行时执行
		if (!obj.events[type]) {	
			//创建一个存放事件处理函数的数组
			obj.events[type] = [];
			//把第一次的事件处理函数先储存到第一个位置上
			if (obj['on' + type]) obj.events[type][0] = fn;
		} else {
			//同一个注册函数进行屏蔽，不添加到计数器中
			if (addEvent.equal(obj.events[type], fn)) return false;
		}
		//从第二次开始我们用事件计数器来存储
		obj.events[type][addEvent.ID++] = fn;
		//执行事件处理函数
		obj['on' + type] = addEvent.exec;
	}
};

//为每个事件分配一个计数器
addEvent.ID = 1;

//执行事件处理函数
addEvent.exec = function (event) {
	var e = event || addEvent.fixEvent(window.event);
	var es = this.events[e.type];
	for (var i in es) {
		es[i].call(this, e);
	}
};

//同一个注册函数进行屏蔽
addEvent.equal = function (es, fn) {
	for (var i in es) {
		if (es[i] == fn) return true;
	}
	return false;
};

//把IE常用的Event对象配对到W3C中去
addEvent.fixEvent = function (event) {
	event.preventDefault = addEvent.fixEvent.preventDefault;
	event.stopPropagation = addEvent.fixEvent.stopPropagation;
	event.target = event.srcElement;
	return event;
};

//IE阻止默认行为
addEvent.fixEvent.preventDefault = function () {
	this.returnValue = false;
};

//IE取消冒泡
addEvent.fixEvent.stopPropagation = function () {
	this.cancelBubble = true;
};

/************ 跨浏览器删除事件 ************/
function removeEvent(obj, type, fn) {
	if (typeof obj.removeEventListener != 'undefined') {
		obj.removeEventListener(type, fn, false);
	} else {
		if (obj.events) {
			for (var i in obj.events[type]) {
				if (obj.events[type][i] == fn) {
					delete obj.events[type][i];
				}
			}
		}
	}
};

/************ 获取视口大小 ************/
// IE9及以下浏览器不支持（window.innerWidth != 'undefined'），而且显示大小完全不一样；
function getInner() {
	if (typeof window.innerWidth != 'undefined') {
		return {
			width : window.innerWidth,
			height : window.innerHeight
		}
	} else {
		return {
			width : document.documentElement.clientWidth,
			height : document.documentElement.clientHeight
		}
	}
};

/************ 获取滚动条位置 ************/
// Chrome：document.body.scrollTop
// 其它  ：document.documentElement.scrollTop
function getScroll() {
	return {
		top : document.documentElement.scrollTop || document.body.scrollTop,
		left : document.documentElement.scrollLeft || document.body.scrollLeft
	};
};


/************ 获取样式 ************/
// W3C：window.getComputedStyle(element, null)[attr];
// IE ：element.currentStyle[attr];
function getStyle(element, attr) {
	var value;

	if (typeof window.getComputedStyle != 'undefined') {//W3C
		value = window.getComputedStyle(element, null)[attr];
	} else if (typeof element.currentStyle != 'undeinfed') {//IE
		value = element.currentStyle[attr];
	}

	return value;
};


/************ 判断className是否存在 ************/
function hasClass(element, className) {
	return element.className.match(new RegExp('(\\s|^)' +className +'(\\s|$)'));
};


/************ 跨浏览器添加link规则 ************/
function insertRule(sheet, selectorText, cssText, position) {
	if (typeof sheet.insertRule != 'undefined') {//W3C
		sheet.insertRule(selectorText + '{' + cssText + '}', position);
	} else if (typeof sheet.addRule != 'undefined') {//IE
		sheet.addRule(selectorText, cssText, position);
	}
};

/************ 跨浏览器移出link规则 ************/
function deleteRule(sheet, index) {
	if (typeof sheet.deleteRule != 'undefined') {//W3C
		sheet.deleteRule(index);
	} else if (typeof sheet.removeRule != 'undefined') {//IE
		sheet.removeRule(index);
	}
};

/************ 获取innerText ************/
function getInnerText(element) {
	return (typeof element.textContent == 'string') ? element.textContent : element.innerText;
};

/************ 设置innerText ************/
function setInnerText(elememt, text) {

	if (typeof element.textContent == 'string') {
		element.textContent = text;
	} else {
		element.innerText = text;
	}

};

/************ 获取某一个元素到最外层顶点的位置 ************/
/*
offsetParent：

1.解释：此属性返回一个对象的引用，这个对象是距离调用offsetParent的元素最近的（在包含层次中最靠近的），并且是已进行过CSS定位的容器元素。如果这个容器元素未进行CSS定位，则offsetParent属性的取值为根元素(在标准兼容模式下为html元素；在怪异呈现模式下为body元素)的引用。当容器元素的style.display被设置为"none"时（译注：IE和Opera除外），offsetParent属性返回null。

2.语法：parentObj = element.offsetParent
*/
function offsetTop(element) {
	var top = element.offsetTop;
	var parent = element.offsetParent;

	while (parent != null) {
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}

	return top;
};

/************ 删除前后空格 ************/
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, '');
};

/************ 某一个值是否存在某一个数组中 ************/
function inArray(array, value) {

	for (var i in array) {
		if (array[i] === value) return true;
	}

	return false;
};

/************ 获取某一个节点的上一个节点的索引 ************/
function prevIndex(current, parent) {
	var length = parent.children.length;
	if (current == 0) return length - 1;
	return parseInt(current) - 1;
};

/************ 获取某一个节点的下一个节点的索引 ************/
function nextIndex(current, parent) {
	var length = parent.children.length;
	if (current == length - 1) return 0;
	return parseInt(current) + 1;
};

/************ 滚动条固定 ************/
/***scrollTo() :
***1.scrollTo()：方法可把内容滚动到指定的坐标。
***2.语法：scrollTo(xpos,ypos);
***/
function fixedScroll() {
	window.scrollTo(fixedScroll.left, fixedScroll.top);
};

/************ 阻止默认行为 ************/
function predef(e) {
	e.preventDefault();
};

/************ 创建cookie ************/
function setCookie(name, value, expires, path, domain, secure) {
	var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
	if (expires instanceof Date) {
		cookieText += '; expires=' + expires;
	}
	if (path) {
		cookieText += '; expires=' + expires;
	}
	if (domain) {
		cookieText += '; domain=' + domain;
	}
	if (secure) {
		cookieText += '; secure';
	}
	document.cookie = cookieText;
};

/************ 获取cookie ************/
function getCookie(name) {
	var cookieName = encodeURIComponent(name) + '=';
	var cookieStart = document.cookie.indexOf(cookieName);
	var cookieValue = null;
	if (cookieStart > -1) {
		var cookieEnd = document.cookie.indexOf(';', cookieStart);
		if (cookieEnd == -1) {
			cookieEnd = document.cookie.length;
		}
		cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
	}
	return cookieValue;
};

/************ 删除cookie ************/
function unsetCookie(name) {
	document.cookie = name + "= ; expires=" + new Date(0);
};