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
    events: {
      'submit': 'submitHandler'
    },
    initialize: function (options) {
      options = _.extend({}, defaults, options);
      ns.Base.prototype.initialize.call(this, options);
    },
    submitHandler: function (event) {
      var attr = _.toObject($(event.target).serializeArray());
      this.model.set(attr);
      this.$el.modal('hide');
      event.preventDefault();
    }
  });
}(Nervenet.createNameSpace('mgz.popup')));