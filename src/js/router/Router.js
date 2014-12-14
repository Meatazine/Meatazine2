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
      'user/:page': 'showUserPage'
    },
    showUserPage: function (page) {
      if (page === 'logout') {
        return this.$me.destroy({
          success: function (model) {
            model.clear();
            location.hash = '#/user/login';
          }
        })
      }
      this.$body.load('page/' + page + '.hbs', this.$me.login, {
        isFull: true,
        className: 'login'
      });
    }
  });
}(Nervenet.createNameSpace('mgz.router')));