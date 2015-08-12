/**
 * @overview 保存用户自身的各种状态
 * Created by 路佳 on 2014/12/13.
 */
'use strict';
(function (ns) {
  var KEY = 'me'
    , AUTH_TYPE = ''
    , singleton
    , url = encodeURIComponent(location.protocol + '//' + location.host + location.pathname + 'auth/qq_login.html');

  ns.Me = Backbone.Model.extend({
    idAttribute: 'token',
    urlRoot: mgz.config.API + 'auth/',
    login: {
      welcome: '肉大师电子杂志工具',
      api: mgz.config.api,
      appid: mgz.config.appid,
      url: url
    },
    initialize: function () {
      if (!singleton) {
        mgz.setToken = _.bind(this.setToken, this);
        window.callback = _.bind(this.setUser, this);
        this.onSuccess = _.bind(this.onSuccess, this);
        this.onError = _.bind(this.onError, this);
        singleton = this;

        var store = localStorage.getItem(KEY);
        if (store) {
          this.set(JSON.parse(store));
        }
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
    parse: function (response) {
      return response.me;
    },
    letsRock: function () {
      if (!Backbone.History.started) {
        return Backbone.history.start({
          root: mgz.BASE_URL
        });
      }
      return false;
    },
    setToken: function (token, type) {
      this.set('token', token);
      localStorage.setItem(AUTH_TYPE, type);

      var script = document.createElement('script');
      script.src = 'https://graph.qq.com/oauth2.0/me?access_token=' + token;
      document.head.appendChild(script);
    },
    setUser: function (response) {
      this.save(response, {
        success: this.onSuccess,
        error: this.onError
      });
    },
    onError: function () {
      this.letsRock();
      location.hash = '#/login/'
    },
    onSuccess: function () {
      if (!this.letsRock()) {
        location.hash = '#/my/';
      }
    }
  });

  mgz.setAuthCode = function (code) {
    singleton.setAuthCode(code);
  };
}(Nervenet.createNameSpace('mgz.model')));