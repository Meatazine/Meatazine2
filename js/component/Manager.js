/**
 * Created by 路佳 on 2014/12/14.
 */
'use strict';
(function (ns) {
  var defaults = {
    button: {
      type: 'button',
      label: 'Button',
      style: 'default'
    }
  };

  ns.Manager = {
    $context: null,
    map: {
      '#mgz-login': mgz.component.Login,
    },
    templates: {},
    check: function (el, mediator) {
      var components = [];
      el.data('components', components);

      // 自动初始化组件
      for (var selector in this.map) {
        if (!this.map.hasOwnProperty(selector)) {
          continue;
        }
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
    },
    create: function (type, options) {
      options = _.extend({}, defaults[type], options);
      if (!this.templates[type]) {
        var templates = this.templates
          , placeholder = document.createElement('div');
        $.get('template/component/' + type + '.hbs', function (response) {
          var template = templates[type] = Handlebars.compile(response);
          $(placeholder).replaceWith(template(options));
        });
        return placeholder;
      }
      return this.templates[type](options);
    }
  };

}(Nervenet.createNameSpace('mgz.component')));