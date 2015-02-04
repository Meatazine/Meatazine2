/**
 * Created by 路佳 on 2015/1/26.
 */
'use strict';
(function (ns) {
  ns.BookList = mgz.view.Loader.extend({
    collection: '{{$books}}',
    initialize: function () {

    }
  });
}(Nervenet.createNameSpace('mgz.page')));