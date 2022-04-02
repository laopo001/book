```
link和@import的区别：
1）link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。
2）link可以加载CSS，Javascript；@import只能加载CSS。
3）link加载的内容是与页面同时加载；@import需要页面网页完全载入以后加载。
```

```
关于下列 CSS 选择器：ID 选择器、类选择器、伪类选择器、标签名称选择器，排序正确的是：（D）
ID 选择器 > Class 选择器 > 伪类=标签名称选择器
ID 选择器 > 伪类 > Class 选择器 > 标签名称选择器
ID 选择器 > Class 选择器 > 伪类 > 标签名称选择器
ID 选择器 > Class 选择器 = 伪类 > 标签名称选择器
```


```
块格式化上下文（Block Formatting Context，BFC） 是Web页面的可视CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

下列方式会创建块格式化上下文：

根元素（<html>）
浮动元素（元素的 float 不是 none）
绝对定位元素（元素的 position 为 absolute 或 fixed）
行内块元素（元素的 display 为 inline-block）
表格单元格（元素的 display 为 table-cell，HTML表格单元格默认为该值）
表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot 的默认属性）或 inline-table）
overflow 计算值(Computed)不为 visible 的块元素
display 值为 flow-root 的元素
contain 值为 layout、content 或 paint 的元素
弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
网格元素（display 为 grid 或 inline-grid 元素的直接子元素）
多列容器（元素的 column-count 或 column-width (en-US) 不为 auto，包括 column-count 为 1）
column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。

作用
外边距合并, 创建新的 BFC 避免两个相邻 <div> 之间的 外边距合并 问题
清除浮动，让浮动内容和周围的内容等高
```


```
块盒子：display:block
换行
width和height生效
竖直方向padding和margin生效
内联盒子：display:inline
不换行
width和height无效
竖直方向padding和margin无效
内联块盒子：display:inline-block
不换行
width和height生效
竖直方向padding和margin生效
```

```
盒模型由内向外：内容 content + 内边距 padding + 边框 border + 外边距 margin

分为两类：
标准盒模型：border-sizing:content-box
width 和 height 设置内容 content 的宽和高

替代盒模型：border-sizing:border-box
width 和 height 设置内容 content + 内边距 padding + 边框 border 的宽和高
```

```
CSS 属性分为非继承属性和 继承属性，继承属性的默认值为父元素的该属性的 计算值，非继承属性和根元素的继承属性的默认值为初始值。

对于非继承属性，可以显示的声明属性值为 inherit，让子元素的属性继承父元素。

常见的继承属性：

字体 font 系列
文本 text-align text-ident line-height letter-spacing
颜色 color
列表 list-style
可见性 visibility
光标 cursor
容易被误认为继承属性的 非继承属性：

透明度 opacity
背景 background系列
```

```
属性值initial可以将属性设为W3C规范初始值

属性all可以将元素的所有属性重置

在规范之外，浏览器还会为部分元素，如表单元素设置默认样式

属性的值来源于开发者定义，用户配置和浏览器默认

all:initial相当于清空了用户配置和浏览器默认样式

工作中，我们更希望重置到默认样式，而不是清空它们

all:revert属性还原。可以将子元素的属性重置按如下规则重置：

继承属性：重置到父元素的属性值
非继承属性或父元素继承属性都未设置：重置到用户配置和浏览器默认属性
```