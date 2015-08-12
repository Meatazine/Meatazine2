/**
 * Created by 路佳 on 2015/6/4.
 */
'use strict';
(function (ns) {
  ns.Page = Backbone.Model.extend({
    defaults: {
      template: './template/page/face.html',
      content: '',
      thumbnail: ''
    }
  });
}(Nervenet.createNameSpace('mgz.model')));