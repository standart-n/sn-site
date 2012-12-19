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
