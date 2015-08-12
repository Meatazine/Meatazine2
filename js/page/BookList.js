/**
 * Created by 路佳 on 2015/1/26.
 */
'use strict';
(function (ns) {
  ns.BookList = mgz.view.Loader.extend({
    $context: null,
    collection: '{{$books}}',
    events: {
      'click .new-book-button': 'newBookButton_clickHandler'
    },
    render: function () {
      this.list = new mgz.component.List({
        el: this.$('#book-list'),
        collection: this.collection
      });
    },
    newBookButton_clickHandler: function () {
      mgz.popup.Manager.popupNewBook();
    }
  });
}(Nervenet.createNameSpace('mgz.page')));