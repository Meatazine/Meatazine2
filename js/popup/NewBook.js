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
      'click .next-button': 'nextButton_clickHandler',
      'change': 'input_changeHandler'
    }, ns.Base.prototype.events),
    initialize: function (options) {
      this.model = new mgz.model.Book();
      options = _.extend({}, defaults, options);
      ns.Base.prototype.initialize.call(this, options);

      var btn = mgz.component.Manager.create('button', {
        label: '下一步',
        style: 'info',
        icon: 'play',
        classes: 'next-button'
      });
      this.$('.modal-footer').prepend(btn);
      this.$('.btn-primary').addClass('hide');
    },
    input_changeHandler: function () {
      var is_empty = this.$(':invalid').length > 0
        , no_template = this.$('[name=template]:checked').length === 0;
      this.$('.btn-primary').toggleClass('hide', is_empty || no_template);
    },
    nextButton_clickHandler: function () {
      var next = this.$('.nav .active').next();
      if (next.length === 0) {
        next = this.$('.nav li').eq(0);
      }
      next.children('a').click();
    },
    submitHandler: function (event) {
      var attr = _.toObject($(event.target).serializeArray());
      this.model.set(attr);
      this.$el.modal('hide');
      this.$context.mapValue('book', this.model);
      location.href = '#/editor/';
      event.preventDefault();
    }
  });
}(Nervenet.createNameSpace('mgz.popup')));