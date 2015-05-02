/**
 * Created by 路佳 on 2015/2/12.
 */
'use strict';
(function (ns) {
  ns.Editor = Backbone.Router.extend({
    $body: null,
    $books: null,
    routes: {
      'editor/(:book)': 'showBook',
      'editor/:book/page/:page': 'showPage'
    },
    showBook: function (bookid) {
      var model = new mgz.model.Book({id: bookid});
      this.$body.load('page/editor.html', model, {
        className: 'editor',
        loader: mgz.page.Editor,
        hasData: true
      });
      if (bookid) {
        model.fetch();
      } else {
        mgz.popup.Manager.popup({
          model: model,
          popup: mgz.popup.NewBook,
          confirm: '保存',
          title: '设置杂志属性'
        });
      }
    },
    showPage: function (book, page) {
      var model = book ? this.$books.get(book) : new mgz.model.Book();
      this.$body.load('page/editor.html', model, {
        className: 'editor',
        loader: mgz.page.Editor,
        hasData: true
      });
    }
  });
}(Nervenet.createNameSpace('mgz.router')));