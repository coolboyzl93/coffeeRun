// 表单验证
(function (window) {
  'use strict'
  var App = window.App || {}

  var Validation = {
    isCompanyEmail: function (email) {
      return /.+@gmail\.com$/.test(email)
    }
  }

  App.Validation = Validation
  window.App = App
})(window)
