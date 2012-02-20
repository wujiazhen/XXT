/**
 * @author WJZ
 * 请确保导入Util.js
 * 简单的对话框组件，包含多种类型
 */

(function($, util){
	
	//对话框类
	var DialogBox = function (){
		return this.init.apply(this, arguments);
	}
	
	DialogBox.defaults = {
		type : '', //alert, confirm, warn_fail, warn_success
		width : 400,
		height : 200,
		top : 100,
		left : 0,
		parent : 'body',
		show_close : true,
		show_top : false,
		auto_close : false,
		remove_when_hide : false,
		timeout : 2000,
		dragable : true,
		visible : false,
		has_mask : false,
		title : '提示',
		txt : '',
		
		//handlers
		show_handler : null,
		close_handler : null,
		confirm_handler : null
	};
	
	DialogBox.prototype = {
		init : function(options){
			this.settings = $.extend({}, DialogBox.defaults, options);
			
			this.$parent = $(this.settings.parent);
			this.$bg = $('<div class="dia_bg"></div>');
			this.$con = $('<div class="dia_con"></div>');
			this.$bg.append(this.$con).appendTo(this.$parent);
			
			if(!DialogBox.$mask){
				var $mask = $('<div class="dia_mask"></div>');
				$('body').append($mask);
				DialogBox.$mask = $mask;
			}
			
			this.buildBox();
		},
		
		showBox : function(type){
			var _this = this;
			
			if (_this.settings.has_mask) {
				DialogBox.$mask.show();
			};
			
			if (type && type == 'fadeIn') {
				this.$bg.fadeIn();	
			} else{
				this.$bg.show();
			}
			
			if (_this.settings.show_handler) { _this.settings.show_handler.call(_this);}
			
			if (_this.settings.auto_close) {
				var _this = this;
				window.setTimeout(function(){ _this.closeBox('fadeOut');}, _this.settings.timeout);
			};
		},
		
		closeBox : function(type){
			var _this = this;
			
			if (this.$bg.is(':hidden')) return;
			
			if (type && type == 'fadeOut') {
				this.$bg.fadeOut('normal', function(){ remove();});	
			} else{
				this.$bg.hide();
				remove();
			}
			
			if (_this.settings.has_mask) {
				DialogBox.$mask.hide();
			};
			
			function remove(){
				if (_this.settings.remove_when_hide) { _this.$bg.remove();};
			}
			
			if (_this.settings.close_handler) { _this.settings.close_handler.call(_this);};
		},
		
		buildBox : function(){
			var _this = this,
				st = this.settings;

			if (st.type != '') {
				_this.toDefaultType();	
			};
			
			if (st.show_close) {
				var close_button = $('<div class="dia_close"></div>');
				
				close_button.click(function(){
					_this.closeBox();
				});
				
				close_button.appendTo(_this.$con);
			};
			
			_this.$con.css({width : st.width, height : st.height});
			_this.$bg.css({width : st.width + 2, height : st.height + 2});
			_this.$bg.css({top : st.top, left : ($('body').width()/2 - st.width/2)});
			
			if (st.show_top) {
				_this.addTop();
			};
			
			if (st.dragable) {
				util.DragBox(_this.$bg, _this.$top || null);
			};
			
			if (st.visible) {
				_this.showBox();
			};
		},
		
		toDefaultType : function(){
			var _this = this,
				st = this.settings;
			
			if (st.type.indexOf('warn') != -1) {
				var warn = $('<div class="dia_warn"><div class="dia_warn_image"></div></div>');;
				var warn_txt = $('<p class="dia_warn_txt">' + st.txt + '</p>');
				
				if (st.type.indexOf('success') != -1) {
					warn.find('.dia_warn_image').css({background : 'url(about:blank)'}); //提示成功的图标，暂时没有找到
				}
				
				warn_txt.appendTo(warn);
				this.$con.append(warn);
				
				st.auto_close = true;
				st.show_close = false;
				st.width = 250;
				st.height = 80;
				st.top = 200;
				st.remove_when_hide = true;
				
				return this;
			};
			
			this.addTop();
			
			var mid = $('<div class="dia_con_mid">' + st.txt + '</div>');
			mid.css({height : st.height - 85}); //微调
			this.$con.append(mid);
			
			var bottom = $('<div class="dia_con_bottom"></div>');
			this.$con.append(bottom);
			
			if (st.type == 'alert') {
				var b1 = $('<input type="button" class="dia_button" value="确定" />');  
				
				b1.click(function(){
					_this.closeBox();
				});
				
				b1.appendTo(bottom);
			} else if (st.type == 'confirm') {
				var b2 = $('<input type="button" class="dia_confirm_button" value="确定" />');  
				var b3 = $('<input type="button" class="dia_confirm_button" value="取消" />'); 
				 
				b3.click(function(){
					_this.closeBox();
				});
				
				b2.click(function(){
					if (st.confirm_handler) { st.confirm_handler.call(_this);};
					_this.closeBox();
				});
				
				bottom.append(b3).append(b2);
			}
				
		},
		
		getContent : function(){
			return this.$con;
		},
		
		addTop : function(){
			var top = $('<div class="dia_con_top">' + this.settings.title + '</div>');
			this.$top = top;
			this.$con.append(top);
		}

	};
	
	$.DialogBox = DialogBox;
	
})(jQuery, Util);
