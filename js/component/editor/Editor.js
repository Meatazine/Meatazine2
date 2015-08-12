/**
 * Created by 路佳 on 2015/2/12.
 */
'use strict';
(function (ns) {
  ns.Editor = mgz.view.Loader.extend({
    list: null,
    page: null,
    initialize: function (options) {
      mgz.view.Loader.prototype.initialize.call(this, options);

      this.model.on('change', this.model_changeHandler, this);
      this.collection = this.model.get('pages');
      this.collection.on('select', this.collection_selectHandler, this);
      this.options = options;
    },
    render: function () {
      mgz.view.Loader.prototype.render.call(this);

      var currPage = this.collection.at(this.options.page);
      this.list = new ns.editor.PageList({
        el: this.$('.page-list'),
        collection: this.collection
      });
      this.main = new ns.editor.PageEditor({
        el: this.$('.page-editor'),
        model: currPage
      });
      this.$('h1').text(this.model.get('book-name'));

      this.collection.trigger('select', currPage, currPage.id || currPage.cid);
    },
    collection_selectHandler: function (model, id) {
      this.main.setModel(model);
    },
    model_changeHandler: function (model, value) {
      this.$('h1').text(model.get('book-name'));
    }
  });
}(Nervenet.createNameSpace('mgz.component')));