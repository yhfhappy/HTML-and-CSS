# CSS3渐变

标签： CSS

---

渐变：需要添加浏览器前缀，且IE9及以下不支持；

1. 线型渐变：渐变属于背景下的一个属性；
    - 例子：background:linear-gradient(90deg,red,yellow);
    - 第一个值：角度，可以是具体的值，也可以是模糊的值；
    - 说明：角度是指水平线和渐变线之间的角度，按逆时针方向计算。
```
background:linear-gradient(90deg,red,yellow);
background:linear-gradient(left,red,yellow);
background:linear-gradient(left top,red,yellow);
background:linear-gradient(left top,red 100px,yellow 300px);
```

2. 径向渐变：IE9及以下不支持，渐变属于背景下的一个属性；
    - 例子：background:radial-gradient(at center,red,yellow,blue);
    - 说明：径向渐变是从圆心往外渐变；
    - 取值：
        - 第一个值：圆心位置
        - 可以是模糊的值：at center、at left、at right、at bottom
        - 也可以是具体的值：at 100px 200px
        - 第二个值以后是颜色值：可以无限一直写。
```
background:radial-gradient(at center,red,yellow,blue);
background:radial-gradient(at 200px 200px,red,yellow,blue);
background:radial-gradient(at 200px 200px,red 100px,yellow 200px,blue);
background:radial-gradient(at 200px 200px,red 20%,yellow 50%,blue);
background:radial-gradient(at 200px 200px,red 20%,yellow 50%,blue);
```

```
永远是个圆：background:radial-gradient(circle at left,red,yellow,blue);
background:radial-gradient(circle,red,yellow,blue);
```

标准之前：不能加at

3. 重复的渐变：
    - 例子：background:repeating-radial-gradient(at center,red 20%,yellow 50%,blue 30%);




