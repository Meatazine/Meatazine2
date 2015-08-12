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
    initialize: function (options) {
      this.template = Handlebars.compile(this.$('script').remove().html());

      this.collection.on('add', this.collection_addHandler, this);
      this.collection.on('sync', this.collection_syncHandler, this);
      this.collection.on('remove', this.collection_removeHandler, this);
      this.model = this.model || new Backbone.Model();
      this.model.on('change', this.model_changeHandler, this);

      var init = this.$el.data();

      // pager
      if ('pagination' in init) {
        this.pagination = new ns.Pager({
          el: init.pagination,
          model: this.model,
          pagesize: init.pagesize || 10
        });
      }

      this.collection.fetch();
    },
    remove: function (options) {
      if (this.pagination) {
        this.pagination.remove();
      }
      this.model.off();
      this.collection.off(null, null, this);
      Backbone.View.prototype.remove.call(this, options);
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
    },
    model_changeHandler: function (model) {
      this.filter = _.extend(this.filter, model.changed);
      this.collection.fetch({data: this.filter});
    }
  })
}(Nervenet.createNameSpace('mgz.component')));