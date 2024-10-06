# wx-swiper-component

#### 介绍
微信小程序swiper组件封装，实现菜单切换标记、高度自适应、动画

适用场景：适用于整个页面数据的滚动效果，或者位于页面底部区域

注意：宽度是100%，不要限制，否则会影响menu的标记位样式，如果内容需要两边留空可以加padding



#### 使用说明
1.  从components里把组件带走，放到自己的项目中
2.  在页面的json中引入组件
3.  在页面的wxml中使用，具体可以看index里的例子

|参数|说明|默认值|
|:---|:---|:----:|
|menu|顶部导航list|[]|
|menuStyle|导航整体样式|空|
|menuShow|是否展示菜单|true|
|height|高度设置，如果设置为大于0，高度不再自动调整|0|
|index|索引，一开始展示第几个|0|
需要注意的是wxml中的`slot="swiper-item-{{stage}}"`，要把slot给到，stage从0-n，一一对应menu数

#### 特技
1. 博客L：[个人博客](http://blog.1z5k.com/)、[知乎同步博客](https://www.zhihu.com/creator/manage/creation/article)
2. 微信小程序开发者，相关作品有：

**日历小记：** 阳历阴历，排班待办，日记备忘录，星座老黄历

**AI星座占星师：** 星座运势，男女搭配，AI占星师为你提供意见

**提前还贷月供计算器：** 房贷、商贷、公积金贷款，各种还款计算器

|日历小记|AI星座占星师|提前还贷月供计算器|
|:---:|:---:|:----:|
|![image.png](https://miaomushan.top/index/img/rili.jpeg)|![image.png](https://miaomushan.top/index/img/star.jpeg)|![image.png](https://img.meituan.net/chatpicture/bea8e84845d575c1e87614c560053cb790444.jpg)|

