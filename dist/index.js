'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _axios=require('axios');var _create=(0,_axios.create)({timeout:1000}),get=_create.get;exports.default=function(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};options=Object.assign({url:'favicon.ico',delay:2,startOnLoad:true},options);var currentStatus=null;var timer=null;var listeners=[];var online={checkStatus:function checkStatus(cb){get(options.url).then(function(){return true},function(err){return Boolean(err.code||err.request.status)}).then(function(status){if(cb&&typeof cb==='function')cb(status);if(status!==currentStatus){currentStatus=status;listeners.forEach(function(fn){return fn(status)})}})},onUpdateStatus:function onUpdateStatus(){for(var _len=arguments.length,fns=Array(_len),_key=0;_key<_len;_key++){fns[_key]=arguments[_key]}fns.forEach(function(fn){if(typeof fn==='function')listeners.push(fn)})},removeListener:function removeListener(fn){var index=listeners.indexOf(fn);if(index!==-1)listeners.splice(index,1)},removeAllListeners:function removeAllListeners(){listeners.length=0},start:function start(){timer=setInterval(online.checkStatus,options.delay*1000)},stop:function stop(){clearInterval(timer)}};if(options.startOnLoad){online.checkStatus();online.start()}return online};