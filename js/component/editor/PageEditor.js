/**
 * Created by 路佳 on 2015/5/8.
 */
'use strict';
(function (ns) {
  ns.PageEditor = Backbone.View.extend({
    render: function () {
      // 有内容
      if (this.model.get('content')) {
        this.$el.html(this.model.get('content'));
        mgz.component.Manager.check(this.$el);
        return;
      }

      // 没内容，加载模板
      var self = this;
      $.get(this.model.get('template'), function (response) {
        self.model.set('content', response);
        self.$el.html(response);
      }, 'html');
    },
    setModel: function (model) {
      this.model = model;
      this.render();
    }
  });
}(Nervenet.createNameSpace('mgz.component.editor')));