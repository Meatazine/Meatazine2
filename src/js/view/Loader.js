/**
 * Created by 路佳 on 2014/12/14.
 */
'use strict';
(function (ns) {
  ns.Loader = Backbone.View.extend({
    tagName: 'div',
    initialize: function (options) {
      this.isHTML = /\.html$/i.test(options.template);
      if (this.model instanceof Backbone.Model && this.model.isNew()) {
        this.model.once('sync', this.model_syncHandler, this);
        this.model.fetch();
      } else {
        this.isModelReady = true;
      }

      $.get(options.template, _.bind(this.template_getHandler, this), 'html');
    },
    render: function () {
      this.$el.html(this.template(this.model instanceof Backbone.Model ? this.model.toJSON() : this.model));
      var $el = this.$el
        , model = this.model;
      setTimeout(function () {
        mgz.component.Manager.check($el, model);
      }, 0);
    },
    model_syncHandler: function () {
      if (this.template) {
        return this.render();
      }
      this.isModelReady = true;
    },
    template_getHandler: function (data) {
      if (this.isHTML) {
        this.$el.html(data);
        this.render();
        return;
      }
      this.template = Handlebars.compile(data);
      if (this.isModelReady) {
        this.render();
      }
    }
  });
}(Nervenet.createNameSpace('mgz.view')));