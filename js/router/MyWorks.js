/**
 * Created by 路佳 on 2014/12/27.
 */
'use strict';
(function (ns) {
  ns.MyWorks = Backbone.Router.extend({
    $body: null,
    $books: null,
    routes: {
      'my/': 'showMyList'
    },
    showMyList: function () {
      this.$body.hideLogin();
      this.$body.load('page/works.html', this.$books, {
        className: 'works',
        loader: mgz.page.BookList
      });
    }
  });
}(Nervenet.createNameSpace('mgz.router')));