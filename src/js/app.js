/**
 * Created by 路佳 on 2014/12/10.
 */
'use strict';
$(function () {
  var context = Nervenet.createContext()
    , me = new mgz.model.Me();

  var router = new mgz.router.Router();

  me.fetch();

  // GA
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-36011684-2', 'auto');
  ga('send', 'pageview');
});