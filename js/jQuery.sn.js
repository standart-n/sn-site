(function($){

	var methods={
		init:function(options)
		{
			if (!options) { options={}; }
			def={
				'bonus':
				{
					'inputText':'Введите номер карты'
				},
				'content':{},
				'result':{}
			};
			$.extend(true,def,options);
			return this.each(function(){
				alert('go!');
				$(this).data('sn',def);
				$(this).snEvents({'href':'#autoload'});
			});
		}
	};		

	$.fn.sn=function(sn){
		if (!sn) { sn={}; }
		if ( methods[sn]) {
			return methods[sn].apply(this,Array.prototype.slice.call(arguments,1));
		} else if (typeof sn==='object' || !sn) {
			return methods.init.apply(this,arguments);
		} else {
			$.error('Метод '+sn+' не существует');
		}    
		
	};		
})(jQuery);
(function($){

	var methods={
		init:function(options)
		{
			return this.each(function(){

			});
		},
		sendRequest:function(options)
		{
			if (!options) { options={}; }
			var def={
				'type':'json',
				'debug':false,
				'action':'build',
				'card':''
			};
			$.extend(true,def,options);
			if (def.debug) { def.type='text'; }
			var sn=$(this).data('sn');
			$.ajax({
				url:'index.php',
				type:'POST',
				data:{
					action:def.action,
					card:def.card
				},
				dataType:def.type,
				timeout:10000,
				beforeSend:function(){
					//$("#status").empty().addClass("loading");
				},
				success:function(s){
					//$.extend(true,sn.result,s);
					sn.result=s;
					if (def.debug) { alert(s); }
					//$("#status").empty().removeClass("loading");
					$(this).data('sn',sn);
					//if (sn.result.status) { $("#status").html(sn.result.status); }
					//if (sn.result.alert) { alert(sn.result.alert); }
					$(this).snEvents({'href':'#afterCheckCard'});
					//if (sn.result.callback) { $(this).snEvents({'href':'#'+sn.result.callback}); }
				},
				error:function(XMLHttpRequest,textStatus,error){ 
					$("#status").html(error).removeClass("loading");
				}
			});
		}
	};		

	$.fn.snAjax=function(sn){
		if (!sn) { sn={}; }
		if (methods[sn]) {
			return methods[sn].apply(this,Array.prototype.slice.call(arguments,1));
		} else if (typeof sn==='object' || !sn) {
			return methods.init.apply(this,arguments);
		} else {
			$.error('Метод '+sn+' не существует');
		}    
		
	};		
})(jQuery);
(function($){

	var methods={
		init:function(options)
		{
			return this.each(function(){
				$(this).snConf('main');
			});
		},
		main:function()
		{
			var sn=$(this).data('sn');
			$.ajax({
				url:'sn-project/settings/main.json',
				async:false,
				dataType:"json",
				success:function(s){
					$.extend(true,sn,s);
					$(this).data('sn',sn);
				}
			});
		}
	};

	$.fn.snConf=function(sn){
		if (!sn) { sn={}; }
		if (methods[sn]) {
			return methods[sn].apply(this,Array.prototype.slice.call(arguments,1));
		} else if (typeof sn==='object' || !sn) {
			return methods.init.apply(this,arguments);
		} else {
			$.error('Метод '+sn+' не существует');
		}    
		
	};		
})(jQuery);
(function($){

	var methods={
		init:function(options)
		{
			return this.each(function(){
				var def={
					'href':"none"
				};
				$.extend(true,def,options);
				var href=def.href;
				switch (href.replace(/(.*)#(.*)/,"$2")){
					case "autoload":
						var sn=$(this).data('sn');
						if (sn.bonus.inputText) {
							$("#bonus-area-input input").val(sn.bonus.inputText);
						}
						$(this).snTriggers('bonusForm');
					break;
					case "checkCard":
						var card_val=$("#bonus-area-input input").val();
						alert(card_val);
						/*$(this).snAjax('sendRequest',{'action':'show','card':card_val,'debug':false});*/
					break;
					case "afterCheckCard":
						sn=$(this).data('sn');
						var rt=false;
						/*$("#bonus-response-outer").show();*/
						if (sn.result) {
							if (sn.result.bonus) {
								if (sn.result.bonus.exists!==undefined) {
									$("#bonus-exists").html(sn.result.bonus.exists);
									$("#bonus-summ").show();
									$("#bonus-fail").hide();
									rt=true;
								}
							}
						}
						if (!rt) {
							$("#bonus-summ").hide();
							$("#bonus-fail").show();
						}
						$("#bonus-response-outer").slideDown();
					break;
					case "close":
						$(this).hide();
					break;
				}
			});
		}
	};

	$.fn.snEvents=function(sn){
		if (!sn) { sn={}; }
		if ( methods[sn]) {
			return methods[sn].apply(this,Array.prototype.slice.call(arguments,1));
		} else if (typeof sn==='object' || !sn) {
			return methods.init.apply(this,arguments);
		} else {
			$.error('Метод '+sn+' не существует');
		}		
	};		
})(jQuery);
(function($){

	var methods={
		init:function(options)
		{
			return this.each(function(){
			});
		},
		bonusForm:function()
		{
			th=$(this);
			sn=$(this).data('sn');
			$("#bonus-area-input input").on("focus",function(){
				$(this).removeClass("bonus-input-blur").addClass("bonus-input-focus").select();
				if (sn.bonus.inputText) {
					if ($(this).val()==sn.bonus.inputText) {
						$(this).val("");
					}
				}
			});
			$("#bonus-area-input input").on("blur",function(){
				$(this).removeClass("bonus-input-focus").addClass("bonus-input-blur");
				if (sn.bonus.inputText) {
					if ($(this).val()==="") {
						$(this).val(sn.bonus.inputText);
					}
				}
			});
			$("#bonus-link-check").on("click",function(e){
				e.preventDefault();
				th.snEvents({'href':'#checkCard'});
			});
			$("#bonus-form").on("submit",function(e){
				e.preventDefault();
				th.snEvents({'href':'#checkCard'});
			});
		}
	};

	$.fn.snTriggers=function(sn){
		if (!sn) { sn={}; }
		if ( methods[sn]) {
			return methods[sn].apply(this,Array.prototype.slice.call(arguments,1));
		} else if (typeof sn==='object' || !sn) {
			return methods.init.apply(this,arguments);
		} else {
			$.error('Метод '+sn+' не существует');
		}
		
	};
})(jQuery);
