/**
 * Created by 路佳 on 2015/5/8.
 */
'use strict';
(function (ns) {
  ns.PageList = mgz.component.BaseList.extend({
    events: {
      'click li': 'item_clickHandler',
      'click .add-button': 'addButton_clickHandler'
    },
    initialize: function (options) {
      mgz.component.BaseList.prototype.initialize.call(this, options);

      this.addButton = this.$('.add-button');
      this.collection_resetHandler();
      this.collection.on('select', this.collection_selectHandler, this);
    },
    addButton_clickHandler: function () {
      mgz.popup.Manager.popup({
        collection: this.collection,
        popup: mgz.popup.NewPage
      });
    },
    collection_selectHandler: function (model, id) {
      var item = this.$('#item-' + id);
      item.addClass('active')
        .siblings().removeClass('active');
    },
    collection_resetHandler: function (collection) {
      mgz.component.BaseList.prototype.collection_resetHandler.call(this, collection);
      this.$el.append(this.addButton);
    },
    item_clickHandler: function (event) {
      var item = $(event.currentTarget)
        , id = item.attr('id').substr(5)
        , model = this.collection.get(id);
      this.collection.trigger('select', model, id);
    }
  });
}(Nervenet.createNameSpace('mgz.component.editor')));