// 用于将咖啡订单存储到 模拟的数据库datastore中
(function (window) {
  'use strict'
  var App = window.App || {}
  var Promise = window.Promise

  function DataStore () {
    // console.log('runnning the DataStore function')
    this.data = {}
  }

  function promiseResolvedWith (value) {
    var promise = new Promise(function (resolve, reject) {
      resolve(value)
    })
    return promise
  }

  DataStore.prototype.add = function (key, value) {
    this.data[key] = value

    // var promise = new Promise(function (resolve, reject) {
    //   this.data[key] = value
    //   resolve(null)
    // }.bind(this))
    return promiseResolvedWith(null)
  }

  DataStore.prototype.get = function (key) {
    return promiseResolvedWith(this.data[key])
  }

  DataStore.prototype.getAll = function () {
    return promiseResolvedWith(this.data)
  }

  DataStore.prototype.remove = function (key) {
    delete this.data[key]
    return promiseResolvedWith(null)
  }

  App.DataStore = DataStore
  window.App = App
})(window)
