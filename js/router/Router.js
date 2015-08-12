/**
 * @overview 基础路由
 * Created by 路佳 on 2014/12/13.
 */
'use strict';
(function (ns) {
  ns.Router = Backbone.Router.extend({
    $body: null,
    $me: null,
    routes: {
      'login(/)': 'showLoginPage',
      'logout(/)': 'logout'
    },
    logout: function () {
      this.$me.destroy({
        success: function (model) {
          model.clear();
          location.hash = '#/login/';
        }
      });
    },
    showLoginPage: function () {
      this.$body.load('page/login.hbs', this.$me.login, {
        isFull: true,
        className: 'login'
      });
    }
  });
}(Nervenet.createNameSpace('mgz.router')));