/**
 * Created by 路佳 on 2014/12/24.
 */
'use strict';
(function (ns) {
  ns.parseQuery = function (url) {
    if (!url) {
      return null;
    }
    url = url.charAt(0) === '?' ? url.slice(1) : url;
    var obj = {}
      , arr = url.split('&')
      , i = 0
      , len = arr.length;
    for (; i < len; i++) {
      var pair = arr[i].split('=');
      obj[pair[0]] = decodeURIComponent(pair[1]);
    }
    return obj;
  };
}(Nervenet.createNameSpace('mgz.utils')));