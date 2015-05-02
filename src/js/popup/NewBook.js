/**
 * Created by Meathill on 2015/5/2.
 */
'use strict';
(function (ns) {
  var defaults = {
    isRemote: true,
    content: 'page/popup/new-book.hbs',
    backdrop: false,
    keyboard: false
  };
  ns.NewBook = ns.Base.extend({
    initialize: function (options) {
      options = _.extend(defaults, options);
      ns.Base.prototype.initialize.call(this, options);
    }
  });
}(Nervenet.createNameSpace('mgz.popup')));