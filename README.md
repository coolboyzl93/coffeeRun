# CoffeeRun 基础表单提交，动态DOM交互

## 功能
- 提交咖啡订单
---

## 技术选型
- 编程语言: ES5
- 结构: 基础HTML5
- 样式: bootstrap
---

## 编码规范
- ES5 应用standard编码规范
---

## 环境组成
- 编辑器: vsCode
- 编辑器插件: JavaScript Standard Style 
- 全局npm包: ```npm install -g browser-sync standard```
- scripts终端命令: ```npm run view``` 
---
## 项目结构
**本项目的模块构成**

实际上一共是5个模块，main.js是中央总线，观察main.js中的程序就可以很清晰地看到各个模块的相互运作方式,以及依赖关系。
![](img/project_structure.png)
- formHandler.js负责处理表单的数据，他是直接被main.js调用的
- validation.js验证表单，它仅仅为formHandler.js服务
- truck.js是面向formHandler.js和checkList.js的，formHandler向它传入数据，而checkList向它索取数据，或者命令它删除数据。
- dataStore.js 是基本的数据库，它仅仅对数据的增加，删除，获取提供方法，其他的根本不管，它只被truck.js灵活调用
- checkList.js 是动态的DOM表单
- 最后main.js作为中央总线，让各个模块各司其职。

**模块化的好处**

正如图中所看到的那样，单纯的truck.js和dataStore.js是单线依赖，所以其实它们两个是可以合在一起写的，但是如果想要扩展程序的功能，模块化编程是非常方便的，因为我可以复用一些提供基础功能的模块，然后将他们的功能包装起来，变得更具体，更针对某些服务。在出现错误的时候，代码的结构清晰，很快就能定位错误。代码的易用性，复用性，扩展性都很好。

值得一提的是，虽然模块的依赖关系是如图所示，但是因为ES5没有模块化的概念，所以只能用LIFE进行模拟，但所有的模块还都得引入main.js中。在ES6+中，使用import 引入模块的方式就根本没必要将不存在直接依赖关系的文件引入，比如main.js中就只需要引入formHandler.js 和 checkList.js就好了。而且最后导入HTML中，只需要导入main.js而不需要其他的js文件。


学到的内容
## html 
1. 表单中的input末尾元素加入```required```，表单不能为空，加入```autofocus```，自动获取光标焦点。

## css 
1. 表单元素的css属性 ```form :focus:required:invalid ``` 简单使用CSS进行表单的验证
2. bootstarp的表单基础:bootstrap表单的结构和样式的规范，就是每一块表单元素都要用```.form-group```包裹。
3. bootstrap规范整体页面的样式使用```container``` ```.panel panel-defaut``` ```.panel-body``` 
4. bootstrap单选框用每一个选项都使用```.radio```的div包裹起来，规范样式
5. 使用label显示表单的文本 ```<label for="tag"> ``` ```<...id="tag">```
6. bootstrap 模态框

## ES5
1. 模块化，使用LIFE隔离命名空间，这里的命名对象是App，各模块的函数是App上的方法
2. 发生错误的时候，传出确定的错误，来定位错误
3. 使用```$()```来包装jQuery对象，这样就可以使用jQuery的各种方法，作为API可以将jQuery对象隔离出来
4. 使用jQuery对象的事件委托模式，```jquery.on('click','input',function(event){...})```,这样就可以只监听该jQuery的任意子对象。此时jQuery的事件对象的取值可以是```event.target.value```
5. jQuery Ajax方法本身就会返回Deferred对象，可以调用then方法，then方法本身有两个参数，一个是请求成功的异步回调函数，另一个是失败的回掉函数，同Promise如出一辙
6. 创建jQuery对象的时候是很方便的，使用```$.(<div></div>,{属性名: 属性值})``` 就可以了，属性值一定是字符串，属性名如果和关键字冲突的话，是要使用字符串的。
7. jQuery DOM对象的拼接```$对象.append($子对象)```
8. jQuery 对象的链式操作，查找+操作一起来。
9. jQuery 对表单对象的```seriliazeArray()```方法，将表单各个控件的数组序列化，然后就可以调用各种数组的方法，操作他们。
10. 重置表单```.reset()```,获取焦点```.focus```
11. 直接在函数定义的时候使用```function () {}.bind(this)```就可以将函数的this绑定了，此时函数的this指向函数外的作用域
12. JS中正则的简单使用，
```
// **字符串上的方法**
'string'.test(/reg/i) // 会返回一个bool值。i表示正则对大小写不敏感
'string'.search(/reg/g) //检索子字符串的起始位置，若不存在返回-1。默认的正则在匹配到第一个模式会停下来，但是g会匹配全局的所有匹配模式
'string'.replace(/reg/,'new string') //将正则匹配到的内容替换成新的字符串。
// **reg上的方法**
/reg/.test('string') //正则是否匹配'string'
```
13. 关于同步回调函数的理解：

(1) 首先我们定义了一个函数A，函数A接受了一个函数B作为参数，那么函数B是如何调用的应该在函数A定义的时候就已经写好了，此时可以将函数B的调用看作为一个“调用一个尚未定义的函数”（可以是匿名函数），而且此时就指定了函数B的实参，JS在函数调用的时候，的确是可以传入和形参不一致的实参，但是由于已经在定义函数A的时候就调用了函数B，所以，在未来声明函数B的时候，一定要遵循同函数A内部调用函数B时一致的参数形式。这也是我们在使用第三方库的时候，很多回调函数的参数的名字随便写，比如event,也可以写成e,但参数的位置，个数肯定是要严格遵循API文档的，因为他们在设定之初就已经将回调函数的实参传进去了。
> 1. 定义函数A，接受一个函数参数B（或多个）以及在内部确定如何调用函数B的，此时已经确定函数B的实参

> 2. 调用函数A，在调用的时候定义函数匿名函数B，定义之后立即就执行了，因为前面在函数A的内部已经‘预调用’B了。此时执行函数A等于执行函数B。

(2) 为什么要使用同步回调？因为我可以确定在函数A中调用函数B的位置。我可能不太在乎函数B的具体内容。但我能确定它调用的时机，以及函数B传入的参数的形式(因为B的参数本质上来自于A)。那么一定要将函数B作为函数A的参数。这样就能在调用函数A的时候顺带自由地声明函数B。

14. 异步回调就很容易理解了，尤其是使用promise 或者是ES7的async await都是前一步OK了再执行后一步，每一次的异步操作都会有错误的捕捉，而且不会发生阻塞。

15. 对于构造函数的理解: 构造函数new出来的对象都是富人家的孩子，他们天生具有他们家族的属性，相比之下，字面量定义出的对象都是穷人家的孩子，它们所有的属性都得后天自己创造。所以，当很多对象归属于某一家族的时候，也就是他们有很多共性的时候，应该使用构造函数去创造对象，这样可以减少代码的数量。而如果想弄一些数量不多而且个个特立独行的对象，就不必使用构造函数了。


## 函数库
引用webshim进行表单的验证，它的优点是能支持Safari浏览器的表单校验，它依赖jQuery。首先将webshim的CDN引入HTML中，然后调用
```
webshim.polyfill('forms forms-ext')
webshim.setOptions('form',{addValidators: true, lazyCustomMessages: true})
```
以上设置完成后，在经过jQuery的$()包裹后的DOM对象调用
```
$(DOM).setCustomValidity('提示的内容')
```
这样就可以在表单验证失败的时候自动出现一个在页面上的提示。