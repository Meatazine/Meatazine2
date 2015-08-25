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
    $context: null,
    events: _.extend({
      'submit': 'submitHandler',
      'click .next-button': 'nextButton_clickHandler'
    }, ns.Base.prototype.events),
    initialize: function (options) {
      this.model = new mgz.model.Book();
      options = _.extend({}, defaults, options);
      ns.Base.prototype.initialize.call(this, options);
    },
    submitHandler: function (event) {
      var attr = _.toObject($(event.target).serializeArray());
      this.model.set(attr);
      this.$el.modal('hide');
      this.$context.mapValue('book', model);
      location.href = '#/editor/';
      event.preventDefault();
    }
  });
}(Nervenet.createNameSpace('mgz.popup')));