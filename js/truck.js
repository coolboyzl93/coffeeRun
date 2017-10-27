// 用于提供 订单的逻辑 创建，交付，打印订单
(function (window) {
  'use strick'
  var App = window.App || {}

  // 将 new App.DataStore() 作为实参传入db,它会继承DataStore 中的方法。因为它就是DataStore实例的引用
  function Truck(truckId, db) {
    this.truckId = truckId
    this.db = db
  }
  // 创建订单，参数 order 是一个订单的json对象，它必须含有一个emailAddress属性
  Truck.prototype.createOrder = function (order) {
    console.log('Adding order for ' + order.emailAddress)
    return this.db.add(order.emailAddress, order)
  }

  // customerId 其实是emailAddress的属性值，因为在createOrder的方法中，key就是这么定义的。
  Truck.prototype.deliverOrder = function (customerId) {
    console.log('Deliverring order for ' + customerId)
    return this.db.remove(customerId)
  }

  // 打印订单信息
  Truck.prototype.printOrders = function (printFn) {
    return this.db.getAll()
      .then(function (orders) {
        var customerIdArr = Object.keys(orders)
        console.log('Truck #' + this.truckId + 'has pending orders:')

        // 在回调函数定义的时候就直接绑定this
        customerIdArr.map(function (id) {
          console.log(orders[id])

          if (printFn) {
            printFn(orders[id])
          }
        })
      }.bind(this))

    // ES6箭头函数在回调中会自动绑定this
    // customerIdArr.map((id) => {
    //   console.log(this.db.get(id))
    // })
  }

  App.Truck = Truck
  window.App = App
})(window)