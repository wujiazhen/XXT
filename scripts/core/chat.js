/**
 * @author WJZ
 */

//chat
define('CORE.Chat', function($, CORE, util){	
	
	function createChatDia(){
		var chat_dia = new $.DialogBox({width:300, height:380, dragable:true});
	
		var $top = $('<h1 class="chat_top">与山东省的会话</h1>');
		//util.DragBox(chat_dia.$bg, $top);
		chat_dia.$con.append($top);
		
		var $con = $('<div class="chat_con"></div>');
		
		/* 样式测试 */
		$con.html('<div class="chat_item pr">'+
				  '<img class="chat_tx pa" src="images/default.gif"/>'+
				  '<div class="chat_nr"><span class="chat_time">14:00</span></br>东山饭店瑟芬迪大范甘</div></div>'+
				  '<div class="chat_item pr">'+
				  '<img class="chat_tx pa" src="images/default.gif"/>'+
				  '<div class="chat_nr"><span class="chat_time">16:09</span></br>东山饭店瑟芬迪大范甘迪发毒蛇反</div></div>'+
				  '<div class="chat_item pr">'+
				  '<img class="chat_tx pa" src="images/default.gif"/>'+
				  '<div class="chat_nr"><span class="chat_time">16:12</span></br>dojdjf  hisids idsdhdsdsh</div></div>'+
				   '<div class="chat_item pr">'+
				  '<img class="chat_tx pa" src="images/default.gif"/>'+
				  '<div class="chat_nr"><span class="chat_time">16:34</span></br>dojdjf  hisids idsdhdsdsh</div></div>'+
				   '<div class="chat_item pr">'+
				  '<img class="chat_tx pa" src="images/default.gif"/>'+
				  '<div class="chat_nr"><span class="chat_time">18:46</span></br>d手第四大山东省上四大时的是sdsh</div></div>'+
				   '<div class="chat_item pr">'+
				  '<img class="chat_tx pa" src="images/default.gif"/>'+
				  '<div class="chat_nr"><span class="chat_time">19:09</span></br>第四方继 实地地偶是但是的手递手第四大是 </div></div>');
		
		//chat_dia.$con.append($con);
	
		var $text = $('<textarea class="default_textarea chat_textarea"></textarea>');
		//chat_dia.$con.append($text);
		
		chat_dia.showBox();
	}
	
	function addChatItem($con){
		
		
	}	
	
	
	return {
		createChatDia : createChatDia
		
	};

}, jQuery, CORE, Util);

CORE.Chat.createChatDia();