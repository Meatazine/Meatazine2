/**
 * Created by 路佳 on 2015/2/12.
 */
'use strict';
(function (ns) {
  var options = {
    types: ['游记', '产品介绍']
  };
  ns.Book = Backbone.Model.extend({
    options: options,
    initialize: function (attr, options) {
      Backbone.Model.prototype.initialize.call(this, attr, options);

      if (this.isNew()) {
        this.createPages();
      }
    },
    parse: function (response, options) {
      this.createPages(response.book.pages);
      return _.omit(response.book, 'pages');
    },
    toJSON: function (options) {
      var json = Backbone.Model.prototype.toJSON.call(this);
      if (options) {
        return json;
      }
      _.extend(json, this.options);
      return json;
    },
    createPages: function (data) {
      var pages = new ns.Pages(data);
      this.set('pages', pages);
    }
  });
}(Nervenet.createNameSpace('mgz.model')));