'use strict';
(function (ns) {
  function showErrorPopup(target, msgs) {
    if (msgs.length === 0) {
      return;
    }
    msgs = _.isArray(msgs) ? msgs : [msgs];
    var html = msgs.join('<br />');
    $(target)
      .popover({
        trigger: 'manual',
        title: '表单填写有误',
        content: html,
        html: true
      })
      .popover('show')
      .one('focus', function () {
        $(this)
          .off('.popover')
          .removeData('popover')
          .siblings('.popover').remove()
          .end().closest('.form-group').removeClass('error');
      })
      .closest('.form-group').addClass('error');
  }

  ns.SmartForm = mgz.view.DataSyncView.extend({
    $router: null,
    uploaders: [],
    events: {
      "blur input,textarea,select": "input_blurHandler",
      'focus input': 'input_focusHandler',
      'submit': 'submitHandler',
      'data': 'dataHandler',
      'click .collapsible legend': 'legend_clickHandler'
    },
    remove: function () {
      this.model.off(null, null, this);
      _.each(this.uploaders, function (uploader) {
        uploader.off('data');
        if (uploader.remove) {
          uploader.remove();
        }
      });
      this.uploaders = null;
      Backbone.View.prototype.remove.call(this);
    },
    validate: function () {
      // 验证表单项是否合乎要求
      var elements = this.el.elements;
      if (this.$el.hasClass('uploading')) {
        alert('上传文件中，请稍候');
        return false;
      }
      // 验证两次输入的密码是否一致
      if ('newpassword' in elements && elements.newpassword.value !== elements.repassword.value) {
        showErrorPopup(elements.repassword, '两次密码不一致哟，麻烦检查下吧');
        return false;
      }
      //验证password是否有6位数
      if ('password' in elements && !/^[0-9a-zA-Z$!^#_@%&*.]{6,32}$/.test(elements.password.value)) {
        showErrorPopup(elements.password, '密码应为6~16个字符，请重新填写');
        return false;
      }

      return true;
    },
    checkInput: function (input) {
      // 验证必填项
      if (input.prop('required') && input.val() === '') {
        return '此项为必填项，您好像漏掉了哟';
      }
      // 验证内容
      var pattern = input.attr('pattern');
      if (pattern && input.val() !== '' && !new RegExp(pattern).test(input.val())) {
        return '填写格式有误，麻烦您检查并重新填写';
      }
      // 验证数值
      if (/number/i.test(input.attr('type')) && (input.attr('min') !== undefined || input.attr('max') !== undefined)) {
        var value = Number(input.val());
        if (isNaN(value)) {
          return '此项只能输入数字';
        }
        if (input.attr('min') !== undefined && value < input.attr('min')
          || input.attr('max') !== undefined && value > input.attr('max')) {
          return '数值超出规定范围';
        }
      }
      // 验证密码
      if (input.attr('type') === 'password' && !/^[0-9a-zA-Z$!^#_@%&*.]{6,32}$/.test(input.val())) {
        return '密码应为6~16个字符，包含字母、数字、特殊符号等';
      }

      return '';
    },
    getSubmit: function () {
      var selector = 'button:not([type=button]), input[type=submit]'
        , submit = this.$(selector);
      if (submit.length === 0) {
        var id = this.$el.attr('id');
        submit = $(selector).filter('[form=' + id + ']');
      }
      return submit;
    },
    useData: function (data) {
      for (var key in data) {
        if (!data.hasOwnProperty(key)) {
          return;
        }
        var value = data[key];
        if (_.isArray(value)) {
          this.$('[name="' + key +'[]"]').each(function () {
            this.checked = value.indexOf(this.value) !== -1;
          });
          continue;
        }
        var items = this.$('[name= ' + key + ']').val(value);
        try {
          items.length > 0 || this.$('[name=' + key + '][value=' + value + '], [name="' + key + '[]"][value=' + value + ']').prop('checked', true);
        } catch (e) {
          console.log('no such item');
        }
        if (items.attr('type') === 'hidden') {
          items.trigger('change');
        }
      }
    },
    input_blurHandler: function (event) {
      var target = $(event.currentTarget)
        , msg = this.checkInput(target);
      if (msg) {
        this.$('input').tooltip('destroy');
        target.tooltip({
          title: msg,
          placement: 'bottom',
          trigger: 'manual'
        }).tooltip('show');
      }
    },
    input_focusHandler: function (event) {
      $(event.currentTarget).tooltip('destroy');
    },
    legend_clickHandler: function (event) {
      $(event.currentTarget).toggleClass('collapsed');
    },
    submit_successHandler: function(response) {
      this.displayResult(true, response.msg, 'smile-o');
      this.$el.trigger('success');
      this.trigger('success', response);
    },
    submit_errorHandler: function(xhr, status, error) {
      error = mgz.Error.getAjaxMessage(xhr, status, error);
      this.displayResult(false, error.message, error.icon);
      this.trigger('error', xhr, status, error);
    },
    dataHandler: function (event, data) {
      this.useData(data);
    },
    submitHandler: function(event) {
      // 隐藏的表单不提交
      if (this.$el.is(':hidden')) {
        return;
      }

      var form = this.el,
          action = form.action;
      // 不需要提交的表单，或正在提交的表单
      if (this.$el.hasClass('fake') || this.$el.hasClass('loading')) {
        event.preventDefault();
        return false;
      }

      // 跳转类型
      if (action.indexOf('#') !== -1) {
        action = action.substr(action.indexOf('#'));
        action = action.replace(/\/:(\w+)/g, function(str, key) {
          return '/' + form.elements[key].value;
        });
        this.$router.navigate(action);
        return false;
      }

      // 防止多次提交
      this.displayProcessing();

      // ajax提交
      var isPass = this.validate();
      if (this.$el.hasClass('ajax') && isPass) {
        var data = this.$el.serialize();
        mgz.service.Manager.call(action, data, {
          success: this.submit_successHandler,
          error: this.submit_errorHandler,
          context: this,
          method: this.$el.attr('method')
        });
        return false;
      }

      return isPass;
    }
  });
}(Nervenet.createNameSpace('mgz.component')));