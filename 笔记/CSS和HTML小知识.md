# CSS和HTML小知识

标签： CSS HTML

---

## 圆角：

- 语法：border-radius:150px / 200px;

## 多背景：在CSS3可以设置多背景，中间用逗号隔开，可以设置基础样式和尺寸。

- 语法：
```
background:url("1.jpg") no-repeat,url("2.jpg") no-repeat;
background-size:40% 30%,40% 30%;
```
- background-size的四种值：
1. 具体的数值（X轴 Y轴）：10px
2. 百分比（X轴 Y轴）：50%
3. cover：装满整个盒子
4. contain：尽量让整个图片显示出来

## 背景裁切：background-clip
```
background-clip:
    padding-box;
    border-box;
    content-box;
    -webkit-text;（配合文字使用）
```

## 蒙版和倒影

- 蒙版：目前只有-webkit-的浏览器支持，其他不支持；
1. 说明：需要PNG的透明度遮罩；
2. 语法：-webkit-mask:url("1.png");
3. 其他：可以多背景；

- 倒影：目前只有-webkit-的浏览器支持，其他不支持；
1. 语法：-webkit-box-reflect:left
2. 说明：图片也可以是GIF动态图。
3. 取值：
    - none：默认值，表示无倒影效果；
    - above：表示生成的倒影在对象（原图）的上方；
    - below：表示生成的倒影在对象（原图）的下方；
    - left：表示生成的倒影在对象(原图)的左侧；
    - right：表示生成的倒影在对象(原图)的右侧；

4. 例子：
```
-webkit-box-reflect:below 10px linear-gradient(to top,
    rgba(255,255,255,1),
    rgba(255,255,255,0)
);
```

5. 带蒙版效果的倒影例子：-webkit-box-reflect:below 10px url("1.png");