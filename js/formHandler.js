// 表单处理明细
(function (window) {
  'use strict'
  var App = window.App || {}
  var $ = window.jQuery

  // 表单处理构造函数， 接受一个选择器，获得一整个表单的jQuery对象
  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided!')
    }
    // 设置 jQuery 封装集合， selector 是一个符合选择器语法的字符串，表示某个表单元素的选择器
    this.$formElement = $(selector)
    // 检查jQuery 封装集合的长度, 长度为0抛出错误
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector:' + selector)
    }
    // 这个构造函数的原型上添加一个 添加表单处理句柄的方法，它接受一个回调函数 这个回调函数相当于Ajax 将表单下单的信息传递过去。
    // 这个添加处理表单的方法，内部还会处理一些表单的UI。从用户开始填表单，到用户提交，这部分的逻辑都是这个函数提供的。
    FormHandler.prototype.addSubmitHandler = function (fn) {
      console.log('Setting submit handler for form')
      this.$formElement.on('submit', function (event) {
        event.preventDefault()
        console.log($(this).serializeArray())
        var data = {}
        $(this).serializeArray().map(function (item) {
          data[item.name] = item.value
          console.log(item.name + ' is ' + item.value)
        })
        // 提交和重置表单的函数表达式
        var commitReset = function () {
          console.log(data)
          fn(data).then(function () {
            // 重置表单
            this.reset()
            // 重置光标焦点
            this.elements[0].focus()
            // 重置数值
            $('[data-coffein-rating="number"]').text(30)
          }.bind(this))
        }.bind(this)

        // 出现高咖啡因成就！
        if (data.size === '超大杯' && parseInt(data.strength) > 70) {
          // 将咖啡因浓度数值传递给模态框
          $('[data-coffein-rating="high"]').text(data.strength)
          // 触发模态框
          $('#highCoffeinAlert').modal({
            keyboard: false
          })
          // 模态框2的表单提交事件
          $('#highSubmit').on('click', function (event) {
            console.log('selected HighCoffein')
            event.preventDefault()
            // jQuery 快速获取选中的单选框的value
            data['high_reward'] = $('input[name="reward"]:checked').val()
            commitReset()
          })
        } else {
          commitReset()
        }
      })
    }

    FormHandler.prototype.addInputHandler = function (fn) {
      console.log('setting input handler for form...')
      // jQuery 的 input事件，每输入一个字符都会触发这个事件
      this.$formElement.on('input', '[name="emailAddress"]', function (event) {
        var emailAddress = event.target.value
        // console.log(fn(emailAddress))
        var message = ''
        if (fn(emailAddress)) {
          // 事件对象有target，target上有一个setComstomValidity()方法可以在表单验证失败的时候出现提示
          $(event.target).setCustomValidity('')
        } else {
          message = emailAddress + '不是一个有效的Gmail邮箱!'
          $(event.target).setCustomValidity(message)
        }
      })
    }
  }

  // 滑块变化的时候，在页面上显示相应的数值，并改变不同的颜色表示咖啡的浓度
  $('#strengthLevel').on('change', function (event) {
    var rating = this.value
    var numberSpan = $('[data-coffein-rating="number"]')
    numberSpan.text(rating)
    var changeColor = function (colorString) {
      numberSpan.css('color', colorString)
    }
    if (rating < 30) {
      changeColor('green')
    } else if (rating > 70) {
      changeColor('red')
    } else {
      changeColor('#FCB63C')
    }
  })

  // 当用户提交一个最大杯，最高浓度的咖啡时，解锁成就
  // 1. 弹出一个bootstrap模态框
  // 1.1 模态框表单让他确认浓度和口味，
  // 1.2 模态框还会问她是否坚持自己的选择
  // 2.2 如果选择坚持，会生成一个额外的表单字段，允许自己定制的咖啡

  App.FormHandler = FormHandler
  window.App = App
})(window)