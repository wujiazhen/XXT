/**
 * @author WJZ
 * 控制子页面跳转
 */

define('CORE.frame', function($, CORE){	
	
	var $frame = $('#con_frame');
	var $contact_div = $('.h_contact_div'),
		$cl_list_area = $('.cl_list_area');
	var $con = $('.h_con');
	var $nav_li = $('.h_frame_nav li');
	
	function openFrame(url){
		window.open(url, $frame.attr('name'));	
	}
	
	function changFrameUrl(url){
		$frame.attr('src', url);	
	}
	
	function navLead(){
		var $link = $(this);
		
		var id = $link[0].id;
	
		$nav_li.each(function(){
			var _this = $(this);
			_this.find('img').attr('src', 'images/' + _this[0].id + '_new1.png');
			_this.find('a').removeClass('h_frame_nav_pos');
		});
		
		$link.find('img').attr('src', 'images/' + id + '_new2.png');
		$link.find('a').addClass('h_frame_nav_pos');
		
		changFrameUrl(CORE.config.path[id])
	}
	
	function windowResize(){		
		var h = $('body').height() - CORE.config.bannerHeight;
		
		$contact_div.height(h);
		$con.height(h);
		
		$cl_list_area.height(h - 190 < CORE.config.clListMinHeight? CORE.config.clListMinHeight : h - 190);
	}
	
	windowResize(); //先调整一次
	$(window).resize(function(){ windowResize();});
	
	return {
		openFrame : openFrame,
		changFrameUrl : changFrameUrl,
		windowResize : windowResize,
		navLead : navLead
		
	};

}, jQuery, CORE);