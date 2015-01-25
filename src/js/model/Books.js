/**
 * Created by 路佳 on 2015/1/25.
 */
'use strict';
(function (ns) {
  ns.Books = Backbone.Collection.extend({
    url: mgz.config.API + 'books/'
  });
}(Nervenet.createNameSpace('mgz.model')));