/**
 * Created by 路佳 on 2015/6/4.
 */
'use strict';
(function (_) {
  _.toObject = function (arr) {
    var obj = {};
    for (var i = 0, len = arr.length; i < len; i++) {
      obj[arr[i].name] = arr[i].value;
    }
    return obj;
  }
}(_));