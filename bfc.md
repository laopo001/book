### 块格式化上下文
#### (Block Formatting Context，BFC） 是Web页面的可视CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。


* 根元素，即HTML标签
* 浮动元素：float值为left、right
* overflow值不为 visible，为 auto、scroll、hidden
* display值为 inline-block、table-cell、table-caption、table、inline-table、flex、inline-flex、grid、inline-grid
* 定位元素：position值为 absolute、fixed

#### BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然。我们可以利用BFC的这个特性来做很多事。

