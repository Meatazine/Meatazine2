/**
 * @overview 窗体管理器
 * @author Meathill (lujia.zhai@dianjoy.com)
 * @since 1.3
 */
'use strict';
(function (ns) {
  'use strict';
  var popup
    , editor
    , popupDefault = {
      isRemote: true
    };

  var Klass = Backbone.View.extend({
    $context: null,
    events: {
      'click .popup': 'popupButton_clickHandler'
    },
    initialize: function () {
      this.template = Handlebars.compile(this.$('#popup').remove().html());
      this.editor = Handlebars.compile(this.$('#editor-popup').remove().html());
    },
    postConstruct: function () {
      if (popup) {
        this.$context.inject(popup);
      }
    },
    popup: function (options) {
      var popup = $(this.template(options))
        , klass = options.popup || ns.Base;
      this.$el.append(popup);
      popup = this.$context.createInstance(klass, _.extend({
        el: popup
      }, options));
      return popup;
    },
    popupEditor: function (options) {
      var editor = options.el = $(this.editor(options));
      this.$el.append(editor);
      editor = EditorFactory.createEditor(this.$context, options);
      return editor;
    },
    popupNewBook: function () {
      manager.popup(_.extend({
        popup: ns.NewBook,
        confirm: '保存',
        title: '设置杂志属性'
      }, mgz.model.Book.prototype.options));
    },
    popupButton_clickHandler: function (event) {
      var target = event.currentTarget
        , options = _.extend({}, popupDefault, $(target).data());
      if (target.tagName.toLowerCase() === 'a') {
        options.content = target.href;
        options.title = options.title || target.title;
      }
      this.popup(options);
      event.preventDefault();
    }
  });

  var EditorFactory = {
    createEditor: function (context, options) {
      var popup;
      switch (options.type) {
        case 'file':
          popup = context.createInstance(ns.FileEditor, options);
          break;

        case 'number':
        case 'range':
          popup = context.createInstance(ns.NumberEditor, options);
          break;

        case 'search':
          popup = context.createInstance(ns.SearchEditor, options);
          break;

        case 'select':
          popup = context.createInstance(ns.SelectEditor, options);
          break;

        case 'tags':
          popup = context.createInstance(ns.TagsEditor, options);
          break;

        case 'status':
          popup = context.createInstance(ns.SwitchEditor, options);
          break;

        case 'checkbox':
          popup = context.createInstance(ns.CheckboxEditor, options);
          break;

        default:
          popup = context.createInstance(ns.Editor, options);
          break;
      }
      return popup;
    }
  };

  var manager = ns.Manager = new Klass({
    el: 'body'
  });
}(Nervenet.createNameSpace('mgz.popup')));
