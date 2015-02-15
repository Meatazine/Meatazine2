/**
 * Created by 路佳 on 2015/1/22.
 */
'use strict';
(function (ns) {
  ns.Profile = Backbone.View.extend({
    initialize: function () {
      this.template = Handlebars.compile(this.$('script').remove().html());
      this.model.on('change:nickname', this.model_changeHandler, this);
    },
    render: function () {
      this.$el.prepend(this.template(this.model.toJSON()));
    },
    model_changeHandler: function () {
      this.render();
    }
  });
}(Nervenet.createNameSpace('mgz.view')));