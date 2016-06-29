/**
 * Created by Administrator on 2016/6/29.
 */
'use strict';

(function($) {
	$.fn.numberAnimate = function(setting) {
		var defaults = {
			speed : 1000,//�����ٶ�
			num : "", //��ʼ��ֵ
			iniAnimate : true, //�Ƿ�Ҫ��ʼ������Ч��
			symbol : '',//Ĭ�ϵķָ���ţ�ǧ����ǧ��
			dot : 0 //������λС����
		};
		//���settingΪ�գ���ȡdefault��ֵ
		var setting = $.extend(defaults, setting);

		//��������ж������ʾ����
		if($(this).length > 1){
			//alert("just only one obj!");
			return;
		}

		//���δ���ó�ʼ��ֵ����ʾ����
		if(setting.num == ""){
			//alert("must set a num!");
			return;
		}
		var nHtml = '<div class="mobile-number-box" data-num="{{num}}">\
            <span class="mobile-number">0</span>\
            <span class="mobile-number">1</span>\
            <span class="mobile-number">2</span>\
            <span class="mobile-number">3</span>\
            <span class="mobile-number">4</span>\
            <span class="mobile-number">5</span>\
            <span class="mobile-number">6</span>\
            <span class="mobile-number">7</span>\
            <span class="mobile-number">8</span>\
            <span class="mobile-number">9</span>\
            <span class="mobile-number">.</span>\
          </div>';

		//���ִ���
		var numToArr = function(num){
			num = parseFloat(num).toFixed(setting.dot);
			if(typeof(num) == 'number'){
				var arrStr = num.toString().split("");
			}else{
				var arrStr = num.split("");
			}
			//console.log(arrStr);
			return arrStr;
		};

		//����DOM symbol:�ָ����
		var setNumDom = function(arrStr){
			var shtml = '<div class="mobile-prints-numbox clearfix">';
			for(var i=0,len=arrStr.length; i<len; i++){
				if(i != 0 && (len-i)%3 == 0 && setting.symbol != "" && arrStr[i]!="."){
					shtml += '<div class="mobile-number-dot">'+setting.symbol+'</div>'+nHtml.replace("{{num}}",arrStr[i]);
				}else{
					shtml += nHtml.replace("{{num}}",arrStr[i]);
				}
			}
			shtml += '</div>';
			return shtml;
		};

		//ִ�ж���
		var runAnimate = function($parent){
			$parent.find(".mobile-number-box").each(function() {
				var num = $(this).attr("data-num");
				num = (num=="."?10:num);
				var spanHei = $(this).height()/11; //11ΪԪ�ظ���
				var thisTop = -num*spanHei+"px";
				var thisTopC3 = -(num-1)*spanHei+"px";
				//if(thisTop != $(this).css("top")){
					if(setting.iniAnimate){
						//HTML5��֧��
						if(!window.applicationCache){
							$(this).animate({
								top : thisTop
							}, setting.speed);
						}else{
							//console.log(thisTop);
							$(this).css({
								'transform':'translateY('+thisTop+')',
								'-ms-transform':'translateY('+thisTop+')',   /* IE 9 */
								'-moz-transform':'translateY('+thisTop+')',  /* Firefox */
								'-webkit-transform':'translateY('+thisTop+')', /* Safari �� Chrome */
								'-o-transform':'translateY('+thisTop+')',
								'-ms-transition':setting.speed/1000+'s',
								'-moz-transition':setting.speed/1000+'s',
								'-webkit-transition':setting.speed/1000+'s',
								'-o-transition':setting.speed/1000+'s',
								'transition':setting.speed/1000+'s'
							});
						}
					}else{
						setting.iniAnimate = true;
						$(this).css({
							top : thisTop
						});
					}
				//}
			});
		};

		//��ʼ��
		var init = function($parent){
			//��ʼ��
			$parent.html(setNumDom(numToArr(setting.num)));
			runAnimate($parent);
		};

		//���ò���
		this.resetData = function(num){
			var newArr = numToArr(num);
			var $dom = $(this).find(".mobile-number-box");
			if($dom.length < newArr.length){
				$(this).html(setNumDom(numToArr(num)));
			}else{
				$dom.each(function(index, el) {
					$(this).attr("data-num",newArr[index]);
				});
			}
			runAnimate($(this));
		};
		//init
		init($(this));
		return this;
	}
})(jQuery);
