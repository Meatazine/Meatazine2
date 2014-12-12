/**
 * @overview 保存用户自身的各种状态
 * Created by 路佳 on 2014/12/13.
 */
'use strict';
(function (ns) {
  ns.Me = Backbone.Model.extend({
    fetch: function (options) {
      options = options || {};
      options.success = this.onSuccess;
      options.error = this.onError;
      Backbone.Model.prototype.fetch.call(this, options);
    },
    onError: function () {
      location.hash = '#/user/login'
      Backbone.history.start({
        root: '/Meatazine2/'
      });
    },
    onSuccess: function () {
      var route = Backbone.history.start({
        root: '/Meatazine2/'
      });
      if (!route) {
        location.hash = '#/my';
      }
    }
  });
}(Nervenet.createNameSpace('mgz.model')));