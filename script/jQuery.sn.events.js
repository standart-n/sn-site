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
