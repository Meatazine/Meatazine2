/**
 * Created by 路佳 on 2014/12/14.
 */
'use strict';
(function (ns) {
  ns.Manager = {
    $context: null,
    map: {
      '#mgz-login': mgz.component.Login,
      '#book-list': mgz.view.BookList
    },
    check: function (el, mediator) {
      var components = [];
      el.data('components', components);

      // 自动初始化组件
      for (var selector in this.map) {
        var dom = el.find(selector);
        if (dom.length) {
          var init = {
            model: mediator,
            el: dom
          };
          var component = this.map[selector];
          components.push(this.$context.createInstance(component, init));
        }
      }
    },
    clear: function (el) {
      var components = el.data('components');
      if (!components || components.length === 0) {
        return;
      }

      // 移除组件
      for (var i = 0, len = components.length; i < len; i++) {
        components[i].remove();
      }
      components.length = 0;
    },
    preCheck: function (el) {
      var components = el.data('components');
      if (!components) {
        return true;
      }
      for (var i = 0, len = components.length; i < len; i++) {
        if ('preCheck' in components[i] && !components[i].preCheck()) {
          return false;
        }
      }
      return true;
    }
  }
}(Nervenet.createNameSpace('mgz.component')));