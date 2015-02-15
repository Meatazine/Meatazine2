/**
 * Created by 路佳 on 2015/2/12.
 */
'use strict';
(function (ns) {
  ns.Editor = Backbone.Router.extend({
    $body: null,
    $books: null,
    routes: {
      'book/new': 'createBook',
      'book/:book/page/:page': 'showMyBook'
    },
    createBook: function () {
      var model = new mgz.model.Book();
      this.$body.load('page/editor.html', model, {
        className: 'editor',
        loader: mgz.page.Editor,
        hasData: true
      })
    },
    showMyBook: function (book, page) {
      var model = book ? this.$books.get(book) : new mgz.model.Book();
      this.$body.load('page/editor.html', model, {
        className: 'editor',
        loader: mgz.page.Editor,
        hasData: true
      })
    }
  });
}(Nervenet.createNameSpace('mgz.router')));