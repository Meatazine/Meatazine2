/**
 * Created by 路佳 on 2015/2/12.
 */
'use strcit';
(function (ns) {
  ns.Pages = Backbone.Collection.extend({
    model: ns.Page,
    initialize: function (models, options) {
      if (!models) {
        var model = new ns.Page();
        this.add(model);
      }
    }
  });
}(Nervenet.createNameSpace('mgz.model')));