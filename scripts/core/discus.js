/**
 * @author WJZ
 * 请导入Util.js，以及menu组件和dialogBox组件
 */

//讨论组类
define('CORE.Discus', function($, CORE){	
	
	var Discus = function(){
		return this.init.apply(this, arguments);
	}
	
	Discus.defaults = {
		uuid : '',
		name : '未命名讨论组',
		tx_url : 'images/default.gif' 		//请提供默认图标
		//其他信息...
	};
	
	Discus.prototype = {
		constructor : Discus,
		
		init : function(options, $parent){
			var settings = $.extend({}, Discus.defaults, options);
			
			this.uuid = settings.uuid;
			this.name = settings.name;
			this.tx_url = settings.tx_url;
			
			this.build($parent);
			this.bindPopMenu();
			
			return this;
		},
		
		build : function($parent){
			var _this = this,
				d;
			
			var $discus = $('<div class="discus discus_mid"></div>')
			var $tx = $('<img class="discus_tx discus_tx_mid" src="' + this.tx_url + '" />');
			var $info = $('<div class="discus_info discus_info_mid"></div>');				
			var $name = $('<p class="discus_font_name">' + this.name + '</p>');
			
			$discus.append($tx).append($info.append($name));
			
			$parent.append($discus);
			_this.$discus = $discus;
					
		},
		
		bindPopMenu : function(){	
			var cm = CORE.PopMenu.discus;
			
			this.$discus.data('discus', this);
			
			this.$discus.bindPopMenu(cm);	
		}
	};
	
	return {
		Class : Discus
	};
	
}, jQuery, CORE);
