/**
 * Created by 路佳 on 2014/12/27.
 */
'use strict';
(function (ns) {
  ns.MyWorks = Backbone.Router.extend({
    $body: null,
    $books: null,
    routes: {
      'my(/?)': 'showMyList',
      'book/:book/page/:page': 'showMyBook'
    },
    showMyList: function () {
      this.books = this.books ||
      this.$body.hideLogin();
      this.$body.load('page/works.html', this.$book, {
        className: 'works',
        loader: mgz.page.BookList
      });
    },
    showMyBook: function (book, page) {

    }
  });
}(Nervenet.createNameSpace('mgz.router')));