
# HTML5：canvas

标签： 前端

---
## 标签：canvas
- `<canvas>`不支持canvas可以看到的内容！`</canvas>`;
- 默认（宽：300px ； 高：150px）；

## 绘制环境：

- getContext('2d');    目前支持2d的场景（webgl支持3D绘图，但兼容性不好）；

## 绘制方块：

- fillRect(L,T,W,H)：默认颜色是黑色；
- strokeRect(L,T,W,H)：带边框的方块（默认一像素边框，和显示出来的不一样。实际是2像素，因为没有0.5像素，所以两边各位1像素，总共就有2像素了。解决方法就是 L 和 T 各多加0.5像素）；
- 注意：要留意填充和绘制边框的顺序。

```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>

<style type="text/css">
	body { background: black; }
	#c1 { background: white; }
</style>

<script type="text/javascript">
	
	window.onload = function (){
		var oC = document.getElementById('c1');
		var oGC = oC.getContext('2d');
		
		oGC.beginPath();
		oGC.rect(100,100,100,100);
		oGC.closePath();
		oGC.stroke();		//边线：没有这句话什么也出不来；
		//oGC.fill();
		
		//在要在同一画布上绘制很多图片的时候，要先将之前的绘制先清理掉，这样才能连贯起来；
		//oGC.clearRect(0,0,oC.width,oC.height); //清除画布；
	};
	
</script>

</head>

<body>
	
	<canvas id="c1" width="500px" height="500px"></canvas>
	
</body>
</html>
```

## 设置绘图

- fillStyle : 填充颜色（绘制canvas是有顺序的）;
- lineWidth : 线宽度，是一个数值;
- strokeStyle : 边线颜色;

```
<style type="text/css">
	body { background: black; }
	#c1 { background: white; }
</style>

<script type="text/javascript">
	
	window.onload = function (){
		var oC = document.getElementById('c1');
		var oGC = oC.getContext('2d');
		
		oGC.fillStyle = 'red';
		oGC.fillRect(50,50,100,100);
		
		oGC.lineJoin = 'bevel';
		oGC.fillStyle = 'red';
		oGC.lineWidth = 10;
		oGC.strokeStyle = 'green';
		oGC.fillRect(50,200,100,100);
		oGC.strokeRect(50.5,200.5,100,100);
	};
	
</script>

</head>

<body>
	
	<canvas id="c1" width="500px" height="500px"></canvas>
	
</body>
</html>
```

## 边界绘制

- lineJoin : 边界连接点样式 
    * miter（默认）、round（圆角）、bevel（斜角）
