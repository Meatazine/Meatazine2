/**
 * Created by 路佳 on 2015/2/12.
 */
'use strict';
(function (ns) {
  ns.Editor = Backbone.Router.extend({
    $body: null,
    $books: null,
    $context: null,
    routes: {
      'editor/(:book)': 'showBook',
      'editor/:book/page/:page': 'showBook'
    },
    createEditor: function (model, page) {
      this.$body.load('page/editor.html', model, {
        className: 'editor',
        loader: mgz.component.Editor,
        hasData: true,
        page: page || 0
      });
    },
    showBook: function (bookid, page) {
      var model;
      if (bookid) {
        model = new mgz.model.Book({id: bookid});
        model.fetch();
        this.createEditor(model, page);
        this.$context.remove('book');
        this.$context.mapValue('book', model)
      } else {
        model = this.$context.getValue('book');
        if (!model) {
          model = new mgz.model.Book();
          this.$context.mapValue('book', model);
        }
        this.createEditor(model);
      }
    }
  });
}(Nervenet.createNameSpace('mgz.router')));