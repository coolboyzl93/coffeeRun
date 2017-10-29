// 各个模块的中央处理器
(function (window) {
  'use strict'
  var FORM_SELECTOR = '[data-coffee-order="form"]'
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]'
  var SERVER_URL = 'https://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders'
  var App = window.App
  var Truck = App.Truck
  var DataStore = App.DataStore
  var RemoteDataStore = App.RemoteDataStore
  var FormHandler = App.FormHandler
  var Validation = App.Validation
  var CheckList = App.CheckList
  var RemoteDS = new RemoteDataStore(SERVER_URL)
  var webshim = window.webshim
  // 远程服务器端 的dataStore 用jQuery的 Deferred进行异步操作
  var myTruck = new Truck('ncc-1707', RemoteDS)

  // 本地dataStore 用promise进行异步操作
  // var myTruck = new Truck('ncc-1707', new DataStore())
  window.myTruck = myTruck
  var checkList = new CheckList(CHECKLIST_SELECTOR)
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck))
  var formHandler = new FormHandler(FORM_SELECTOR)

  formHandler.addSubmitHandler(function (data) {
    return myTruck.createOrder(data).then(function () {
      checkList.addRow(data)
    }, function () {
      window.alert('服务器没连上，再试一次')
    })
  })

  formHandler.addInputHandler(Validation.isCompanyEmail)

  myTruck.printOrders(checkList.addRow.bind(checkList))
  webshim.polyfill('forms forms-ext')
  webshim.setOptions('forms', {addValidators: true, lazyCustomMessages: true})
})(window)
