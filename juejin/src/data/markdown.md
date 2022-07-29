58面试
React diff算法
vue多个slot怎么区分 slot原理
js多个继承的区别、优缺点
setState 同步异步
输入URL后续
前端优化
数组哪些操作会改变原数组结构

重绘、回流
  requestAnimationFrame 是为了实现更流畅和性能更好的动画；
  requestIdleCallback 是为了在渲染空闲时间执行优先级不高的操作，以避免阻塞渲染。
  两者放到一起进行说明是因为它们都是由浏览器控制执行时机，而不是由开发者通过定时器控制。另外，相对于不使用这两个方法，使用它们都能在一定的情况下获得性能的提升。

react hooks优缺点
组件加key的作用
vue组件通讯
垃圾回收机制
vue2、vue3对比
vite打包兼容低版本浏览器
未知宽高元素水平垂直居中方法
Vuex是什么
mobx原理
nodejs koa的中间件
webpack如何编写插件
interface type区别
vue-router 路由守卫相关概念
useCallback useMemo 区别
React ref用处

bfc原理 用处
  
移动端兼容性处理、适配方案
promise.all的用法用处
vue组件通讯、组件封装、文件上传进度控制
同时渲染大量dom 怎么优化
ES6转化es5的原理
vue mvvm  data为什么是函数

伪元素 伪类
css 变化
git pull git fetch 区别

react 生命周期
组件封装注意事项

html5新特性
http websocket区别

vue react对比
相似之处：
  1、都是用于创建UI的JavaScript库；
  2、都是用虚拟DOM；

不同点
  1、Vue通常使用HTML模板文件，而React则完全是JavaScript。Vue有双向绑定语法糖。
  2、Vue组件分为全局注册和局部注册，在react中都是通过import相应组件，然后模版中引用；
  3、props是可以动态变化的，子组件也实时更新，在react中官方建议props要像纯函数那样，输入输出一致对应，而且不太建议通过props更改视图；
  4、子组件一般要显示地调用props选项来声明它期待获得的数据。而在react中不必需，另两者都有props校验机制；
  5、每个Vue实例都实现了事件接口，方便父子组件通信，小型项目中不需要引入状态管理机制，而react必需自己实现；
  6、使用插槽分发内容，使得可以混合父组件的内容与子组件自己的模板；
  7、多了指令系统，让模版可以实现更丰富的功能，而React只能使用JSX语法；
  8、Vue增加的语法糖computed和watch，而在React中需要自己写一套逻辑来实现；
  9、react的思路是all in js，通过js来生成html，所以设计了jsx，还有通过js来操作css，社区的styled-component、jss等；而 vue是把html，css，js组合到一起，用各自的处理方式，vue有单文件组件，可以把html、css、js写到一个文件中，html提供了模板引擎来处理。
  10、react是整体的思路的就是函数式，所以推崇纯组件，数据不可变，单向数据流，当然需要双向的地方也可以做到，比如结合redux-form，组件的横向拆分一般是通过高阶组件。而vue是数据可变的，双向绑定，声明式的写法，vue组件的横向拆分很多情况下用mixin。

防抖
  1、在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
  2、输入搜索、滚动触发、window.resize触发
节流
  1、规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
  2、重复点击、滚动底部加载更多
 
浅拷贝：
  创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。
深拷贝：
  将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象。

闭包：
  1、上级作用域内变量的生命周期，因为被下级作用域内引用，而没有被释放。就导致上级作用域内的变量，等到下级作用域执行完以后才正常得到释放
js执行作用域环境
  1、作用域就是代码的执行环境，全局作用域就是全局执行环境，局部作用域就是函数的执行环境，它们都是栈内存
  2、在 Web 浏览器中，全局作用域被认为是 window 对象，因此所有全局变量和函数都是作为 window 对象的属性和方法创建的。
  3、在 Node环境中，全局作用域是 global 对象。
作用域链
  1、多个作用域对象连续引用形成的链式结构。
  2、使用方面解释：当在Javascript中使用一个变量的时候，首先Javascript引擎会尝试在当前作用域下去寻找该变量，如果没找到，再到它的上层作用域寻找，以此类推直到找到该变量或是已经到了全局作用域，如果在全局作用域里仍然找不到该变量，它就会直接报错。
  3、存储方面解释：作用域链在JS内部中是以数组的形式存储的，数组的第一个索引对应的是函数本身的执行期上下文，也就是当前执行的代码所在环境的变量对象，下一个索引对应的空间存储的是该对象的外部执行环境，依次类推，一直到全局执行环境

原型：
  在JS中每个构造器（函数）都有一个属性叫prototype，它叫原型，也是个对象，我们叫这个对象为原型对象；而每个对象中有一个属性叫__proto__，它叫隐式原型。
原型链:
  原型链是一个对象的查找机制，比如查找对象arr中的toString方法，会先在自己的私有属性中找，如果没有，就沿着__proto__去原型对象中找，如果还没有，就继续沿着__proto__去它原型对象中的原型对象中找，直到找到Object中的原型对象（Object原型对象中的__proto__指向null），如果还没找到，那么结果就是undefined；

