// 从数据到DOM 将表单上提交的数据返回给页面，形成新的DOM元素
(function (window) {
  'use strict'
  var App = window.App || {}
  var $ = window.jQuery

  function CheckList (selector) {
    if (!selector) {
      throw Error('No Selector provided')
    }

    // 所有CheckList的实例对象都有一个$element属性，它是创建实例的时候传入的jQuery对象
    this.$element = $(selector)
    if (this.$element.length === 0) {
      throw Error('Could not find element with Selector: ' + selector)
    }
  }

  CheckList.prototype.addClickHandler = function (fn) {
    // jQuery 事件委托模式 根据事件冒泡，任何$element的子元素都会触发点击事件，但现在只有在input元素上点击的事件才会执行回调
    this.$element.on('click', 'input', function (event) {
      var email = event.target.value
      // 同步函数
      // this.removeRow(email)

      // 异步函数
      fn(email).then(function () {
        this.removeRow(email)
      }.bind(this))
    }.bind(this))
  }

  // 使用jQuery 创建DOM元素
  function Row (coffeeOrder) {
    var inlineCss = ''
    if (coffeeOrder.flavor === 'caramel') {
      inlineCss = 'background: #FC4A3C; color: white'
    } else if (coffeeOrder.flavor === 'almond') {
      inlineCss = 'background: #5D33D6; color: white'
    } else if (coffeeOrder.flavor === 'mocha') {
      inlineCss = 'background: #000000; color: white'
    }
    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox',
      'style': inlineCss
    })

    var $label = $('<label></label>')

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress
    })

    var description = coffeeOrder.size + ' '
    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor + ' '
    }
    console.log(coffeeOrder)
    description += coffeeOrder.coffee + ', '
    description += ' (' + coffeeOrder.emailAddress + ')'
    description += ' [' + coffeeOrder.strength + 'x]'
    if (coffeeOrder.high_reward) {
      description += ' ' + coffeeOrder.high_reward
    }

    // 完成DOM树的拼接
    // 1. 将$checkbox追加到$label中
    // 2. 将description追加到$label中
    // 3. 将$label追加到$div中
    $label.append($checkbox)
    $label.append(description)
    $div.append($label)

    // 将子树赋值给this.$element，其实这是一个定义
    this.$element = $div
  }

  // 创建清单行
  CheckList.prototype.addRow = function (coffeeOrder) {
    // 删除重复的邮箱地址行
    this.removeRow(coffeeOrder.emailAddress)
    // 使用咖啡订单信息创建一个信的Row实例
    var rowElement = new Row(coffeeOrder)

    // 把新的Row实例构建的子树追加到CheckList实例中的jQuery对象中
    this.$element.append(rowElement.$element)
  }

  // 完成订单时删除数据库信息
  CheckList.prototype.removeRow = function (email) {
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-coffee-order="checkbox"')
      .remove()
  }

  App.CheckList = CheckList
  window.App = App
})(window)
