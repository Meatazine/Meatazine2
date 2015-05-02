/**
 * Created by 路佳 on 2015/2/12.
 */
'use strict';
(function (ns) {
  var options = {
    types: ['游记', '产品介绍']
  };
  ns.Book = Backbone.Model.extend({
    options: options,
    toJSON: function (options) {
      var json = Backbone.Model.prototype.toJSON.call(this);
      if (options) {
        return json;
      }
      _.extend(json, this.options);
      return json;
    }
  });
}(Nervenet.createNameSpace('mgz.model')));