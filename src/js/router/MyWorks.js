/**
 * Created by 路佳 on 2014/12/27.
 */
'use strict';
(function (ns) {
  ns.MyWorks = Backbone.Router.extend({
    $body: null,
    $me: null,
    routes: {
      'my(/?)': 'showMyList',
      'my/:book/:page': 'showMyBook'
    },
    showMyList: function () {
      this.$body.hideLogin();
      this.$body.load('page/works.hbs', this.$me);
    },
    showMyBook: function (book, page) {

    }
  });
}(Nervenet.createNameSpace('mgz.router')));