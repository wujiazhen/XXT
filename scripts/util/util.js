/**
 * @author WJZ
 * 注意：以“$”开头的方法参数代表jquery对象，事件参数统一使用“e”
 */

var Util = {};

/**
 * 有关字符串处理的方法
 */

/*获取字符串长度，除去换行*/
Util.StrLen = function(str) {
	return str.replace(/\r?\n/g, '').length;
}

/*获取字符串真实长度(双字节换算为两个单字节)*/
Util.StrActualLen = function(str) {
	return str.replace(/[^\x00-\xff]/g, "xx").length;
} 

/**
 * 有关数组和对象的方法
 */

/*将伪数组对象转换为数组，需要有length属性，注意IE*/
Util.toArray = function(arraioid) {
	if (jQuery.makeArray) {
		return jQuery.makeArray(arraioid);
	};
	
	/*
	var re = [];
	
	if (arraioid != null) {
		var i = arraioid.length;
		
		if( i == null || typeof arraioid === "string" || jQuery.isFunction(arraioid) || arraioid.setInterval) {
			re[0] = arraioid;
		}else {
			while(i) 
				re[--i] = arraioid[i];
		}
	};
	
	return re;
	*/
}

/**
 * 加入收藏夹
 */
Util.AddBookmark = function(title, url) {
	if (window.sidebar) {
		window.sidebar.addPanel(title, url, '');
	} else if (document.all) {
		window.external.AddFavorite(url, title);
	} else{
		alert('您的浏览器不支持自动加入收藏夹功能，请使用菜单栏或者Ctrl+D手动收藏');
	};
}

/**
 * 设为主页
 */
Util.SetHome = function() {
  	if (document.all) {
  		document.body.style.behavior = 'url(#default#homepage)';
		document.body.setHomePage(window.location.href);
  	} else {
  		alert('您的浏览器不支持自动设置主页功能，请手动设置主页');
  	};
}

/**
 * 复制到剪切板，只实现了IE，其他浏览器最好使用flash实现
 */
Util.CopyToClipboard = function(str) {
	var result = false;
	
	if (window.clipboardData) {
		window.clipboardData.clearData();
		result = window.clipboardData.setData('Text', str);
	} 
	
	if (result) {
		alert('内容已成功复制至剪切板');
	} else {
		alert('对不起，您的浏览器不支持复制功能');
	};
}

/**
 * Cookie操作
 */
Util.Cookie = {
	set : function(name, value, hours) {
		var expire = '';
		
		if (hours) {
			expire = new Date((new Date()).getTime() + hours * 3600000);
			expire = '; expries=' + expire.toGMTString();
		};
		
		document.cookie = name + '=' + escape(value) + expire + ';path=/'; //站点的所有网页都可见
	},
	
	get : function(name) {
		var cookieValue = '';
		var search = name + '=';
		
		if (document.cookie.length > 0) {
			var offset = document.cookie.indexOf(search);
			if (offset != -1) {
				offset += search.length;
				var end = document.cookie.indexOf(';', offset);
				
				if (end == -1) {
					end = document.cookie.length;
				};
				
				cookieValue = unescape(document.cookie.substring(offset, end));
				return cookieValue;
			};
			
			return null;
		};
		
		return null;
	}
};

/**
 * 事件处理
 */
Util.StopPropagation = function(e) {
	if($.browser.msie){
        event.cancelBubble = true;
	}else{
		e.stopPropagation();
		e.preventDefault();
	}
};
	
/**
 * 拖动，无范围限制模式
 * 注意在存在iframe的情况下，拖动会出现事件丢失，应该可以通过加一层覆盖来解决
 */
