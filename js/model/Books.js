/**
 * Created by 路佳 on 2015/1/25.
 */
'use strict';
(function (ns) {
  ns.Books = Backbone.Collection.extend({
    prefix: 'book-',
    model: ns.Book,
    url: mgz.config.API + 'book/',
    parse: function (response) {
      return response.books;
    }
  });
}(Nervenet.createNameSpace('mgz.model')));