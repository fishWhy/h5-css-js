## vue-router(路由)

### 1.初识路由

生活中的路由器提供了两种机制: **路由和转送.**

​		**路由是决定数据包从来源到目的地的路径.**
​		**转送将输入端的数据转移到合适的输出端.**
路由中有一个非常重要的概念叫**路由表**.
**路由表本质上就是一个映射表, 决定了数据包的指向.**



后端路由阶段，前后端分离阶段，单页面富应用阶段（SPA，前端维护一套路由规则）。

**前端路由的核心是：改变URL，但是页面不进行整体的刷新。**



### 2.前端路由规则

<font color=red>**建议先看看前端的URL由哪几部分组成，每一部分代表什么意思**：</font><https://blog.csdn.net/weixin_45525272/article/details/109586021>

#### 2.1 URL的hash

URL的hash也就是锚点(#), 本质上是改变window.location的href属性.

**我们可以通过直接赋值location.hash来改变href, 但是页面不发生刷新**

![1606393536073](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606393536073.png)

#### 2.2HTML5的history模式

**history接口是HTML5新增的, 它有五种模式改变URL而不刷新页面.**

##### history.pushState()

![1606393655107](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606393655107.png)

##### history.replaceState()

![1606393683019](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606393683019.png)

##### history.go()

![1606393706367](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606393706367.png)

##### history.back()

 history.back() 等价于 history.go(-1)

##### history.forward()

history.forward() 则等价于 history.go(1)



history.back(), history.forward(), history.go()这三个接口等同于浏览器界面的前进后退。

### 3.认识vue-router

目前前端流行的三大框架, 都有自己的路由实现:
	Angular的ngRouter	React的ReactRouter	Vue的vue-router

当然, 我们的重点是vue-router
		vue-router是Vue.js官方的路由插件，它和vue.js是深度集成的，适合用于构建单页面应用。
		我们可以访问其官方网站对其进行学习: https://router.vuejs.org/zh/
**vue-router是基于路由和组件的**
		**路由用于设定访问路径, 将路径和组件映射起来.**
		**在vue-router的单页面应用中, 页面的路径的改变就是组件的切换.**

#### 3.1 安装和配置vue-router

因为我们已经学习了webpack, 后续开发中我们主要是通过工程化的方式进行开发的.
		所以在后续, 我们直接使用npm来安装路由即可.		

步骤一: 安装vue-router
npm install vue-router --save

步骤二: 在模块化工程中使用它(因为是一个插件, 所以可以通过Vue.use()来安装路由功能)
	第一步：导入路由对象，并且调用 Vue.use(VueRouter)

​	第二步：创建路由实例，并且传入路由映射配置

router/index.js

```javascript
//router/index.js文件
import Vue from 'vue' 
import VueRouter from 'vue-router' 
//1.注入插件
Vue.use(VueRouter)

//2.定义路由
const routes = []

//3.创建router实例
const router  = new VueRouter({
	routes
})

//4.导入router实例
export default router
```

第三步：在Vue实例中挂载创建的路由实例
src/main.js

```javascript
import Vue from 'vue'
import App from './App'
import router from '.router'

new Vue({
	el: '#app',
	router,
	render: h=>h(App)
})

```

#### 3.2 使用vue-router的步骤:



##### 3.2.1实例讲解

​	第一步: 创建路由组件

```
在/src/components下创建about.vue和home.vue两个组件
```

​	第二步: 配置路由映射: 组件和路径映射关系

```javascript
// router/index.js文件
...
import Home from '../components/home'
import About from '../components/about'
...
//2.定义路由
const routes = [
	{
		path: '/home',
		component: Home
	},
	{
		path: '/about',
		component: About
	}
	]
...
```

第三步: 使用路由: 通过<router-link>和<router-view>

如下例：

```javascript
//App.vue文件
<template>
    <div id="app">
    	<h1>我是网站的标题</h1>
		<router-link to="/home">首页</router-link>
		<router-link to="/home">首页</router-link>
		<router-view></router-view>
		<h2>我是App中一些底部模板信息</h2>
    </div>
</template>
...
```

**<router-link>: 该标签是一个vue-router中已经内置的组件, 它会被渲染成一个<a>标签.**
**<router-view>: 该标签会根据当前的路径, 动态渲染出不同的组件.**
网页的其他内容, 比如顶部的标题/导航, 或者底部的一些版权信息等会和<router-view>处于同一个等级.
**在路由切换时, 切换的是<router-view>挂载的组件, 其他内容不会发生改变.**

效果：

![1606395543685](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606395543685.png)

#### 

##### 3.2.2 路由的默认路径

我们这里还有一个不太好的实现:
		默认情况下, 进入网站的首页, 我们希望<router-view>渲染首页的内容.
		但是我们的实现中, 默认没有显示首页组件, 必须让用户点击才可以.
**如何可以让路径默认跳到到首页, 并且<router-view>渲染首页组件呢?**
		非常简单, 我们只需要配置多配置一个映射就可以了.

```javascript
const routes = [
	{
		path: '/',
		redirect: '/home'
	}
]
//配置解析:
//我们在routes中又配置了一个映射. 
//path配置的是根路径: /
//redirect是重定向, 也就是我们将根路径重定向到/home的路径下, 这样就可以得到我们想要的结果了.
```

##### 3.2.3 html5的History模式

我们前面说过改变路径的方式有两种:
	URL的hash		HTML5的history	**默认情况下, 路径的改变使用的URL的hash.**
**如果希望使用HTML5的history模式, 非常简单, 进行如下配置即可:**

```javascript
//  router/index.js文件
//3.创建router实例
const router  = new VueRouter({
	routes,
    mode:'history'
})
```

![1606396536528](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606396536528.png)

##### 3.2.4 router-link补充

在前面的<router-link>中, 我们只是使用了一个属性: to, 用于指定跳转的路径.
<router-link>还有一些其他**属性**:
		**tag:** tag可以指定<router-link>之后渲染成什么组件, 比如上面的代码会被渲染成一个<li>元素, 而不是<a>
		**replace**: replace不会留下history记录, 所以指定replace的情况下, 后退键返回不能返回到上一个页面中
		**active-class**: 当<router-link>对应的路由匹配成功时, 会自动给当前元素设置一个router-link-active的class, 设置active-class可以修改默认的名称.
				在进行高亮显示的导航菜单或者底部tabbar时, 会使用到该类.
				但是通常不会修改类的属性, 会直接使用默认的router-link-active即可. 

![1606397511295](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606397511295.png)

##### 3.2.5修改linkActiveClass

该class具体的名称也可以通过router实例的属性进行修改 

```javascript
//router/index.js文件
...
//3.创建router实例
const router  = new VueRouter({
	routes,
    mode: 'history',
    linkActiveClass:'active'
})
...
```

exact-active-class**类似于active-class**, 只是在精准匹配下才会出现的class.后面看到嵌套路由时, 我们再看下这个属性.

#### <font color=red>3.3 路由代码跳转</font>

有时候, 页面的跳转可能需要执行对应的JavaScript代码, 这个时候, 就可以使用第二种跳转方式了

比如, 我们将代码修改如下: 

![1606397913650](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606397913650.png)

#### <font color=red>3.4动态路由</font>

在某些情况下，一个页面的path路径可能是不确定的，比如我们进入用户界面时，希望是如下的路径：
		/user/aaaa或/user/bbbb
		除了有前面的/user之外，后面还跟上了用户的ID
		这种path和Component的匹配关系，我们称之为动态路由(也是路由传递数据的一种方式)。

```javascript
// router/index.js文件
...
import User from '../components/user'
...
//2.定义路由
const routes = [
	{
		path: '/user/:id',
		component: User
	}
	]
...
```

![1606398082190](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606398082190.png)

```html
<div>
    <h2>{{$route.params.id}}</h2>
</div>
```

```html
<router-link to="/user/123">用户</router-link>
```

效果：

![1606398096025](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606398096025.png)





### 4.路由懒加载

**官方给出了解释:**
		当打包构建应用时，Javascript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了



**官方在说什么呢?**
		**首先, 我们知道路由中通常会定义很多不同的页面.**
		**这个页面最后被打包在哪里呢? 一般情况下, 是放在一个js文件中.**
		**但是, 页面这么多放在一个js文件中, 必然会造成这个页面非常的大.**
		**如果我们一次性从服务器请求下来这个页面, 可能需要花费一定的时间, 甚至用户的电脑上还出现了短暂空白的情况.**
		如何避免这种情况呢? 使用路由懒加载就可以了.



**路由懒加载做了什么?**
		**路由懒加载的主要作用就是将路由对应的组件打包成一个个的js代码块.**
		**只有在这个路由被访问到的时候, 才加载对应的组件**



路由懒加载效果：

![1606398587755](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606398587755.png)



懒加载的方式：

方式一: 结合Vue的异步组件和Webpack的代码分析.

```javascript
const Home = resolve=>{
    require.ensure(['../components/Home.vue'],
                  ()=>
                   {resolve(require('../components/Home.vue'))})
};//resolve和Promise相关
```



方式二: AMD写法

```javascript
const About = resolve => require(['../components/About.vue'],resolve)//resolve和Promise相关
```



方式三: 在ES6中, 我们可以有更加简单的写法来组织Vue异步组件和Webpack的代码分割.

```javascript
const Home = ()=>import('../components/Home.vue')
```



 ### 5.路由嵌套

嵌套路由是一个很常见的功能
		比如在home页面中, 我们希望通过/home/news和/home/message访问一些内容.
		一个路径映射一个组件, 访问这两个路径也会分别渲染两个组件.
路径和组件的关系如下:

![1606399138919](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606399138919.png)

实现嵌套路由有两个步骤:
		创建对应的子组件, 并且在路由映射中配置对应的子路由.
		在组件内部使用<router-view>标签.



```
//在定义src/components文件夹下定义message组件和news两个组件
......
```



```javascript
// router/index.js文件
...
import Message = ()=>import('../components/message') 
import News = ()=> import('../components/news')
...
//2.定义路由
const routes = [
	{
		path: '/home',
		component: Home,
        children:[
            {
            	path: 'message',
                component: Message
        	},
             {
            	path: 'news',
                component: News
        	}
        ]        
	}
]
...
```

```javascript
//在定义src/components文件夹下定义home组件
......
<router-link to="/home/message">消息</router-link>
<router-link to="/home/news">新闻</router-link>
<router-view></router-view>
......
```

![1606457826592](C:\Users\Z\AppData\Roaming\Typora\typora-user-images\1606457826592.png)



#### 嵌套默认路径

嵌套路由也可以配置默认的路径，配置方式如下：

```javascript
// router/index.js文件
//2.定义路由
const routes = [
	{
		path: '/home',
		component: Home,
        children:[
            {
            	path: 'message',
                component: Message
        	},
             {
            	path: 'news',
                component: News
        	},
        	{
        		path: '',
        		redirect: 'message'
        	}
        ]        
	}
]
...
```



### 6.传递参数

**准备工作：**

第一步：创建新的组件Profile.vue

```javascript
//在定义src/components文件夹下定义Profile组件
...
```

第二步：配置路由映射

```javascript
// router/index.js文件
import Profile = ()=>import('../components/profile') 
//2.定义路由
const routes = [
	{
		path: '/profile',
		component: Profile
    }
]
...
```

第三步：添加跳转的<router-link>

```javascript
//App.vue文件
<template>
	......
	<router-link to="/profile">档案</router-link>
	......
</template>
...
```

#### 传递参数的方式

传递参数主要有两种类型: params和query
**params的类型:**
		**配置路由格式: /router/:id**
		传递的方式: 在path后面跟上对应的值
		传递后形成的路径: /router/123, /router/abc

**query的类型:**
		配置路由格式: /router, 也就是普通配置
		传递的方式: 对象中使用query的key作为传递方式
		传递后形成的路径: /router?id=123, /router?id=abc



使用<router-link>传递参数：

```javascript
//App.vue文件
<template>
	......
	<router-link 
		:to="{
			path: "/profile/"+123,
            query:{name:'why',age:18}
			}">档案</router-link>
	......
</template>
...
```

使用JavaScript代码传递参数：

```javascript
//App.vue文件
...
export default{
	...
	methods: {
		toProfile(){
			this.$router.push({
				path: '/profile/'+123,
				query: {name: 'why', age:18}
			})
		}
	}
}
...
```

#### 获取参数

获取参数通过$route对象获取

​		在使用了vue-router的应用中，路由对象会被注入每个组件中，赋值为this.$route，并且当路由切换时，路由对象会被更新。

​		通过$route获取传递的信息如下：

```javascript
//在定义src/components文件夹下定义Profile组件
...
<p>params:{{$route.params}}</p>
<p>query:{{$route.query}}</p>
...
```

#### $route和$router的区别

$router为VueRouter实例，想要导航到不同URL，则使用$router.push方法<br>

$route为当前router跳转对象里面可以获取name,path,query,params等<br>

```javascript
//App.vue文件
//可以console.log两者，看它们的区别
...
export default{
	name:'profile',
    mounted(){
        console.log(this.$router);
        console.log(this.$route);
    }
	...
}
...
```



### 7.导航守卫

**为什么使用导航守卫**

我们来考虑一个需求: 在一个SPA应用中, 如何改变网页的标题呢?
		网页标题是通过<title>来显示的, 但是SPA只有一个固定的HTML, 切换不同的页面时, 标题并不会改变.
		但是我们可以通过JavaScript来修改<title>的内容.window.document.title = '新的标题'.
		那么在Vue项目中, 在哪里修改? 什么时候修改比较合适呢?



普通的修改方式:
		我们比较容易想到的修改标题的位置是每一个路由对应的组件.vue文件中.
		通过mounted声明周期函数, 执行对应的代码进行修改即可.
		但是当页面比较多时, 这种方式不容易维护(因为需要在多个页面执行类似的代码).



有没有更好的办法呢? 使用导航守卫即可.
什么是导航守卫?
		**vue-router提供的导航守卫主要用来监听监听路由的进入和离开的.**
		**vue-router提供了beforeEach和afterEach的钩子函数, 它们会在路由即将改变前和改变后触发.**



#### 导航守卫使用

我们可以利用beforeEach来完成标题的修改.
		首先, 我们可以在钩子当中定义一些标题, 可以利用meta来定义
		其次, 利用导航守卫,修改我们的标题.

```javascript
// router/index.js文件
...
//2.定义路由
const routes = [
	{
		path: '/home',
		component: Home,
        children:[...],
        meta:{
        	title:'首页'
        }
	}，
	{
		path: '/about',
		component: About,
        children:[...],
        meta:{
        	title:'关于'
        }
	}，
	{
		path: '/profile/:id',
		component: Profile,
        children:[...],
        meta:{
        	title:'档案'
        }
	}
]
//3.创建router实例
const router  = new VueRouter({
	routes,
    mode: 'history',
    linkActiveClass: 'active'
})
router.beforeEach((to,from,next)=>{
    window.document.title = to.meta.title;
    next()
})
...
```

导航钩子的三个参数解析:
		to: 即将要进入的目标的路由对象.
		from: 当前导航即将要离开的路由对象.
		next: 调用该方法后, 才能进入下一个钩子.

#### 导航守卫补充

补充一:如果是后置钩子, 也就是afterEach, 不需要主动调用next()函数.
补充二: 上面我们使用的导航守卫, 被称之为全局守卫.
		路由独享的守卫.
		组件内的守卫.

更多内容, 可以查看官网进行学习:
https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E8%B7%AF%E7%94%B1%E7%8B%AC%E4%BA%AB%E7%9A%84%E5%AE%88%E5%8D%AB

### 8.keep-alive遇到vue-router

keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。
		它们有两个非常重要的属性:
		include - 字符串或正则表达，只有匹配的组件会被缓存
		exclude - 字符串或正则表达式，任何匹配的组件都不会被缓存

router-view 也是一个组件，如果直接被包在 keep-alive 里面，所有路径匹配到的视图组件都会被缓存：

```html
<keep-alive>
	<router-view>
    	<!--所有路径匹配到的视图组件都会被缓存！-->
    </router-view>
</keep-alive>
```

通过create声明周期函数来验证





