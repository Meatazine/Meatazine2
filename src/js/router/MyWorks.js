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
      this.$body.hideLogin();
      this.$body.load('page/works.html', this.$books, {
        className: 'works',
        loader: mgz.page.BookList
      });
    },
    showMyBook: function (book, page) {
      var model = book ? this.$books.get(book) : new mgz.model.Book();
      this.$body.load('page/editor.html', model, {
        className: 'editor',
        loader: mgz.component.Editor
      })
    }
  });
}(Nervenet.createNameSpace('mgz.router')));