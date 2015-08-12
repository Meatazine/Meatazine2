/**
 * Created by 路佳 on 2014/12/25.
 */
;(function (ns) {
  ns.Login = Backbone.View.extend({
    events: {
      'click .third-party a': 'social_clickHandler'
    },
    social_clickHandler: function (event) {
      open(event.currentTarget.href, 'auth');
      event.preventDefault();
    }
  });
}(Nervenet.createNameSpace('mgz.component')));