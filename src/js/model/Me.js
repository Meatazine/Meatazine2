/**
 * @overview 保存用户自身的各种状态
 * Created by 路佳 on 2014/12/13.
 */
'use strict';
(function (ns) {
  var singleton
    , url = encodeURIComponent(location.protocol + '//' + location.host + location.pathname);

  ns.Me = Backbone.Model.extend({
    login: {
      welcome: '肉大师电子杂志工具',
      api: mgz.config.api,
      appid: mgz.config.appid,
      url: url
    },
    urlRoot: mgz.config.API + 'user/',
    initialize: function () {
      if (!singleton) {
        singleton = this;
        this.on('change:id', this.id_changeHandler, this);
      } else {
        throw new Error('duplicate me');
      }
    },
    fetch: function (options) {
      options = options || {};
      options.success = this.onSuccess;
      options.error = this.onError;
      Backbone.Model.prototype.fetch.call(this, options);
    },
    setAuthCode: function (code) {
      var self = this;
      $.get('https://graph.qq.com/oauth2.0/token', {
        grant_type: 'authorization_code',
        client_id: mgz.config.appid,
        client_secret: mgz.config.appkey,
        code: code,
        redirect_uri: url
      }, function (response) {
        var reg = /[?&^]access_token=(\w+)[&$]/
          , match = response.match(reg);
        self.save('token', match[1]);
      })
    },
    onError: function () {
      location.hash = '#/user/login'
      Backbone.history.start({
        root: '/Meatazine2/'
      });
    },
    onSuccess: function () {
      var route = Backbone.history.start({
        root: '/Meatazine2/'
      });
      if (!route) {
        location.hash = '#/my';
      }
    },
    id_changeHandler: function () {
      location.href = '#/my';
    }
  });

  mgz.setAuthCode = function (code) {
    singleton.setAuthCode(code);
  };
}(Nervenet.createNameSpace('mgz.model')));