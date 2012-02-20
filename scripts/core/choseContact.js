/**
 * @author WJZ
 */

//选择联系人
define('CORE.choseContact', function($, CORE){
		
	var choseContactDia = new $.DialogBox({
		width : 500,
		height : 300,
		show_top : true,
		title : '选择联系人'
	});
	
	var $choseContact = $('<div class="chose_contact"></div>');
	
	choseContactDia.getContent().append($choseContact);
	
	var group_arr = $.contactList.group_arr;
	
	var choseContactPlusUpdate = function(){	
		if (!group_arr) return false;
		
		var $mid = $('<div class="chose_contact_mid"></div>');
		var $area_from = $('<div class="chose_contact_area"></div>');
		var $area_to = $area_from.clone();
	
		for (var i = 0, l = group_arr.length; i < l; i++) {
			//var group = new $.SmallGroup(group_arr[i], $area_from);
		};
		
		$choseContact.html('').append($area_from).append($mid).append($area_to);
	
		return true;		
	}
	
	var getChoseContactDia = function(){
		if (choseContactPlusUpdate())		
			choseContactDia.showBox();
	}
	
	return {
		getDia : getChoseContactDia
	};
	
}, jQuery, CORE);

