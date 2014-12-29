/**
 * Created by 路佳 on 2014/12/14.
 */
'use strict';
(function (ns) {
  ns.Body = Backbone.View.extend({
    isStart: false,
    lastClass: '',
    initialize: function () {
      this.container = this.$('#content');
      this.loadCompleteHandler = _.bind(this.loadCompleteHandler, this);
    },
    clear: function () {
      if (!this.isStart) {
        this.$('#mgz-spinner').remove();
        this.el.className = '';
        this.isStart = true;
      }
      mgz.component.Manager.clear(this.$el);
    },
    load: function (url, model, options) {
      options = options || {
        isFull: false
      };
      this.clear();
      this.$el.toggleClass('full-page', options.isFull)
        .removeClass(this.lastClass);

      // html or hbs
      if (/\.hbs$/.test(url)) {
        var page = new mgz.view.Loader({
          template: url,
          model: model,
          className: 'className' in model ? model.className : ''
        });
        this.container.html(page.$el);
      } else {
        this.container.load(url, this.loadCompleteHandler);
      }

      this.trigger('load:start', url);
      ga('send', 'pageview', url);

      return this;
    },
    hideLogin: function () {
      this.$('#mgz-login').remove();
    },
    loadCompleteHandler: function (response, status) {
      if (status === 'error') {
        this.trigger('load:failed');
      } else {
        mgz.component.Manager.check(this.$el);
      }
      this.trigger('load:complete');
    }
  });
}(Nervenet.createNameSpace('mgz.view')));