- lineCap : 端点样式 
    * butt（默认）、round（圆角）、square（高度多出为宽一半的值）

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>canvas</title>
<style>
    body {background: #000;}
    #c1 {background: #fff;}
    span {color: #fff;}
</style>
<script>
	
    window.onload = function(){
        var oC = document.getElementById('c1');
        var oGC = oC.getContext('2d');
       
        oGC.fillStyle = 'red';
        oGC.strokeStyle = 'blue';
        oGC.lineWidth = 10;
        oGC.lineJoin = 'bevel';
        oGC.fillRect(50, 50, 100, 100);
        oGC.strokeRect(50.5, 50.5, 100, 100);
    }
    
</script>
</head>
<body>
<canvas id="c1" width="400" height="400"> 
    <span>不支持canvas的浏览器可以看到这里的文字</span>
</canvas>
</body>
</html>
```

## 绘制路径

- beginPath : 开始绘制路径
- closePath : 结束绘制路径
- moveTo : 移动到绘制的新目标点
- lineTo : 新的目标点
- stroke : 划线，默认黑色
- fill : 填充，默认黑色
- rect : 矩形区域
- clearRect : 删除一个画布的矩形区域
- save : 保存路径
- restore : 恢复路径
- 小例子 : 鼠标画线
- 小例子 : 方块移动

**moveTo, lineTo, stroke, fill**

```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>

<style type="text/css">
	body { background: black; }
	#c1 { background: white; }
</style>

<script type="text/javascript">
	
	window.onload = function (){
		var oC = document.getElementById('c1');
		var oGC = oC.getContext('2d');
		
		//第一个三角形
		oGC.beginPath();
		oGC.moveTo(100,100);	//起始位置；
		oGC.lineTo(200,200);	//连接到的第一个点；
		oGC.lineTo(300,200);	//链接到的第二个点；
		oGC.closePath();		//让所画的线闭合，起点和终点进行连接；
		oGC.stroke();			//划线；
		
		//第二个三角形
		oGC.beginPath();
		oGC.moveTo(100,200);	//起始位置；
		oGC.lineTo(200,300);	//连接到的第一个点；
		oGC.lineTo(300,300);	//链接到的第二个点；
		oGC.closePath();		//让所画的线闭合，起点和终点进行连接；
		//oGC.stroke();			//划线；
		oGC.fill();
	};
	
</script>

</head>

<body>
	
	<canvas id="c1" width="500px" height="500px"></canvas>
	
</body>
</html>
```

**rect**
```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>canvas</title>
<style>
    body {background: #000;}
    #c1 {background: #fff;}
    span {color: #fff;}
</style>
<script>
	
    window.onload = function(){
        var oC = document.getElementById('c1');
        var oGC = oC.getContext('2d');
        
        oGC.beginPath();
        oGC.rect(100, 100, 100, 100);
        oGC.closePath(); 
        oGC.stroke();
    }
    
</script>
</head>
<body>
<canvas id="c1" width="400" height="400"> 
    <span>不支持canvas的浏览器可以看到这里的文字</span>
</canvas>
</body>
</html>
```

**clearRect**
```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>canvas</title>
<style>
    body {background: #000;}
    #c1 {background: #fff;}
    span {color: #fff;}
</style>
<script>
	
    window.onload = function(){
        var oC = document.getElementById('c1');
        var oGC = oC.getContext('2d'); 
        
        oGC.beginPath();
        oGC.rect(100, 100, 100, 100);
        oGC.closePath(); 
        oGC.fill();
        
        //oGC.clearRect(0, 0, oC.width, oC.height);
    }
    
</script>
</head>
<body>
<canvas id="c1" width="400" height="400"> 
    <span>不支持canvas的浏览器可以看到这里的文字</span>
</canvas>
</body>
</html>
```

**save()和restore()**

```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>

<style type="text/css">
	body { background: black; }
	#c1 { background: white; }
</style>

<script type="text/javascript">
	
	window.onload = function (){
		var oC = document.getElementById('c1');
		var oGC = oC.getContext('2d');
		
		//通过保存路径和恢复路径把fillStyle只作用到第一个三角形上；
		//相当于局部变量；
		oGC.save();	//保存路径；
		oGC.fillStyle = 'red';	//作用到两个三角形；
		
		//第一个三角形
		oGC.beginPath();
		oGC.moveTo(100,100);
		oGC.lineTo(200,200);
		oGC.lineTo(300,200);
		oGC.closePath();
		oGC.fill();
		
		oGC.restore();	//恢复路径；
		
		//第二个三角形
		oGC.beginPath();
		oGC.moveTo(100,200);
		oGC.lineTo(200,300);
		oGC.lineTo(300,300);
		oGC.closePath();
		//oGC.stroke();
		oGC.fill();
	};
	
</script>

</head>

<body>
	
	<canvas id="c1" width="500px" height="500px"></canvas>
	
</body>
</html>
```

**断点样式**

```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<style type="text/css">
	body { background: black; }
	#c1 { background: white; }
</style>

<script type="text/javascript">
	
	window.onload = function (){
		var oC = document.getElementById('c1');
		var oGC = oC.getContext('2d');
		
		oGC.lineWidth = 30;
		oGC.lineCap = 'round';
		
		oGC.moveTo(300,100);
		oGC.lineTo(200,300);
		
		oGC.stroke();
	};
	
</script>
</head>

<body>	
	<canvas id="c1" width="500px" height="500px"></canvas>	
</body>
</html>
```

**鼠标画线**

```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>

<style type="text/css">
	body { background: black; }
	#c1 { background: white; }
</style>

<script type="text/javascript">
	
	window.onload = function (){
		var oC = document.getElementById('c1');
		var oGC = oC.getContext('2d');
		
		oC.onmousedown = function (ev){
			var oEvent = ev || event;
			
			oGC.moveTo(ev.clientX-oC.offsetLeft,ev.clientY-oC.offsetTop);
			
			document.onmousemove = function (ev){
				var oEvent = ev || event;
				oGC.lineTo(ev.clientX-oC.offsetLeft,ev.clientY-oC.offsetTop);
				oGC.stroke();
				
				document.onmouseup = function (){
					document.onmousemove = null;
					document.onmouseup = null;
				};
			};
		};
	};
	
</script>

</head>

<body>	
	<canvas id="c1" width="500px" height="500px"></canvas>	
</body>
</html>
```

**方块移动**

```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<style type="text/css">
	body { background: black; }
	#c1 { background: white; }
</style>

<script type="text/javascript">
	
	window.onload = function (){
		var oC = document.getElementById('c1');
		var oGC = oC.getContext('2d');
		
		//建一个变量，初始值为0；
		var num = 0;
		
		//先绘制出一个方块；
		oGC.fillRect(0,0,100,100);
		
		//开一个定时器；
		setInterval(function (){
			
			num++;
			
			//清除画布，不然之前画的会一直存在；
			oGC.clearRect(0,0,oC.width,oC.height);
			
			oGC.fillRect(num,num,100,100);
			
		},30);
		
	};
	
</script>
</head>

<body>	
	<canvas id="c1" width="500px" height="500px"></canvas>	
</body>
</html>
<!--
	注意：因为有一个默认大小，所以如果在样式中设置宽高，那之后再绘制大小的话，会在原始大小的基础上等比缩放；
-->
```

**在style中设置canvas宽高的问题**

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>在style中设置canvas宽高的问题</title>
<style>
    body {background: #000;}
    #c1 {background: #fff; width: 400px; height: 400px;}
    span {color: #fff;}
</style>
<script>
	
    window.onload = function(){
        var oC = document.getElementById('c1');
        var oGC = oC.getContext('2d'); 
        
        oGC.fillRect(0, 0, 100, 100);
        //把canvas的宽高写在style中，其实没有实际上更改canvas的宽高，而是将canvas进行等比例放大。因此这时候看起来这个方块就很大。
        //在canvas标签上进行的width和height的设置是真正宽高的设置；在style中给canvas设置的宽高，其实会让canvas从默认300*150的基础上等比例缩放。
    }
    
</script>
</head>
<body>
<canvas id="c1"> 
    <span>不支持canvas的浏览器可以看到这里的文字</span>
</canvas>
</body>
</html>
```

## 绘制圆

- arc(x, y, 半径, 起始弧度, 结束弧度, 旋转方向) 
    * x, y : 圆心坐标
    * 弧度与角度的关系 : 弧度 = 角度 * Math.PI/180
    * 旋转方向 : 顺时针（默认: false）、逆时针（true）
    * 例子 : 用arc去画个钟表

**绘制圆**

```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<style type="text/css">
	body { background: black; }
	#c1 { background: white; }
</style>

<script type="text/javascript">
	
	window.onload = function (){
		var oC = document.getElementById('c1');
		var oGC = oC.getContext('2d');
		
		//起始标记位置；
		oGC.moveTo(200,200);
		
		//弧度 = 角度*Math.PI/180
		oGC.arc(200,200,150,0,90*Math.PI/180,false);
		
		//闭合；
		//oGC.closePath();
		
		//终点标记位置；
		oGC.stroke();
	};
	
</script>
</head>

<body>	
	<canvas id="c1" width="500px" height="500px"></canvas>	
</body>
</html>
```

**用arc绘制钟表**
```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<style type="text/css">
	body { background: black; }
	#c1 { background: white; }
</style>

<script type="text/javascript">
	
	window.onload = function (){
		var oC = document.getElementById('c1');
		var oGC = oC.getContext('2d');
		
		function toDraw(){
			//初始化变量，并赋值；
			var x = 200;
			var y = 200;
			var r = 150;
			
			//绘图之前先清除整个画布；
			oGC.clearRect(0,0,oC.width,oC.height);
			
			//获取日期对象；
			var oDate = new Date();
			var oHours = oDate.getHours();
			var oMin = oDate.getMinutes();
			var oSen = oDate.getSeconds();
			
			//计算各指针的旋转弧度；
			var oHoursValue = (-90 + oHours*30 + oMin/2) * Math.PI/180;
			var oMinValue = (-90 + oMin*6) * Math.PI/180;
			var oSenValue = (-90 + oSen*6) * Math.PI/180;
			
			//1.画一个圆，且圆里面有60个刻度，表示每一秒；
			oGC.beginPath();
			
			for (var i=0;i<60;i++) {
				oGC.moveTo(x,y);
				oGC.arc(x,y,r,6*i*Math.PI/180,6*(i+1)*Math.PI/180,false);
			}
			
			oGC.closePath();
			oGC.stroke();
			
			//2.用一个稍小一点的白色的圆遮住刻度多余的部分；
			oGC.fillStyle = 'white';
			oGC.beginPath();
			oGC.arc(x,y,r*19/20,0,360*Math.PI/180,false);			
			oGC.closePath();	
			oGC.fill();
			
			//3.画一个圆，且园里面有12个刻度，表示每小时；
			oGC.lineWidth = 3;
			oGC.beginPath();
			
			for (var i=0;i<12;i++) {
				oGC.moveTo(x,y);
				oGC.arc(x,y,r,30*i*Math.PI/180,30*(i+1)*Math.PI/180,false);
			}
			
			oGC.closePath();
			oGC.stroke();
			
			//4.用一个更小一点的白色的圆遮住刻度多余的部分；
			oGC.fillStyle = 'white';
			oGC.beginPath();
			oGC.arc(x,y,r*18/20,0,360*Math.PI/180,false);			
			oGC.closePath();
			oGC.fill();
			
			//5.时针
			oGC.lineWidth = 5;
			oGC.beginPath();
			oGC.moveTo(x,y);
			oGC.arc(x,y,r*10/20,oHoursValue,oHoursValue,false);			
			oGC.closePath();
			oGC.stroke();
			
			//6.分针
			oGC.lineWidth = 3;
			oGC.beginPath();
			oGC.moveTo(x,y);
			oGC.arc(x,y,r*14/20,oMinValue,oMinValue,false);			
			oGC.closePath();
			oGC.stroke();
			
			//6.秒针
			oGC.lineWidth = 1;
			oGC.beginPath();	//开始绘制路径；
			oGC.moveTo(x,y);
			oGC.arc(x,y,r*19/20,oSenValue,oSenValue,false);			
			oGC.closePath();	//结束绘制路径；
			oGC.stroke();
		};
		
		//7.开一个定时器，每一秒调用一下绘画这个函数；
		setInterval(toDraw,1000);
		
		toDraw();
	};
	
</script>
</head>

<body>	
	<canvas id="c1" width="500px" height="500px"></canvas>	
</body>
</html>
```

## 绘制其它曲线

- arcTo(x1,y1,x2,y2,r)
    * 即：第一组坐标，第二组坐标，半径
- quadraticCurveTo(dx, dy, x1, y1) 
    * 贝塞尔曲线：第一组控制点、第二组结束坐标
- bezierCurveTo(dx1, dy1, dx2, dy2, x1, y1) 
    * 贝塞尔曲线：第一组控制点、第二组控制点、第三组结束坐标

**arcTo(x1,y1,x2,y2,r)**
```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<style type="text/css">
	body { background: black; }
	#c1 { background: white; }
</style>

<script type="text/javascript">
	
	window.onload = function (){
		var oC = document.getElementById('c1');
		var oGC = oC.getContext('2d');
		
		oGC.moveTo(100,200);	//起始位置；
		oGC.arcTo(100,100,200,100,50);
		oGC.stroke();			//划线，默认为黑色；
	};
	
</script>
</head>

<body>	
	<canvas id="c1" width="500px" height="500px"></canvas>	
</body>
</html>
```

**quadraticCurveTo(dx, dy, x1, y1)**

```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<style type="text/css">
	body { background: black; }
	#c1 { background: white; }
</style>

<script type="text/javascript">
	
	window.onload = function (){
		var oC = document.getElementById('c1');
		var oGC = oC.getContext('2d');
		
		oGC.moveTo(100,200);	//起始位置；
		oGC.quadraticCurveTo(100, 100, 200, 100);
		oGC.stroke();			//划线，默认为黑色；
	};
	
</script>
</head>

<body>	
	<canvas id="c1" width="500px" height="500px"></canvas>	
</body>
</html>
```

**bezierCurveTo(dx1, dy1, dx2, dy2, x1, y1)**

```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<style type="text/css">
	body { background: black; }
	#c1 { background: white; }
</style>

<script type="text/javascript">
	
	window.onload = function (){
		var oC = document.getElementById('c1');
		var oGC = oC.getContext('2d');
		
		oGC.moveTo(100,200);	//起始位置；
		oGC.bezierCurveTo(100, 100, 200, 200, 200, 100);
		oGC.stroke();			//划线，默认为黑色；
	};
	
</script>
</head>

<body>	
	<canvas id="c1" width="500px" height="500px"></canvas>	
</body>
</html>
```

## 变换

- translate(x,y)：有两个参数；
    * 偏移：从起始点为基准点，移动当前坐标位置；

- rotate(角度*Math.PI/180)
    * 旋转：参数为弧度；
    * 例子：旋转的小方块；

- scale(宽的比例,高的比例)
    * 缩放例子：旋转加缩放的小方块；
    
**translate(x,y)**

```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<style type="text/css">
	body { background: black; }
	#c1 { background: white; }
</style>

<script type="text/javascript">
	
	window.onload = function (){
		var oC = document.getElementById('c1');
		var oGC = oC.getContext('2d');
		
		oGC.translate(100,100);
		oGC.fillRect(0,0,100,100);
	};
	
</script>
</head>

<body>	
	<canvas id="c1" width="500px" height="500px"></canvas>	
</body>
</html>
```

**rotate(角度*Math.PI/180)**

```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<style type="text/css">
	body { background: black; }
	#c1 { background: white; }
</style>

<script type="text/javascript">
	
	window.onload = function (){
		var oC = document.getElementById('c1');
		var oGC = oC.getContext('2d');
		
		oGC.translate(200,200);
		oGC.rotate(45*Math.PI/180);
		oGC.fillRect(0,0,100,100);
	};
	
</script>
</head>

<body>	
	<canvas id="c1" width="500px" height="500px"></canvas>	
</body>
</html>
```

**scale(宽的比例,高的比例)**

```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<style type="text/css">
	body { background: black; }
	#c1 { background: white; }
</style>

<script type="text/javascript">
	
	window.onload = function (){
		var oC = document.getElementById('c1');
		var oGC = oC.getContext('2d');
		
		oGC.translate(100,100);
		oGC.rotate(45*Math.PI/180);
		oGC.scale(0.5,0.5);
		oGC.fillRect(0,0,100,100);
	};
	
</script>
</head>

<body>	
	<canvas id="c1" width="500px" height="500px"></canvas>	
</body>
</html>
```

**实例4：旋转的小方块**

```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<style type="text/css">
	body { background: black; }
	#c1 { background: white; }
</style>

<script type="text/javascript">
	
	window.onload = function (){
		var oC = document.getElementById('c1');
		var oGC = oC.getContext('2d');
		
		var num = 0;
		var num2 = 0;
		var value = 1;
		
		oGC.translate(100,100);
		
		setInterval(function (){
			num++;
            oGC.save(); //添加上save和restore，防止旋转角度的累加
            oGC.clearRect(0,0,oC.width,oC.height);
            
            if (num2 == 100) {
            	value = -1;
            } else if (num2 == 0){
            	value = 1;
            }
            
            num2 += value;
            
            oGC.scale(num2*1/50,num2*1/50);
            
            oGC.translate(100, 100);
            oGC.rotate(num*Math.PI/180);
            oGC.translate(-50, -50); //让方块围绕中心旋转
            oGC.fillRect(0, 0, 100, 100);
            oGC.restore();
		},30);
		
	};
	
</script>
</head>

<body>	
	<canvas id="c1" width="500px" height="500px"></canvas>	
</body>
</html>
```

## 插入图片

- 等图片加载完，再执行canvas操作 
    * 图片预加载 : 在onload中调用方法

- drawImage(oImg, x, y, w, h) 
    * oImg : 当前图片； x, y : 坐标； w, h : 宽高
    * 例子 : 微博的图片旋转效果

## 设置背景

- createPattern(oImg, 平铺方式) 
    * 第二个参数为: repeat, repeat-x, repeat-y, no-repeat

**drawImage()方法**
```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<style type="text/css">
	body { background: black; }
	#c1 { background: white; }
</style>

<script type="text/javascript">
	
	window.onload = function (){
		var oC = document.getElementById('c1');
		var oGC = oC.getContext('2d');
		
		//1.先实例化一个图片对象；
		var yImg = new Image();
		
		//2.图片对象预加载时要执行的函数；
		yImg.onload = function (){
			draw(this);
		};
		
		//3.指定图片对象的路径；
		yImg.src = '../../images/3.jpg';
		
		//4.将图片加载到canvas中；
		function draw(obj){
			oGC.drawImage(obj,0,90,500,300);
		};
		
	};
	
</script>
</head>

<body>	
	<canvas id="c1" width="500px" height="500px"></canvas>	
</body>
</html>
```

**微博图片旋转效果**
```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title></title>
<style>
    body {background: black;}
    #c1 {background: white;}
    span {color: #fff;}
</style>
<script>
window.onload = function(){
    var aInput = document.getElementsByTagName('input');
    var oImg = document.getElementById('img1');
    
    var iNow = 0;
    var yImg = new Image();
    
    //图片预加载；
    yImg.onload = function(){
        draw(oImg);
    }
    
    //将要添加的图片路径赋值给实例化出来的图片对象；
    yImg.src = oImg.src;
    
    function draw(obj){
        var oC = document.createElement('canvas');
        var oGC = oC.getContext('2d');
        
        oC.width = obj.width;
        oC.height = obj.height;
        obj.parentNode.replaceChild(oC, obj)
        oGC.drawImage(obj, 0, 0);
        
        //点击右箭头要做的事情；
        aInput[1].onclick = function(){
            //iNow记录点击了多少次
            if(iNow == 3){
                iNow = 0;
            } else {
                iNow++;
            }
            
            toChange();
        }
        
        //点击左箭头要做的事情；
        aInput[0].onclick = function(){
        	
            if(iNow == 0){
                iNow = 3;
            } else {
                iNow--;
            }
            
            toChange();
        }
        
        //当点击的时候要执行的函数；
        function toChange(){
            switch(iNow){
                case 1:
                    oC.width = obj.height;
                    oC.height = obj.width;
                    oGC.rotate(90*Math.PI/180);
                    oGC.drawImage(obj, 0, -obj.height);
                break;
                
                case 2:
                    oC.width = obj.width;
                    oC.height = obj.height;
                    oGC.rotate(180*Math.PI/180);
                    oGC.drawImage(obj, -obj.width, -obj.height);
                break;
                
                case 3:
                    oC.width = obj.height;
                    oC.height = obj.width;
                    oGC.rotate(270*Math.PI/180);
                    oGC.drawImage(obj, -obj.width, 0);
                break;
                
                case 0:
                    oC.width = obj.width;
                    oC.height = obj.height;
                    oGC.rotate(0);
                    oGC.drawImage(obj, 0, 0);
                break;
            }
        }
    }   
}
</script>
</head>
<body>
<input type="button" value="←">
<input type="button" value="→">
<div>
    <img src="../../images/3.jpg" id="img1">
</div>
</body>
</html>
```

**设置背景**
```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<style type="text/css">
	body { background: black; }
	#c1 { background: white; }
</style>

<script type="text/javascript">
	
	window.onload = function (){
		var oC = document.getElementById('c1');
		var oGC = oC.getContext('2d');
		
		//1.先实例化一个图片对象；
		var yImg = new Image();
		
		//2.图片对象预加载时要执行的函数；
		yImg.onload = function (){
			draw(this);
		};
		
		//3.指定图片对象的路径；
		yImg.src = '../../images/3.jpg';
		
		//4.将图片加载到canvas中；
		function draw(obj){
			var bg = oGC.createPattern(obj,'repeat');
			oGC.fillStyle = bg;
			oGC.fillRect(0,0,500,500);
			//oGC.drawImage(obj,0,90,500,300);
		};
		
	};
	
</script>
</head>

<body>	
	<canvas id="c1" width="500px" height="500px"></canvas>	
</body>
</html>
```

## 渐变

- createLinearGradient(x1, y1, x2, y2) 
    * 线性渐变；
    * 第一组参数 : 起始点坐标；第二组参数 : 结束点坐标；
    * addColorStop(位置, 颜色) 添加渐变点；
- createRadialGradient(x1, y1, r1, x2, y2, r2) 
    * 放射性渐变；
    * 参数 : 第一个圆的坐标和半径，第二个圆的坐标和半径；

**线性渐变**
```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<style type="text/css">
	body { background: black; }
	#c1 { background: white; }
</style>

<script type="text/javascript">
	
	window.onload = function (){
		var oC = document.getElementById('c1');
		var oGC = oC.getContext('2d');
		
		var obj = oGC.createRadialGradient(200,200,100,200,200,150);
		//起点位置用 0 表示；
		obj.addColorStop(0,'red');
		obj.addColorStop(0.5,'yellow');
		//终点位置用 1 表示；
		obj.addColorStop(1,'blue');
		
		oGC.fillStyle = obj;
		oGC.fillRect(0,0,oC.width,oC.height);
		
	};
	
</script>
</head>

<body>	
	<canvas id="c1" width="500px" height="500px"></canvas>	
</body>
</html>
```

## 文本

- strokeText(文字, x, y) 
    * 文字边框
- fillText(文字, x, y) 
    * 文字填充
- font 
    * 文字大小 : '60px impact' 两个参数必须要写
- textAlign 
    * 默认是start跟left一样的效果 end right center
- textBaseline 
    * 文字上下的位置的方式 默认: alphabetic
- measureText() 
    * measureText(str).width : 只有宽度，没有高度
    * 例子 : 文字居中

**文本的操作***
```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<style type="text/css">
	body { background: black; }
	#c1 { background: white; }
</style>

<script type="text/javascript">
	
	window.onload = function (){
		var oC = document.getElementById('c1');
		var oGC = oC.getContext('2d');
		
		//文字大小；
		oGC.font = '60px impact';
		//文字对齐的基准线；
		oGC.textBaseline = 'top';
		//添加带填充的文字，且指定坐标；
		oGC.fillText('YHF',50,50);
		//画带边框的文字，且指定坐标；
		oGC.strokeText('YHF',50,200);
		
	};
	
</script>
</head>

<body>	
	<canvas id="c1" width="500px" height="500px"></canvas>	
</body>
</html>
```

**文字居中**

```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<style type="text/css">
	body { background: black; }
	#c1 { background: white; }
</style>

<script type="text/javascript">
	
	window.onload = function (){
		var oC = document.getElementById('c1');
		var oGC = oC.getContext('2d');
		
		//文字大小；
		oGC.font = '60px impact';
		//文字对齐的基准线；
		oGC.textBaseline = 'top';
		
		var w = oGC.measureText('YHF').width;
		oGC.fillText('YHF',(oC.width-w)/2,(oC.height-60)/2);
	};
	
</script>
</head>

<body>	
	<canvas id="c1" width="500px" height="500px"></canvas>	
</body>
</html>
```

## 阴影

- shadowOffsetX、shadowOffsetY 
    * x轴偏移、y轴偏移;
- shadowBlur 
    * 高斯模糊值;
- shadowColor 
    * 阴影颜色 （默认颜色是rgba(0, 0, 0, 0) 黑色透明）;
    
```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<style type="text/css">
	body { background: black; }
	#c1 { background: white; }
</style>

<script type="text/javascript">
	
	window.onload = function (){
		var oC = document.getElementById('c1');
		var oGC = oC.getContext('2d');
		
		//文字大小；
		oGC.font = '60px impact';
		//文字对齐的基准线；
		oGC.textBaseline = 'top';
		//X轴方向上的阴影；
		oGC.shadowOffsetX = 10;
		//Y轴方向上的阴影；
		oGC.shadowOffsetY = 10;
		//阴影的高斯模糊值;
		oGC.shadowBlur = 3;
		//阴影的颜色，默认的颜色为黑色透明，即：rgba(0, 0, 0, 0)；
		oGC.shadowColor = 'yellow';
		
		var w = oGC.measureText('YHF').width;
		oGC.fillText('YHF',(oC.width-w)/2,(oC.height-60)/2);
	};
	
</script>
</head>

<body>	
	<canvas id="c1" width="500px" height="500px"></canvas>	
</body>
</html>
```

## 像素

- getImageData(x, y, w, h) 
    * 获取图像数据
- putImageData(获取图像, x, y) 
    * 设置新的图像数据
- 属性 
    * width : 一行的像素个数
    * height: 一列的像素个数
    * data  : 一个数组，包含每个像素的rgba四个值，每 4 个值表示一个像素，注意每个值都是在 0~255 之间的整数;
- createImageData(w, h) 
    * 生成新的像素矩阵，初始值是全透明的黑色，即(0, 0, 0, 0)
    * 像素显字
- 获取和设置指定坐标 
    * 封装 : getXY、setXY
- 图片的像素操作 
    * 必须是同源下
    * 例子 : 反色、倒影、渐变等
    * 例子 : 马赛克效果

**getImageData和putImageData**

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title></title>
<style>
    body {background: #000;}
    #c1 {background: #fff;}
</style>
<script>
    window.onload = function(){
        var oC = document.getElementById('c1');
        var oGC = oC.getContext('2d');
        
        //先画一个填充的方块；
        oGC.fillRect(0, 0, 100, 100);
        //获取到方块所有的像素的值；
        var oImg = oGC.getImageData(0, 0, 100, 100);
        
        //alert(oImg.width); 		//一行的像素个数；
        //alert(oImg.height); 		//一列的像素个数；
        //alert(oImg.data); 		//整体像素的数组集合；
        //alert(oImg.data.length); 	//40000 这个方块应该是10000个像素。也就是数组中每四个值代表一个像素。一个像素中的四个值代表r/g/b/a。
        //alert(oImg.data[0]); 		//0 	0-255 黑色到白色；
        //alert(oImg.data[1]); 		//0 	0-255 黑色到白色；
        //alert(oImg.data[2]); 		//0 	0-255 黑色到白色；
        //alert(oImg.data[3]); 		//255 	0-255 透明到不透明；       
        //也就是说第一个像素点的rgba是(0,0,0,255)，就是一个不透明的黑色；
        
        //通过 for 循环来改变像素的颜色；
        for(var i=0; i<oImg.width*oImg.height; i++){
            oImg.data[4*i] = 255;
            oImg.data[4*i+1] = 0;
            oImg.data[4*i+2] = 0;
            oImg.data[4*i+3] = 100;
        }
        
        oGC.putImageData(oImg, 100, 100); //把oImg这样的像素信息添到了位于100,100的位置；
    }
</script>
</head>
<body>
<canvas id="c1" width="500" height="500"></canvas>
</body>
</html>
```

**createImageData**

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title></title>
<style>
    body {background: #000;}
    #c1 {background: #fff;}
</style>
<script>
	
    window.onload = function(){
        var oC = document.getElementById('c1');
        var oGC = oC.getContext('2d');
        
        //创建一个像素集合；
        var oImg = oGC.createImageData(100, 100);
        
        //通过 for 循环来指定像素集合的颜色；
        for(var i=0; i<oImg.width*oImg.height; i++){
            oImg.data[4*i] = 255;
            oImg.data[4*i+1] = 0;
            oImg.data[4*i+2] = 0;
            oImg.data[4*i+3] = 100;
        }
        
        //将创建好的像素集合添加到画布中；
        oGC.putImageData(oImg, 100, 100);
    }
    
</script>
</head>
<body>
<canvas id="c1" width="400" height="400"></canvas>
</body>
</html>
```

**像素显字**

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>像素显字</title>
<style>
body {background: #000; color: white; font-size: 30px;}
#c1 {background: #fff;}
</style>
<script>
	
window.onload = function(){
    var oC = document.getElementById('c1');
    var oGC = oC.getContext('2d');
    var aLi = document.getElementsByTagName('li');
    
    for(var i=0; i<aLi.length; i++){
        aLi[i].onclick = function(){
            var str = this.innerHTML;
            var h = 180;
            
            oGC.clearRect(0, 0, oC.width, oC.height);
            oGC.font = h + 'px impact';
            oGC.fillStyle = 'red';
            oGC.textBaseline = 'top';
            
            var w = oGC.measureText(str).width;
            
            oGC.fillText(str, (oC.width - w) / 2, (oC.height - h) / 2);
            
            var oImg = oGC.getImageData((oC.width - w) / 2, (oC.height - h) / 2, w, h);
            
            oGC.clearRect(0, 0, oC.width, oC.height);
            
            //从中随机取出 1/10 的像素数；
            var arr = randomArr(w*h, w*h/10);
            var newImg = oGC.createImageData(w, h);
            
            for(var i = 0; i<arr.length; i++){
                newImg.data[arr[i]*4] = oImg.data[4*arr[i]];
                newImg.data[arr[i]*4+1] = oImg.data[4*arr[i]+1];
                newImg.data[arr[i]*4+2] = oImg.data[4*arr[i]+2];
                newImg.data[arr[i]*4+3] = oImg.data[4*arr[i]+3];
            }
            
            oGC.putImageData(newImg, (oC.width - w) / 2, (oC.height - h) / 2);
        }
    }
    
    //从iAll个数里面随机取出iNow个数；
    function randomArr(iAll, iNow){
        var arr = [];
        var newArr = [];
        
        for(var i=0; i<iAll; i++){
            arr.push(i);
        }
        
        for(var i=0; i<iNow; i++){
            newArr.push(arr.splice(Math.floor(Math.random()*arr.length), 1));
        }
        
        return newArr;
    }
}

</script>
</head>
<body>
<canvas id="c1" width="400" height="400"></canvas>
<ul style="float: left">
	<li>孤</li>
	<li>风</li>
	<li>独</li>
	<li>影</li>
</ul>
</body>
</html>
```

**像素显字：动画版**

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>像素显字升级版</title>
<style>
body {background: #000; color: white; font-size: 30px;}
#c1 {background: #fff;}
</style>
<script>
	
window.onload = function(){
    var oC = document.getElementById('c1');
    var oGC = oC.getContext('2d');
    var aLi = document.getElementsByTagName('li');
    
    for(var i=0; i<aLi.length; i++){
        aLi[i].onclick = function(){
            var str = this.innerHTML;
            var h = 180;
            var timer = null;
            
            clearInterval(timer);
            
            var iNow = 0;
            
            oGC.clearRect(0, 0, oC.width, oC.height);
            oGC.font = h + 'px impact';
            oGC.fillStyle = 'red';
            oGC.textBaseline = 'top';
            
            var w = oGC.measureText(str).width;
            
            oGC.fillText(str, (oC.width - w) / 2, (oC.height - h) / 2);
            
            var oImg = oGC.getImageData((oC.width - w) / 2, (oC.height - h) / 2, w, h);
            
            oGC.clearRect(0, 0, oC.width, oC.height);
            
            var arr = randomArr(w*h, w*h/10);
            var newImg = oGC.createImageData(w, h);
            
            timer = setInterval(function(){
                for(var i = 0; i<arr[iNow].length; i++){
                    newImg.data[arr[iNow][i]*4] = oImg.data[4*arr[iNow][i]];
                    newImg.data[arr[iNow][i]*4+1] = oImg.data[4*arr[iNow][i]+1];
                    newImg.data[arr[iNow][i]*4+2] = oImg.data[4*arr[iNow][i]+2];
                    newImg.data[arr[iNow][i]*4+3] = oImg.data[4*arr[iNow][i]+3];
                }
                
                oGC.putImageData(newImg, (oC.width - w) / 2, (oC.height - h) / 2);
                
                if(iNow == 9){
                    iNow = 0;
                    clearInterval(timer);
                } else {
                    iNow++;
                }
                
            }, 200)
        }
    }
    
    //从iAll个数里面随机取出iNow个数；
    function randomArr(iAll, iNow){
        var arr = [];
        var allArr = [];
        
        for(var i=0; i<iAll; i++){
            arr.push(i);
        }
        
        for(var j=0; j<iAll/iNow; j++){
            var newArr = []
            
            for(var i=0; i<iNow; i++){
                newArr.push(arr.splice(Math.floor(Math.random()*arr.length), 1));
            }
            
            allArr.push(newArr);
        }
        
        return allArr;
    }
}
</script>
</head>
<body>
<canvas id="c1" width="400" height="400"></canvas>
<ul style="float: left">
	<li>孤</li>
	<li>风</li>
	<li>独</li>
	<li>影</li>
</ul>
</body>
</html>
```

**获取和设置指定坐标:封装函数 getXY 和 setXY**

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>getXY、setXY</title>
<style>
body {background: #000; color: white; font-size: 30px;}
#c1 {background: #fff;}
</style>
<script>
	
window.onload = function(){
    var oC = document.getElementById('c1');
    var oGC = oC.getContext('2d');
    oGC.fillRect(0, 0, 100, 100);
    var oImg = oGC.getImageData(0, 0, 100, 100);
    
    //得到坐标为3、5的rgba
    //alert(getXY(oImg, 3, 5));
    //setXY(oImg, 3, 5, [255, 0, 0, 255]); //设置坐标为3、5的rgba
    
    for(var i=0; i<oImg.width; i++){
        setXY(oImg, i, 5, [255, 0, 0, 255]);
    }
    
    oGC.putImageData(oImg, 100, 100);
    
    function getXY(obj, x, y){
        var w = obj.width;
        var h = obj.height;
        var d = obj.data;
        var color = [];
        
        color[0] = d[4*(y*w+x)];
        color[1] = d[4*(y*w+x)+1];
        color[2] = d[4*(y*w+x)+2];
        color[3] = d[4*(y*w+x)+3];
        
        return color;
    }
    
    function setXY(obj, x, y, color){
        var w = obj.width;
        var h = obj.height;
        var d = obj.data;
        
        d[4*(y*w+x)] = color[0];
        d[4*(y*w+x)+1] = color[1];
        d[4*(y*w+x)+2] = color[2];
        d[4*(y*w+x)+3] = color[3];
    }
}

</script>
</head>
<body>
	<canvas id="c1" width="400" height="400"></canvas>
</body>
</html>
```

**图片的像素操作:反色、倒影、渐变**

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>图片的像素操作</title>
<style>
body {background: #000; color: white; font-size: 30px;}
#c1 {background: #fff;}
</style>
<script>
	
window.onload = function(){
    var oC = document.getElementById('c1');
    var oGC = oC.getContext('2d');
    var yImg = new Image();
    
    yImg.onload = function(){
        draw(this);
    }
    
    yImg.src = '../../images/3.jpg';
    
    function draw(obj){
        oC.width = obj.width;
        oGC.drawImage(obj, 0, 0);
        var oImg = oGC.getImageData(0, 0, obj.width, obj.height);
        var w = oImg.width;
        var h = oImg.height;
        var newImg = oGC.createImageData(obj.width, obj.height);
        //反色效果+倒影效果+渐变效果开始
        //反色，就是用255减去每个值
        
        //循环每一列；
        for(var i=0; i<h; i++){
        	
        	//循环每一行；
            for(var j=0; j<w; j++){
                var result = [];
                var color = getXY(oImg, j, i);
                result[0] = 255 - color[0];
                result[1] = 255 - color[1];
                result[2] = 255 - color[2];
                result[3] = 255*i/h;
                setXY(newImg, j, h-i, result);
            }
            
        }
        
        oGC.putImageData(newImg, 0, obj.height);
        //反色效果+倒影效果+渐变效果结束
    }
    
    function getXY(obj, x, y){
        var w = obj.width;
        var h = obj.height;
        var d = obj.data;
        var color = [];
        
        color[0] = d[4*(y*w+x)];
        color[1] = d[4*(y*w+x)+1];
        color[2] = d[4*(y*w+x)+2];
        color[3] = d[4*(y*w+x)+3];
        
        return color;
    }
    
    function setXY(obj, x, y, color){
        var w = obj.width;
        var h = obj.height;
        var d = obj.data;
        
        d[4*(y*w+x)] = color[0];
        d[4*(y*w+x)+1] = color[1];
        d[4*(y*w+x)+2] = color[2];
        d[4*(y*w+x)+3] = color[3];
    }
}

</script>
</head>
<body>
	<canvas id="c1" width="900" height="900"></canvas>
</body>
</html>
```

**马赛克效果**

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>图片的像素操作</title>
<style>
body {background: #000; color: white; font-size: 30px;}
#c1 {background: #fff;}
</style>
<script>
	
window.onload = function(){
    var oC = document.getElementById('c1');
    var oGC = oC.getContext('2d');
    var yImg = new Image();
    
    yImg.onload = function(){
        draw(this);
    };
    
    yImg.src = '../../images/3.jpg';
    
    function draw(obj){
        oC.width = obj.width;
        oC.height = obj.height * 2;
        oGC.drawImage(obj, 0, 0);
        var oImg = oGC.getImageData(0, 0, obj.width, obj.height);
        var w = oImg.width;
        var h = oImg.height;
        var newImg = oGC.createImageData(obj.width, obj.height);
        var num = 10;
        var stepW = w/num;
        var stepH = h/num;
        
        //马赛克效果就是在num×num的像素里面随机取一个颜色，把这个num×num的区域都改成这个颜色
        for(var i=0; i<stepH; i++){
        	
            for(var j=0; j<stepW; j++){
                var color = getXY(oImg, j*num+Math.floor(Math.random()*num), i*num+Math.floor(Math.random()*num));
                
                for(var k=0; k<num; k++){
                	
                    for(var l=0; l<num; l++){
                        setXY(newImg, j*num+l, i*num+k, color);
                    }
                    
                }
                
            }
            
        }
        
        oGC.putImageData(newImg, 0, obj.height);
    };
    
    function getXY(obj, x, y){
        var w = obj.width;
        var h = obj.height;
        var d = obj.data;
        var color = [];
        color[0] = d[4*(y*w+x)];
        color[1] = d[4*(y*w+x)+1];
        color[2] = d[4*(y*w+x)+2];
        color[3] = d[4*(y*w+x)+3];
        
        return color;
    };
    
    function setXY(obj, x, y, color){
        var w = obj.width;
        var h = obj.height;
        var d = obj.data;
        
        d[4*(y*w+x)] = color[0];
        d[4*(y*w+x)+1] = color[1];
        d[4*(y*w+x)+2] = color[2];
        d[4*(y*w+x)+3] = color[3];
    };
};

</script>
</head>
<body>
<canvas id="c1" width="900" height="900"></canvas>
</body>
</html>
```

## 合成

- 全局阿尔法值 
    * globalAlpha
- 覆盖合成 
    * 源：新的图形
    * 目标：已经绘制过的图形
    * globalCompositeOperation属性 
        * source-over destination-over source-atop
        * destination-atop source-in destination-in
        * source-out destination-out lighter
        * copy xor

**globalAlpha**
```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>合成</title>
<style>
    body {background: black;}
    #c1 {background: white;}
</style>
<script>
	
    window.onload = function(){
        var oC = document.getElementById('c1');
        var oGC = oC.getContext('2d');
        
        oGC.fillRect(0, 0, 100, 100);
        oGC.fillStyle = 'red';
        //在此之后操作的图形的透明度都会是半透明的;
        oGC.globalAlpha = 0.5;
        oGC.fillRect(50, 50, 100, 100);
    }
    
</script>
</head>
<body>
<canvas id="c1" width="400" height="400"></canvas>
</body>
</html>
```

**元素与元素叠加**
```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>元素与元素叠加</title>
<style>
    body {background: black;}
    #c1 {background: white;}
</style>
<script>
	
    window.onload = function(){
        var oC = document.getElementById('c1');
        var oGC = oC.getContext('2d');
        
        oGC.fillRect(0, 0, 100, 100);
        oGC.fillStyle = 'red';
        
        //source就是新画的，destination就是先画的
        //oGC.globalCompositeOperation = 'destination-over';
        //oGC.globalCompositeOperation = 'source-atop';
        oGC.globalCompositeOperation = 'xor';
        //默认后画的会盖在先画的前面。改变覆盖顺序用globalCompositeOperation属性;
        oGC.fillRect(50, 50, 100, 100);
    }
    
</script>
</head>
<body>
<canvas id="c1" width="400" height="400"></canvas>
</body>
</html>
```

## 将画布导出为图像

- toDataURL 
    * 火狐右键可以直接导出成图片
    
```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>画布导出为图像</title>
<style>
    body {background: blue;}
    #c1 {background: white;}
</style>
<script>
	
    window.onload = function(){
        var oImg = document.getElementById('img1');
        var oC = document.getElementById('c1');
        var oGC = oC.getContext('2d');
        
        oGC.fillRect(0, 0, 100, 100);
        oGC.fillStyle = 'red';
        oGC.globalCompositeOperation = 'xor';
        oGC.fillRect(50, 50, 100, 100);
        //alert(oC.toDataURL());

        //获取到画布的图片路径，然后赋值给导出的图片；
        //用这个方法方便我们在网页中随时调用所绘制的图片；
        oImg.src = oC.toDataURL();
    }
    
</script>
</head>
<body>
<canvas id="c1" width="400" height="400"></canvas>
<img id="img1" src="">
</body>
</html>
```

## 事件操作

- isPointInPath 
    * 是否在点击范围内；
    * 封装一个方法，即：点击不同的图形，执行不同的操作；
    * jCanvaScript(canvas中的jquery)： 
        * http://jcscript.com

**isPointInPath方法**

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>事件操作</title>
<style>
    body {background: #000; color: white; font-size: 30px;}
    #c1 {background: #fff;}
</style>
<script>
	
    window.onload = function(){
        var oC = document.getElementById('c1');
        var oGC = oC.getContext('2d');
        
        oGC.beginPath();
        oGC.arc(100, 100, 50, 0, 360*Math.PI/180, false);
        oGC.closePath();
        oGC.fill();
        oGC.beginPath();
        oGC.arc(200, 200, 50, 0, 360*Math.PI/180, false);
        oGC.closePath();
        oGC.fill();
        
        //点击圆以内的部分，弹出123
        oC.onmousedown = function(ev){
            var ev = ev || window.event;
            var x = ev.clientX - oC.offsetLeft;
            var y = ev.clientY - oC.offsetTop;
            
            if(oGC.isPointInPath(x, y)){
                //isPointInPath方法只针对最后一次画出来的那个图形
                alert(123);
            }
        }
    }
    
</script>
</head>
<body>
<canvas id="c1" width="400" height="400"></canvas>
</body>
</html>
```

**点击不同的图形，执行不同的操作**

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>事件操作</title>
<style>
    body {background: #000; color: white; font-size: 30px;}
    #c1 {background: #fff;}
</style>
<script>
	
    window.onload = function(){
        var oC = document.getElementById('c1');
        var oGC = oC.getContext('2d');
        var c1 = new Shape(100, 100, 50);
        var c2 = new Shape(200, 200, 50);
        
        oC.onmousedown = function(ev){
            var ev = ev || window.event;
            
            var point = {
                x : ev.clientX - oC.offsetLeft,
                y: ev.clientY - oC.offsetTop
            }
            
            c1.reDraw(point);
            c2.reDraw(point);
        }
        
        c1.click = function(){
            alert(123);
        }
        
        c2.click = function(){
            alert(456);
        }
        
        //要通过对象来实现。点击某个图形的时候，先找到这个图形对应的对象，然后再让这个图形重绘一下，然后就可以使用isPointInPath方法了，因为这个方法只能针对最后一个绘制的图形起作用。
        function Shape(x, y, r){
            this.x = x;
            this.y = y;
            this.r = r;
            oGC.beginPath();
            oGC.arc(this.x, this.y, this.r, 0, 360*Math.PI/180, false);
            oGC.closePath();
            oGC.fill();
        }
        
        Shape.prototype.reDraw = function(point){
            oGC.beginPath();
            oGC.arc(this.x, this.y, this.r, 0, 360*Math.PI/180, false);
            oGC.closePath();
            oGC.fill();
            
            if(oGC.isPointInPath(point.x, point.y)){
                this.click();
            }
        }
    }
    
</script>
</head>
<body>
<canvas id="c1" width="400" height="400"></canvas>
</body>
</html>
```

**jCanvaScript的绘制和点击操作**

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>jCanvaScript的使用</title>
<style>
    body {background: #000; color: white; font-size: 30px;}
    #c1 {background: #fff;}
</style>
<script src="jCanvaScript.1.5.18.js"></script>
<script>
	
    window.onload = function(){
        var oC = document.getElementById('c1');
        var oGC = oC.getContext('2d');
        
        //开始 把canvas的id传进去 第二个参数代表“重绘”，也就是当有事件的时候，它会重新绘制；
        jc.start('c1', true);
        //jc.rect(100, 100, 50, 50, '#ff0000' , true); //画一个方形
        //jc.circle(100, 100, 50, '#ff0000', 1); //画一个圆形
        jc.circle(100, 100, 50, '#ff0000', 1).click(function(){
            alert(123);
        });
        
        jc.start('c1'); //闭合
    }
    
</script>
</head>
<body>
<canvas id="c1" width="400" height="400"></canvas>
</body>
</html>
```

**用jCanvaScript实现拖拽**

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>用jCanvaScript实现拖拽</title>
<style>
    body {background: #000; color: white; font-size: 30px;}
    #c1 {background: #fff;}
</style>
<script src="jCanvaScript.1.5.18.js"></script>
<script>
	
    window.onload = function(){
        var oC = document.getElementById('c1');
        var oGC = oC.getContext('2d');
        
        jc.start('c1', true); 
        jc.circle(100, 100, 50, '#ff0000', 1).draggable();
        jc.start('c1');
    }
    
</script>
</head>
<body>
<canvas id="c1" width="400" height="400"></canvas>
</body>
</html>
```

**通过jCanvaScript让外部按钮控制画布**

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>通过jCanvaScript让外部按钮控制画布</title>
<style>
    body {background: #000; color: white; font-size: 30px;}
    #c1 {background: #fff;}
</style>
<script src="jCanvaScript.1.5.18.js"></script>
<script>
	
    window.onload = function(){
        var oInput = document.getElementById('input1');
        var oC = document.getElementById('c1');
        var oGC = oC.getContext('2d');
        
        jc.start('c1', true); 
        jc.circle(100, 100, 50, '#ff0000', 1).id('circle1');
        jc.start('c1');
        
        oInput.onclick = function(){
            jc('#circle1').color('#ffff00');
        };
    };
    
</script>
</head>
<body>
<canvas id="c1" width="400" height="400"></canvas>
<input type="button" value="点击" id="input1">
</body>
</html>
```

**通过jCanvaScript实现运动效果**

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>通过jCanvaScript实现运动效果</title>
<style>
    body {background: #000; color: white; font-size: 30px;}
    #c1 {background: #fff;}
</style>
<script src="jCanvaScript.1.5.18.js"></script>
<script>
	
    window.onload = function(){
        var oInput = document.getElementById('input1');
        var oC = document.getElementById('c1');
        var oGC = oC.getContext('2d');
        
        jc.start('c1', true); 
        jc.circle(100, 100, 50, '#ff0000', 1).id('circle1');
        jc.start('c1');
        
        oInput.onclick = function(){
            jc('#circle1').color('#ffff00').animate({x: 200, y: 200, radius: 5}, 2000);
        };
    };
    
</script>
</head>
<body>
<canvas id="c1" width="400" height="400"></canvas>
<input type="button" value="点击" id="input1">
</body>
</html>
```

**简易祖玛小游戏**

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>简易祖玛小游戏</title>
<style>
    * {margin: 0; padding: 0;}
    body {background: black;}
    #div1 {background: white; width: 600px; margin: 20px auto;}
</style>
<script>
	
window.onload = function(){
    var oC = document.getElementById('c1');
    var oGC = oC.getContext('2d');
    var i = 0;
    var yImg = new Image();
    
    yImg.src = 'person.png';
    
    yImg.onload = function(){
    	
        setInterval(function(){
            oGC.clearRect(0, 0, oC.width, oC.height);
            oGC.beginPath();
            oGC.arc(300, 200, 200, -90*Math.PI/180, 180*Math.PI/180, false);
            oGC.stroke();
            oGC.beginPath();
            oGC.arc(250, 200, 150, 180*Math.PI/180, 360*Math.PI/180);
            oGC.stroke();
            oGC.beginPath();
            oGC.arc(400, 200, 20, 0, 360*Math.PI/180);
            oGC.stroke();
            
            for(var i=0; i<ball.length; i++){
                oGC.beginPath();
                oGC.moveTo(ball[i].x, ball[i].y);
                oGC.arc(ball[i].x, ball[i].y, 20, 0, 360*Math.PI/180, false);
                oGC.fill();
            }
            
            oGC.save()
            oGC.translate(300, 200);
            oGC.rotate(iRotate);
            oGC.translate(-40, -40);
            oGC.drawImage(yImg, 0, 0);
            oGC.restore();
            
            for(var i=0; i<bullet.length; i++){
                oGC.save();
                oGC.fillStyle = 'red';
                oGC.beginPath();
                oGC.moveTo(bullet[i].x, bullet[i].y);
                oGC.arc(bullet[i].x, bullet[i].y, 20, 0, 360*Math.PI/180, false);
                oGC.fill();
                oGC.restore();
            }
            
            oGC.save();
            oGC.font = '60px impact';
            oGC.textBaseline = 'top';
            oGC.fillStyle = 'red';
            oGC.shadowOffsetX = 10;
            oGC.shadowOffsetY = 10;
            oGC.shadowColor = 'green';
            oGC.shadowBlur = 5;
            var w = oGC.measureText('简易祖玛').width;
            var h = 60;
            oGC.fillText('简易祖玛', (oC.width-w)/2, 450);
            oGC.restore();
        }, 1000/60);
        
        setInterval(function(){
            for(var i=0; i<ball.length; i++){
                ball[i].num++;
                
                if(ball[i].num == 270){
                    ball[i].r = 150;
                    ball[i].startX = 250;
                    ball[i].startY = 50;
                }
                
                if(ball[i].num == 270 + 180){
                    alert('游戏结束');
                    window.location.reload(); //刷新一下页面
                }
                
                ball[i].x = Math.sin(ball[i].num*Math.PI/180) * ball[i].r + ball[i].startX;
                ball[i].y = ball[i].r - Math.cos(ball[i].num*Math.PI/180) * ball[i].r + ball[i].startY;
            }
            
            for(var i=0; i<bullet.length; i++){
                bullet[i].x = bullet[i].x + bullet[i].sX;
                bullet[i].y = bullet[i].y + bullet[i].sY;
            }
            
            for(var i=0; i<bullet.length; i++){
            	
                for(var j=0; j<ball.length; j++){
                	
                    if(pz(bullet[i].x, bullet[i].y, ball[j].x, ball[j].y)){
                        bullet.splice(i, 1);
                        ball.splice(j, 1);
                        break;
                    }
                    
                }
                
            }
            
        }, 30)
        
        var ball = [];
        
        ball[0] = {
            x : 300,
            y : 0,
            r : 200,
            num : 0, //角度
            startX : 300,
            startY : 0
        };
        
        setInterval(function(){
            ball.push({
                x : 300,
                y : 0,
                r : 200,
                num : 0, //角度
                startX : 300,
                startY : 0
            })
        }, 350);
        
        var iRotate = 0;
        
        oC.onmousemove = function(ev){
            var ev = ev || window.event;
            var x = ev.clientX - oC.offsetLeft;
            var y = ev.clientY - oC.offsetTop;
            var a = x - 300;
            var b = y - 200;
            var c = Math.sqrt(a*a + b*b);
            
            if(a>0 && b>0){
                iRotate = Math.asin(b/c) + 90*Math.PI/180;
            } else if(a>0){
                iRotate = Math.asin(a/c);
            }
            
            if(a<0 && b>0){
                iRotate = -(Math.asin(b/c) + 90*Math.PI/180);
            } else if(a<0){
                iRotate = Math.asin(a/c);
            }
        }
        
        var bullet = [];
        
        oC.onmousedown = function(ev){
            var ev = ev || window.event;
            var x = ev.clientX - oC.offsetLeft;
            var y = ev.clientY - oC.offsetTop;
            var a = x - 300;
            var b = y - 200;
            var c = Math.sqrt(a*a + b*b);
            var speed = 5;
            var sX = speed * a/c;
            var sY = speed * b/c;
            
            bullet.push({
                x : 300,
                y : 200,
                sX : sX,
                sY : sY
            });
            
        }
    }
    
    //球的碰撞检测 检测两个圆心之间的距离是否小于两个圆半径之和；
    function pz(x1, y1, x2, y2){
        var a = x1 - x2;
        var b = y1 - y2;
        var c = Math.sqrt(a*a + b*b);
        
        if(c<40){
            return true;
        } else {
            return false;
        }
        
    }
}

</script>
</head>
<body>
<div id="div1">
    <canvas id="c1" width="600" height="600"></canvas>
</div>
</body>
</html>
```