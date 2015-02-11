/**
 * Created by 路佳 on 2015/1/26.
 */
'use strict';
(function (ns) {
  ns.BookList = mgz.view.Loader.extend({
    collection: '{{$books}}',
    render: function () {
      this.list = new mgz.component.List({
        el: this.$('#book-list'),
        collection: this.collection
      });
    }
  });
}(Nervenet.createNameSpace('mgz.page')));