Vue响应式原理：
  1、通过Object.defineProperty为对象obj添加属性，可以设置对象属性的getter和setter函数。之后我们每次通过点语法获取属性都会执行这里的getter函数，在这个函数中把调用此属性的依赖收集到一个集合中；而在我们给属性赋值(修改属性)时，会触发setter函数，在次函数中会去通知集合中的依赖更新，做到数据变更驱动视图变更。
  2、vue3数据的劫持使用Proxy而不是Object.defineProperty，只不过Proxy相比Object.defineProperty在处理数组和新增属性的响应式处理上更加方便。
Vue双向数据绑定：
  双向数据绑定通常是指我们使用的v-model指令的实现，是Vue的一个特性，也可以说是一个input事件和value的语法糖。 Vue通过v-model指令为组件添加上input事件处理和value属性的赋值。

  1、当把一个普通 Javascript 对象传给 Vue 实例来作为它的 data 选项时，Vue 将遍历它的属性，用 Object.defineProperty 都加上 setter和getter 这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化
  2、compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
  3、Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是:
    1、在自身实例化时往属性订阅器(dep)里面添加自己
    2、自身必须有一个update()方法
    3、待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。
  4、MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果


typescript范型
路由权限配置
设计模式

网页宽度一般根据屏幕的分辨率来设计。
1366×768
1440×900
1920×1080
1600×900
1280×800
1280×1024

移动端H5的尺寸一般设计为640x1136px。

e.stopPropagation();  
e.preventDefault();//阻止默认事件

项目经验参考：
  工作内容
    1.独立构建SPA脚手架，支持不同环境加载不同CDN资源
    2.项目支持PC端和IPAD端的自适应布局，完成统一的RESTFUL的标准化接口
    3.进行二次业务组件，将常规的查询、自定义表单等封装成公共组件
    4.完成动态编辑图表等五个模块，支持PDF下载
  项目业绩:
    1.通过vue-cli3进行了打包依赖优化，节省了大概20%的编译时间。
    2.利用elementUI封装的业务组件不仅统一了各个业务模块的UI交互，而且减少了30%的开发时间。大大减低了研发成本。
    3.通过使用YAPI以及自定义数据mock方案，克服了项目开发前期的数据联调困难，极大得提高了开发效率。
    4.基于echart完成的动态报表组件，实现了不同的报表需求随时动态编辑，快速上线，不再需要每次重新开发和发版。
    5.最终基于这个项目整理出了标准化的后台模板，并在其他业务线进行了推广。


项目收获、积累了些经验
问题：
1、代码业务量增多 打包速度变慢
2、页面结构复杂、工具类库变多、开源工具增多
3、复杂的组件联动造成开发成本剧增、表单校验复杂
4、状态管理增多
5、API 重复接口 返回数据格式不统一
6、缺乏相应的项目文档

经验：
1、适度抽离组件、符合业务需求
2、代码规范、理清业务逻辑，便于维护
3、接口返回格式规范化
4、迭代（重新修改原来的代码、新写代码）
5、过滤器重复、替换
6、有效封装公共库
7、学员app 操作动态通知、必要的文档说明

更便捷的表单验证

前端性能监控 =>  难点突破  => 优化改进 => 技术规范、技术规划  =>  技术提升可视化

5人团队：
  技术主导变成业务优先，技术制胜，通过技术拆解的方式进行业务开发 
5-20人团队：
  基础能力沉淀、输出解决方案、基础设施搭建
  责任分层、人才培养、引入目标制定管理方法论、有效规范的项目管理机制、形成个人成长的固定机制、深入了解业务商业价值、


crm业务线
  总部：角色、菜单权限、员工、数据总览、版本、渠道、物流
  辅导：学员管理、班级、作业、质检、续报、业绩、订单、工单、学员详情
  电销：智能线索、跟进、业绩、工单、课程下单、退费、销售目标、学员详情
  增长：渠道、活动、任务、群控、成本、业绩大屏、转化

行业选择：
  1、以技术服务为驱动
  2、有技术积累
  3、目前的发展
  4、未来的发展潜力
公司选择：
  1、有一份好的工资待遇。
  2、有一个锻炼自己的机会。
  3、有一个好的发展空间。
  4、有一个舒心的工作环境。


h5选择图片会闪退
原因：选择的图片会放到
修正图片旋转角度问题

搭建项目考虑的问题：
 1、技术选型
 2、打包工具选择
 3、系统权限分配
 4、项目目录结构
 5、封装公用方法
 6、API 请求拦截
 7、制定代码规范
 8、路由配置
 9、公用组件封装
 10、数据状态管理
 11、版本兼容性


 h5相关问题
 页面回退前进状态数据保存 keep-alive
 支付相关
 h5登录状态 微信授权 权限获取 openID unid
 浏览器本地存储

 
