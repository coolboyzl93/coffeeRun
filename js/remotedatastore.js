(function (window) {
  'use strict'
  var App = window.App || {}
  var $ = window.jQuery

  function RemoteDataStore (url) {
    if (!url) {
      throw new Error('No remote url supplied')
    }

    this.serverUrl = url
  }

  // 将数据发送到远端服务器上
  // 暂时没有用到key，因为要保持两种数据存储方式的一致性,也就是API要相同
  // jQuery 的Ajax方法都会返回一个Deferred对象，用于异步编程
  RemoteDataStore.prototype.add = function (key, val) {
    // $.post 的第三个参数是回掉函数，在服务器返回响应的时候触发
    return $.post(this.serverUrl, val, function (serverResponse) {
      console.log(serverResponse)
    })
  }

  RemoteDataStore.prototype.getAll = function (cb) {
    return $.get(this.serverUrl, function (serverResponse) {
      if (cb) {
        console.log(serverResponse)
        cb(serverResponse)
      }
    })
  }

  RemoteDataStore.prototype.get = function (key, cb) {
    return $.get(this.serverUrl + '/' + key, function (serverResponse) {
      if (cb) {
        console.log(serverResponse)
        cb(serverResponse)
      }
    })
  }

  RemoteDataStore.prototype.remove = function (key) {
    // $.ajax 的使用方法
    return $.ajax(this.serverUrl + '/' + key, {
      type: 'DELETE'
    })
  }

  App.RemoteDataStore = RemoteDataStore
  window.App = App
})(window)
