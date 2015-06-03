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
    addButton_clickHandler: function () {
      mgz.popup.Manager.popup({
        collection: this.collection,
        popup: mgz.popup.NewPage
      });
    },
    item_clickHandler: function (event) {
      var item = $(event.currentTarget);
      item.addClass('active')
        .siblings().removeClass('active');
      this.collection.at(item.index());
    }
  });
}(Nervenet.createNameSpace('mgz.component.editor')));