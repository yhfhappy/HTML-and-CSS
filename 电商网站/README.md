# 笔记

## 网站头部
1. 因为网站链接绝大多数是灰色，所以把这个颜色直接添加到reset.css中；
2. LOGO部分有问题，待修复；
3. IE6下input边框未清掉的问题：
    - 在样式重置时给input添加一个背景为none：`background:none;`
    - 给input添加背景：`background-color: #FFF;`；
4. IE6下input光标的兼容问题：
    - 方法一：字体大小、高度和行高一致，其它的用内边距挤；
    - 方法二：CSS hack，\9代表所有IE浏览器，`line-height: 35px\9;`


## 其它
1. CSS选择器尽量减少层次，减少重复查找的次数；
2. Fireworks导出图标，ALT+SHIFT+U ；