/**
 * Created by 路佳 on 2015/5/8.
 */
'use strict';
(function (ns) {
  var defaults = {
    isRemote: true,
    content: 'page/popup/new-book.hbs',
    backdrop: false,
    keyboard: false
  };
  ns.NewPage = ns.Base.extend({
    events: {
      'submit': 'submitHandler'
    },
    initialize: function (options) {
      options = _.extend({}, defaults, options);
      ns.Base.prototype.initialize.call(this, options);
    },
    submitHandler: function (event) {
      var attr = _.object($(event.target).serializeArray());
      this.collection.create(attr);
      this.$el.modal('hide');
    }
  });
}(Nervenet.createNameSpace('mgz.popup')));