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

## 函数库
1. 引用webshim进行表单的验证,它的优点是能支持Safari浏览器的表单校验，它依赖jQuery。首先将webshim的CDN引入HTML中，然后调用
```
webshim.polyfill('forms forms-ext')
webshim.setOptions('form',{addValidators: true, lazyCustomMessages: true})
```
以上设置完成后，在经过jQuery的$()包裹后的DOM对象调用
```
$(DOM).setCustomValidity('提示的内容')
```
这样就可以在表单验证失败的时候自动出现一个在页面上的提示。