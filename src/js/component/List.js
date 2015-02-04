/**
 * Created by 路佳 on 2015/1/30.
 */
'use strict';
(function (ns) {
  ns.List = Backbone.View.extend({
    fragment: '',
    events: {
      'click .delete-button': 'deleteButton_clickHandler'
    },
    initialize: function () {
      this.template = Handlebars.compile(this.$('script').remove().html());
      this.collection.on('add', this.collection_addHandler, this);
      this.collection.on('sync', this.collection_syncHandler, this);
      this.collection.on('remove', this.collection_removeHandler, this);
      this.collection.fetch();
    },
    collection_addHandler: function (model) {
      this.fragment += this.template(model.toJSON());
    },
    collection_removeHandler: function (model) {
      this.$(this.collection.prefix + (model.id || model.cid)).remove();
    },
    collection_syncHandler: function () {
      if (this.fragment) {
        this.$el.append(this.fragment);
        this.fragment = '';
      }
    },
    deleteButton_clickHandler: function (event) {
      if (confirm('您确定要删除这份作品么？')) {
        var book = $(event.currentTarget).closest('li').attr('id');
        this.collection.get(book).destroy();
      }
    }
  })
}(Nervenet.createNameSpace('mgz.component')));