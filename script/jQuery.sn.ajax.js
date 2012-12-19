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
