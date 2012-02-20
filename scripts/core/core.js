/**
 * @author WJZ
 */

var CORE = {};

function define(str, source){
	var arr = str.split('.'), 
		g = CORE;
		
	for(var i = (arr[0] == 'CORE') ? 1 : 0, l = arr.length; i < l; i++){
		g[arr[i]] = g[arr[i]] || {};
		g = g[arr[i]];
	}
	
	if(!source) return g;
	
	if(typeof source === 'function'){
		var args = Array.prototype.slice.call(arguments, 2);
		source = source.apply(null, args);	
	}
	
	return $.extend(true, g, source);
}

CORE.config = {
	windowMinWidth : 800, //窗口最小宽度
	bannerHeight : 36,	//顶部导航的高度
	clListMinHeight : 100, //联系人列表的最小高度
	
	//url
	path : {
		'inform' : 		'inform.html',
		'rss' : 		'rss.html',
		'source' : 		'source.html',
		'account' : 	'account.html'
	}
	
};