Util.DragBox = function($box, $dragTitle) {
	var store =[];
	
	$dragTitle = $dragTitle || $box;
	
	$dragTitle.mousedown(function (e) { 
		if (e.which == 1) {
			if($box.css('position') == 'absolute' || $box.css('position') == 'fixed') {
				begin(e);
			}
		}else {
			return false;
		}
	});
	
	function begin(e) {
		store[0] = e.clientX;
		store[1] = e.clientY;
		store[2] = parseInt($box.css('left'));
		store[3] = parseInt($box.css('top'));
		
		$(document).mousemove(function (e) { drag(e);});
		$(document).mouseup(function (e) { end(e);});
		
		if($.browser.msie){
			$box[0].setCapture();		 
		}
		
		Util.StopPropagation(e);
	}
	
	function drag(e) {
		var dragnow = [e.clientX, e.clientY];
		
		var x = store[2] + dragnow[0] - store[0],
			  y = store[3] + dragnow[1] - store[1];
		
		var top = y, left = x;
		
		$box.css({left : left + 'px'});
		$box.css({top : top + 'px'});
		
		Util.StopPropagation(e);
	}
	
	function end(e) {
		store =[];
		
		$(document).unbind('mousemove');
		$(document).unbind('mouseup');
		
		if($.browser.msie){
            $box[0].releaseCapture();
		}
		
		Util.StopPropagation(e);
	}
	
}

/**
 * 拖动，有范围限制模式
 */
Util.DragBoxEx = function($box, $dragTitle, $area) {
	
}

/**
 * 元素resize
 */
Util.DragResize = function($box, $dragPoint, limit, resize_fn) {
	
	$dragPoint = $dragPoint || $box;
	
	var widthLimit = (limit && limit.widthLimit) || {max:1000, min:1};
	var heightLimit = (limit && limit.heightLimit) || {max:1000, min:1};
	
	var store =[];
	
	$box.mousedown(function (e) { 
		if (e.which == 1) {;
			begin(e);
		}else {
			return false;
		}
	});
	
	function begin(e) {
		store[0] = e.clientX;
		store[1] = e.clientY;
		store[2] = $box.width();
		store[3] = $box.height();
		
		$(document).mousemove(function (e) { drag(e);});
		$(document).mouseup(function (e) { end(e);});
		
		if($.browser.msie){
			$box[0].setCapture();		 
		}
		
		Util.StopPropagation(e);
	}

	function drag(e) {
		var resize = [e.clientX, e.clientY];

		var x = resize[0] - store[0],
			  y = resize[1] - store[1];
		
		var w = store[2] + x;
		if(w < widthLimit.min) w = widthLimit.min;
		if(w > widthLimit.max) w = widthLimit.max;
		
		var h = store[3] + y;
		if(h < heightLimit.min) h = heightLimit.min;
		if(h > heightLimit.max) h = heightLimit.max;
		
		$box.css({width:w+'px', height:h+'px'});
		
		if(resize_fn){
			resize_fn(w, h);
		}
		
		Util.StopPropagation(e);

	}

	function end(e) {
		store =[];
		
		$(document).unbind('mousemove');
		$(document).unbind('mouseup');
		
		if($.browser.msie){
           $box[0].releaseCapture();
		}
		
		Util.StopPropagation(e);
	}
	
}


/**
 * 返回顶部
 */
Util.GotoTop = function($button, $scrollObj) {
	var scrollObj = $scrollObj || $(window);
		
	if ($button.is(':visible')) {
		$button.hide();
	};
	
	$(window).scroll(scrollHandler);
	$button.click(scrollToTop);
	
	function scrollHandler() {
		var t = getScrollTop();
		
		if (t > 0) {
			$button.show();
		}else {
			$button.hide();
		}
	}
	
	function getScrollTop() {
		return scrollObj.scrollTop();
	}
	
	function scrollToTop() {
		scrollObj.unbind('scroll');
		$button.hide();
		
		var si = setInterval(function(){
			var m = getScrollTop();
			scrollObj.scrollTop( m - m * 0.1 );
				
			if (getScrollTop() <= 0){ 
				clearInterval(si);
				scrollObj.scroll(scrollHandler);
			}
			
		}, 10);			
	}
	
}

/**
 * 修复IE6 fixed bug
 */
Util.CorrectFixed = function($fixed) {
	if ($.browser.msie && $.browser.version == 6) {
		$('html').css({overflow : 'hidden'});
		$('body').css({overflow : 'auto', height : '100%'});
		
		if ($fixed.css('position') == 'fixed') {
			$fixed.css({'position' : 'absolute'});
		};
	};	
}











