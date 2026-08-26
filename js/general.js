/* -- JS general

БАЗОВЫЕ JS ДЛЯ САЙТОВ
Версия: 1.11 от 2021.07.27
Автор: Веб-студия «PixelStyle» (e-mail: info@pixelstyle.ru	 www.PixelStyle.ru)

*/


/* -- Шапка сайта -- */
jQuery(document).ready(function($){
	var mainHeader = $('header'),
		mainMenu = $('.header-menu'),
		secondaryNavigation = $('.cd-secondary-nav'),
		//this applies only if secondary nav is below intro section
		belowNavHeroContent = $('.sub-nav-hero'),
		headerHeight = mainHeader.height(),
		siteWidth = $(window).width(),
		mobileWidth = 767;
	
	//set scrolling variables
	var scrolling = false,
		previousTop = 0,
		currentTop = 0,
		scrollDelta = 10,
		scrollOffset = 150;

/*	mainHeader.on('click', '.nav-trigger, .menu_fon', function(event){
		// open primary navigation on mobile
		event.preventDefault();
		mainHeader.toggleClass('nav-open');
		$('.menu_fon').toggleClass('nav-open');
	});*/
	$(document).on('click', '.nav-trigger, .menu_fon', function(event){
		// open primary navigation on mobile
		event.preventDefault();
		mainHeader.toggleClass('nav-open');
		$('.menu_fon').toggleClass('nav-open');
	});

	$(window).on('scroll', function(){
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame)
				? setTimeout(autoHideHeader, 200)
				: requestAnimationFrame(autoHideHeader);
		}
	});

	$(window).on('resize', function(){
		headerHeight = mainHeader.height();
		siteWidth = $(window).width();
	});

	function autoHideHeader() {
		var currentTop = $(window).scrollTop();

		( belowNavHeroContent.length > 0 ) 
			? checkStickyNavigation(currentTop) // secondary navigation below intro
			: checkSimpleNavigation(currentTop);

		 	previousTop = currentTop;
		scrolling = false;
	}

	function checkSimpleNavigation(currentTop) {
		//there's no secondary nav or secondary nav is below primary nav
		if (previousTop - currentTop > scrollDelta) {
			//if scrolling up...
			mainHeader.removeClass('scrolledhide');
			mainMenu.css( "transform", "translateY(0)");
		} else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
			//if scrolling down...
			mainHeader.addClass('scrolledhide');
			
			if(siteWidth<mobileWidth){
				mainMenu.css( "transform", "translateY("+headerHeight+"px)");
			}
			
		}
	}

	function checkStickyNavigation(currentTop) {
		//secondary nav below intro section - sticky secondary nav
		var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();
		if (previousTop >= currentTop ) {
			//if scrolling up... 
			
			if( currentTop < secondaryNavOffsetTop ) {
				//secondary nav is not fixed
				mainMenu.css( "transform", "translateY(0)");
				mainHeader.removeClass('scrolledhide');
				secondaryNavigation.removeClass('fixed slide-up');
				belowNavHeroContent.removeClass('secondary-nav-fixed');
			} else if( previousTop - currentTop > scrollDelta ) {
				//secondary nav is fixed
				mainMenu.css( "transform", "translateY(0)");
				mainHeader.removeClass('scrolledhide');
				secondaryNavigation.removeClass('slide-up').addClass('fixed'); 
				belowNavHeroContent.addClass('secondary-nav-fixed');
			}
			
		} else {
			//if scrolling down...	
	 			if( currentTop > secondaryNavOffsetTop + scrollOffset ) {
	 				//hide primary nav
	 				if(siteWidth<mobileWidth){
					mainMenu.css( "transform", "translateY("+headerHeight+"px)");
				}
				mainHeader.addClass('scrolledhide');
				secondaryNavigation.addClass('fixed slide-up');
				belowNavHeroContent.addClass('secondary-nav-fixed');
			} else if( currentTop > secondaryNavOffsetTop ) {
				//once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset
				mainMenu.css( "transform", "translateY(0)");
				mainHeader.removeClass('scrolledhide');
				secondaryNavigation.addClass('fixed').removeClass('slide-up');
				belowNavHeroContent.addClass('secondary-nav-fixed');
			}

		}
	}
});





/* -- Верхняя шапка при скроле от 0px добавляем класс -- */
$(window).on("scroll", function () {
	var scrolled = $(this).scrollTop();
	if( scrolled > 87 ) {
		$('.cd-auto-hide-header').addClass('fixed');
	}
	if( scrolled <= 87 ) {	 
		$('.cd-auto-hide-header').removeClass('fixed');
	}
});
/* END -- Шапка сайта -- */



/* -- Главное меню, выделение пунктов -- */
jQuery('.uMenuRoot').find('a').each(function(){
	if($(this).attr('href')==window.location.pathname) {
		$(this).addClass('uMenuItemA'); // добавляем текущему пункту 
		$(this).parents('.uMenuRoot').siblings('a').addClass('uMenuItemA'); // добавляем родителю
	} 
});
/* END -- Главное меню, выделение пунктов -- */

/* -- Нижнее меню, выделение пунктов -- */
jQuery('.footer-top-menu').find('a').each(function(){
	if($(this).attr('href')==window.location.pathname) {
		$(this).addClass('uMenuItemA'); // добавляем текущему пункту 
		$(this).parents('.uMenuRoot').siblings('a').addClass('uMenuItemA'); // добавляем родителю
	} 
});
/* END -- Нижнее меню, выделение пунктов -- */



/* -- Мобильное меню -- */
$(document).ready(function() {
	$("#touch-menu").click(function() {
	$(this).addClass("show");
	});
});

$(document).ready(function(){
	var touch=$('#touch-menu');
	var menu=$('.header-menu');
	var body=$('body');
	$(touch).on('click',function(e){
		e.preventDefault();
	});
	$(window).resize(function(){
		var w=$(window).width();
		if(w>767&&menu.is(':hidden')){
			menu.removeAttr('style');
		}
	});
});
/* END -- Мобильное меню -- */



/*
	Аккордеон меню для интернет-магазина на uCoz.
	Разработано web-студией PixelStyle - http://PixelStyle.ru/
	Email: info@PixelStyle.ru
	Версия: 1.0 от 13.07.2015 г.
*/

/* -- Левое меню -- */
jQuery(function($) { // Начало кода самой меню
	/* параметры меню */

	var menu_animation_speed = 200; //Скорость анимации вверх/вниз
	var menu_id_name = 'ul#shop-hmenu '; // Значение id или класса, к которому привязывается меню. ОДИН СЕЛЕКТОР!
	var menu_site_id_name = '.menuvl .uMenuRoot'; // Значение id или класса, к которому привязывается меню сайта.
	/* конец параметров */
	$(document).ready(function() { // код меню
		/* Начинается код для меню-аккордеона верхнего уровня */
		$(menu_id_name+' > li > div.hmenu-corn').remove() //удаляем ненужный блок
		$(menu_id_name+' > li > div.hmenu-cont').each(function(t) { // Проверяем, есть ли подменю (ol, заключенная в div):
			if ($.cookie('topsubmenuMark-' + t)) { // Если в cookie есть запись об открытытии меню:
				$(this).show().prev().removeClass('collapsed').addClass('expanded'); // Открываем ее и добавляем класс открытия
			} else { // Если нет:
				$(this).hide().prev().removeClass('expanded').addClass('collapsed'); // Скрываем ее и добавляем классы закрытия
			}
			$(this).prev().addClass('collapsible').click(function() { // Подключаем событие при клике на ссылку под которой есть меню
				var this_t = $(menu_id_name+' > li > div.hmenu-cont').index($(this).next()); // Устанавливаем метку по какой ссылке меню кликнули
				if ($(this).next().css('display') == 'none') {

					// Если открыто одно подменю. мы скрываем остальные:
					$(this).parent('li').parent('ul').find('div.hmenu-cont').each(function(v) {
						if (v != this_t) {
							$(this).slideUp(menu_animation_speed, function() {
								$(this).prev().removeClass('expanded').addClass('collapsed');
								topcookieDel($(menu_id_name+' > li > div.hmenu-cont').index($(this)));
							});
						}
					});
					// :конец

					$(this).next().slideDown(menu_animation_speed, function() { // Покарываем меню:
						$(this).prev().removeClass('collapsed').addClass('expanded');
						topcookieSet(this_t);
					});
				} else {
					$(this).next().slideUp(menu_animation_speed, function() { // Скрываем меню:
						$(this).prev().removeClass('expanded').addClass('collapsed');
						topcookieDel(this_t);
						$(this).each(function() {
							$(this).hide(0, topcookieDel($(menu_id_name+' > li > div.hmenu-cont').index($(this)))).prev().removeClass('expanded').addClass('collapsed');
						});
					});
				}
				return false; // Предотвращаем переход по ссылке меню
			});
		});
	/* Начинается код для меню-аккордеона подуровней */
	$(menu_id_name+' ul').each(function(i) { // Проверяем, есть ли под-подменю (ul):
		if ($.cookie('submenuMark-' + i)) { // Если в cookie есть запись об открытытии меню:
			$(this).show().prev().removeClass('collapsed').addClass('expanded'); // Открываем ее и добавляем класс открытия
		} else {
			$(this).hide().prev().removeClass('expanded').addClass('collapsed'); // Скрываем ее и добавляем классы закрытия
		}
		$(this).prev().addClass('collapsible').click(function() { // Подключаем событие при клике на ссылку под которой есть меню
			var this_i = $(menu_id_name+' ul').index($(this).next());	// Устанавливаем метку по какой ссылке меню кликнули
			if ($(this).next().css('display') == 'none') {

				// Если открыто одно под-подменю. мы скрываем остальные:
				$(this).parent('li').parent('ol').find('ul').each(function(j) {
					if (j != this_i) {
						$(this).slideUp(menu_animation_speed, function() {
							$(this).prev().removeClass('expanded').addClass('collapsed');
							cookieDel($(menu_id_name+' ul').index($(this)));
						});
					}
				});
				// :конец

				$(this).next().slideDown(menu_animation_speed, function() { // Покарываем меню:
					$(this).prev().removeClass('collapsed').addClass('expanded');
					cookieSet(this_i);
				});
			} else {
				$(this).next().slideUp(menu_animation_speed, function() { // Скрываем меню:
					$(this).prev().removeClass('expanded').addClass('collapsed');
					cookieDel(this_i);
					$(this).find('ol').each(function() {
						$(this).hide(0, cookieDel($(menu_id_name+' ul').index($(this)))).prev().removeClass('expanded').addClass('collapsed');
					});
				});
			}
			return false; // Предотвращаем переход по ссылке меню
		});
	});


/* ----- */
		$(menu_site_id_name+' ul').each(function(i) { // Проверяем, есть ли под-подменю (ul):
		if ($.cookie('sitesubmenuMark-' + i)) { // Если в cookie есть запись об открытытии меню:
			$(this).show().prev().removeClass('collapsed').addClass('expanded'); // Открываем ее и добавляем класс открытия
		} else {
			$(this).hide().prev().removeClass('expanded').addClass('collapsed'); // Скрываем ее и добавляем классы закрытия
		}
		$(this).prev().addClass('collapsible').click(function() { // Подключаем событие при клике на ссылку под которой есть меню
			var this_i = $(menu_site_id_name+' ul').index($(this).next());	// Устанавливаем метку по какой ссылке меню кликнули
			if ($(this).next().css('display') == 'none') {

				// Если открыто одно под-подменю. мы скрываем остальные:
				$(this).parent('li').parent('ul').find('ul').each(function(j) {
					if (j != this_i) {
						$(this).slideUp(menu_animation_speed, function() {
							$(this).prev().removeClass('expanded').addClass('collapsed');
							sitecookieDel($(menu_site_id_name+' ul').index($(this)));
						});
					}
				});
				// :конец

				$(this).next().slideDown(menu_animation_speed, function() { // Покарываем меню:
					$(this).prev().removeClass('collapsed').addClass('expanded');
					sitecookieSet(this_i);
				});
			} else {
				$(this).next().slideUp(menu_animation_speed, function() { // Скрываем меню:
					$(this).prev().removeClass('expanded').addClass('collapsed');
					sitecookieDel(this_i);
					$(this).find('ul').each(function() {
						$(this).hide(0, sitecookieDel($(menu_site_id_name+' ul').index($(this)))).prev().removeClass('expanded').addClass('collapsed');
					});
				});
			}
			return false; // Предотвращаем переход по ссылке меню
		});
	});


/* ----- */
});
/* функции установления cookie */
function cookieSet(index) {
	$.cookie('submenuMark-' + index, 'opened', {
		expires: null,
		path: '/'
	}); // Ставим метку cookie (подменю открыто):
}

function cookieDel(index) {
	$.cookie('submenuMark-' + index, null, {
		expires: null,
		path: '/'
	}); // Удаляем метку cookie (подменю закрыто):
}
	function topcookieSet(indext) {
		$.cookie('topsubmenuMark-' + indext, 'topened', {
			expires: null,
			path: '/'
		}); // Ставим метку cookie (подменю открыто):
	}

	function topcookieDel(indext) {
		$.cookie('topsubmenuMark-' + indext, null, {
			expires: null,
			path: '/'
		}); // Удаляем метку cookie (подменю закрыто):
	}
	function sitecookieSet(indext) {
		$.cookie('sitesubmenuMark-' + indext, 'topened', {
			expires: null,
			path: '/'
		}); // Ставим метку cookie (подменю открыто):
	}

	function sitecookieDel(indext) {
		$.cookie('sitesubmenuMark-' + indext, null, {
			expires: null,
			path: '/'
		}); // Удаляем метку cookie (подменю закрыто):
	}

$(function() { // При нажатии на ссылку добавляем класс
		_uBuildMenu('.sidebar' , 2, document.location.href + '/', 'sample-menuA');
	})
});
/* END -- Левое меню -- */




/* -- Мобильная корзина -- */

/* END -- Мобильная корзина -- */
	




$(function() {
	$('a.disabled').on('click', function(event) {
	event.preventDefault();
	});
});





/* -- Cookie для сайта -- */

/*jslint browser: true */ /*global jQuery: true */
/**
* jQuery Cookie plugin
*
* Copyright (c) 2010 Klaus Hartl (stilbuero.de)
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/
// TODO JsDoc

/**
* Get the value of a cookie with the given key.
* @example $.cookie('the_cookie');
* @name $.cookie
* @cat Plugins/Cookie
* @author Klaus Hartl/klaus.hartl@stilbuero.de
*/
jQuery.cookie = function (key, value, options) {
	
	// key and at least value given, set cookie...
	if (arguments.length > 1 && String(value) !== "[object Object]") {
		options = jQuery.extend({}, options);

		if (value === null || value === undefined) {
			options.expires = -1;
		}

		if (typeof options.expires === 'number') {
			var days = options.expires, t = options.expires = new Date();
			t.setDate(t.getDate() + days);
		}
		
		value = String(value);
		
		return (document.cookie = [
			encodeURIComponent(key), '=',
			options.raw ? value : encodeURIComponent(value),
			options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
			options.path ? '; path=' + options.path : '',
			options.domain ? '; domain=' + options.domain : '',
			options.secure ? '; secure' : ''
		].join(''));
	}

	// key and possibly options given, get cookie...
	options = value || {};
	var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
	return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};
/* END -- Cookie для сайта -- */







/* -- Всплывающие модальные окна -- 

 arcticModal — jQuery plugin
 Version: 0.3
 Author: Sergey Predvoditelev (sergey.predvoditelev@gmail.com)
 Company: Arctic Laboratory (http://arcticlab.ru/)

 Docs & Examples: http://arcticlab.ru/arcticmodal/

 */
(function(d){var g={type:"html",content:"",url:"",ajax:{},ajax_request:null,closeOnEsc:!0,closeOnOverlayClick:!0,clone:!1,overlay:{block:void 0,tpl:'<div class="arcticmodal-overlay"></div>',css:{backgroundColor:"#000",opacity:0.5}},container:{block:void 0,tpl:'<div class="arcticmodal-container"><table class="arcticmodal-container_i"><tr><td class="arcticmodal-container_i2"></td></tr></table></div>'},wrap:void 0,body:void 0,errors:{tpl:'<div class="arcticmodal-error arcticmodal-close"></div>',autoclose_delay:2E3,
ajax_unsuccessful_load:"Error"},openEffect:{type:"fade",speed:400},closeEffect:{type:"fade",speed:400},beforeOpen:d.noop,afterOpen:d.noop,beforeClose:d.noop,afterClose:d.noop,afterLoading:d.noop,afterLoadingOnShow:d.noop,errorLoading:d.noop},j=0,e=d([]),m={isEventOut:function(a,b){var c=!0;d(a).each(function(){d(b.target).get(0)==d(this).get(0)&&(c=!1);0==d(b.target).closest("HTML",d(this).get(0)).length&&(c=!1)});return c}},f={getParentEl:function(a){var b=d(a);return b.data("arcticmodal")?b:(b=
d(a).closest(".arcticmodal-container").data("arcticmodalParentEl"))?b:!1},transition:function(a,b,c,e){e=void 0==e?d.noop:e;switch(c.type){case "fade":"show"==b?a.fadeIn(c.speed,e):a.fadeOut(c.speed,e);break;case "none":"show"==b?a.show():a.hide(),e()}},prepare_body:function(a,b){d(".arcticmodal-close",a.body).unbind("click.arcticmodal").bind("click.arcticmodal",function(){b.arcticmodal("close");return!1})},init_el:function(a,b){var c=a.data("arcticmodal");if(!c){c=b;j++;c.modalID=j;c.overlay.block=
d(c.overlay.tpl);c.overlay.block.css(c.overlay.css);c.container.block=d(c.container.tpl);c.body=d(".arcticmodal-container_i2",c.container.block);b.clone?c.body.html(a.clone(!0)):(a.before('<div id="arcticmodalReserve'+c.modalID+'" style="display: none" />'),c.body.html(a));f.prepare_body(c,a);c.closeOnOverlayClick&&c.overlay.block.add(c.container.block).click(function(b){m.isEventOut(d(">*",c.body),b)&&a.arcticmodal("close")});c.container.block.data("arcticmodalParentEl",a);a.data("arcticmodal",c);
e=d.merge(e,a);d.proxy(h.show,a)();if("html"==c.type)return a;if(void 0!=c.ajax.beforeSend){var k=c.ajax.beforeSend;delete c.ajax.beforeSend}if(void 0!=c.ajax.success){var g=c.ajax.success;delete c.ajax.success}if(void 0!=c.ajax.error){var l=c.ajax.error;delete c.ajax.error}var n=d.extend(!0,{url:c.url,beforeSend:function(){void 0==k?c.body.html('<div class="arcticmodal-loading" />'):k(c,a)},success:function(b){a.trigger("afterLoading");c.afterLoading(c,a,b);void 0==g?c.body.html(b):g(c,a,b);f.prepare_body(c,
a);a.trigger("afterLoadingOnShow");c.afterLoadingOnShow(c,a,b)},error:function(){a.trigger("errorLoading");c.errorLoading(c,a);void 0==l?(c.body.html(c.errors.tpl),d(".arcticmodal-error",c.body).html(c.errors.ajax_unsuccessful_load),d(".arcticmodal-close",c.body).click(function(){a.arcticmodal("close");return!1}),c.errors.autoclose_delay&&setTimeout(function(){a.arcticmodal("close")},c.errors.autoclose_delay)):l(c,a)}},c.ajax);c.ajax_request=d.ajax(n);a.data("arcticmodal",c)}},init:function(a){a=
d.extend(!0,{},g,a);if(d.isFunction(this))if(void 0==a)d.error("jquery.arcticmodal: Uncorrect parameters");else if(""==a.type)d.error('jquery.arcticmodal: Don\'t set parameter "type"');else switch(a.type){case "html":if(""==a.content){d.error('jquery.arcticmodal: Don\'t set parameter "content"');break}var b=a.content;a.content="";return f.init_el(d(b),a);case "ajax":if(""==a.url){d.error('jquery.arcticmodal: Don\'t set parameter "url"');break}return f.init_el(d("<div />"),a)}else return this.each(function(){f.init_el(d(this),
d.extend(!0,{},a))})}},h={show:function(){var a=f.getParentEl(this);if(!1===a)d.error("jquery.arcticmodal: Uncorrect call");else{var b=a.data("arcticmodal");b.overlay.block.hide();b.container.block.hide();d("BODY").append(b.overlay.block);d("BODY").append(b.container.block);b.beforeOpen(b,a);a.trigger("beforeOpen");if("hidden"!=b.wrap.css("overflow")){b.wrap.data("arcticmodalOverflow",b.wrap.css("overflow"));var c=b.wrap.outerWidth(!0);var g=b.wrap.outerWidth(!0);g!=
c&&b.wrap.css("marginRight",g-c+"px")}e.not(a).each(function(){d(this).data("arcticmodal").overlay.block.hide()});f.transition(b.overlay.block,"show",1<e.length?{type:"none"}:b.openEffect);f.transition(b.container.block,"show",1<e.length?{type:"none"}:b.openEffect,function(){b.afterOpen(b,a);a.trigger("afterOpen")});return a}},close:function(){if(d.isFunction(this))e.each(function(){d(this).arcticmodal("close")});else return this.each(function(){var a=f.getParentEl(this);if(!1===a)d.error("jquery.arcticmodal: Uncorrect call");
else{var b=a.data("arcticmodal");!1!==b.beforeClose(b,a)&&(a.trigger("beforeClose"),e.not(a).last().each(function(){d(this).data("arcticmodal").overlay.block.show()}),f.transition(b.overlay.block,"hide",1<e.length?{type:"none"}:b.closeEffect),f.transition(b.container.block,"hide",1<e.length?{type:"none"}:b.closeEffect,function(){b.afterClose(b,a);a.trigger("afterClose");b.clone||d("#arcticmodalReserve"+b.modalID).replaceWith(b.body.find(">*"));b.overlay.block.remove();b.container.block.remove();a.data("arcticmodal",
null);d(".arcticmodal-container").length||(b.wrap.data("arcticmodalOverflow")&&b.wrap.css("overflow",b.wrap.data("arcticmodalOverflow")),b.wrap.css("marginRight",0))}),"ajax"==b.type&&b.ajax_request.abort(),e=e.not(a))}})},setDefault:function(a){d.extend(!0,g,a)}};d(function(){g.wrap=d(document.all&&!document.querySelector?"html":"body")});d(document).bind("keyup.arcticmodal",function(a){var b=e.last();b.length&&b.data("arcticmodal").closeOnEsc&&27===a.keyCode&&b.arcticmodal("close")});d.arcticmodal=
d.fn.arcticmodal=function(a){if(h[a])return h[a].apply(this,Array.prototype.slice.call(arguments,1));if("object"===typeof a||!a)return f.init.apply(this,arguments);d.error("jquery.arcticmodal: Method "+a+" does not exist")}})(jQuery);


/* -- Перечисление всплывающих окон -- */
$(function() {
	$('.tooglelog a').click(function() {
		$('#boxUserLogin').arcticmodal();
	});
	$('.toogleprivacy a').click(function() {
		$('#boxUserPrivacy').arcticmodal();
	});

	$('.toogle a').click(function() {
		$('#boxUserFirstInfo').arcticmodal();
	});

	$('.toogle2 a').click(function() {
		$('#boxUserFirstInfo2').arcticmodal();
	});
	$('.toogle3 a').click(function() {
		$('#boxUserFirstInfo3').arcticmodal();
	});
	$('.toogle4 a').click(function() {
		$('#boxUserFirstInfo4').arcticmodal();
	});
	$('.toogle5 a').click(function() {
		$('#boxUserFirstInfo5').arcticmodal();
	});


	/* -- Всплывающее модальное окно с задержкой и запоминанием cookie -- */
	// Проверим, есть ли запись в куках о посещении посетителя
	// Если запись есть - ничего не делаем
	if (!$.cookie('was')) {
		// Покажем всплывающее окно
		setTimeout(function() {

		      // Покажем всплывающее окно
		      $('#boxUserFirstInfo0').arcticmodal({
		          closeOnOverlayClick: true,
		          closeOnEsc: true
		      });

		},500)
	}
	// Запомним в куках, что посетитель к нам уже заходил
	$.cookie('was', true, {
		expires: 1,
		path: '/'
	});
});
/* END -- Всплывающие модальные окна -- */



/* -- Соглашение на использование cookie -- */
$(function() {
	/* Проверяем запись в куках о посещении*/
	/* Если запись есть - ничего не делаем*/
	if (!$.cookie('hiderolikmodal')) {
	/* если cookie не установлено появится окно*/
	/* с задержкой 3 секунд*/
	var delay_popup = 3000;
	setTimeout("document.getElementById('overlay').style.opacity='1.0'", delay_popup);
	}
});
/* -- END. Соглашение на использование cookie -- */








/* -- Маска номера телефона -- 

	jQuery Masked Input Plugin
	Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
	Version: 1.4.1
*/
!function(factory) {
	"function" == typeof define && define.amd ? define([ "jquery" ], factory) : factory("object" == typeof exports ? require("jquery") : jQuery);
}(function($) {
	var caretTimeoutId, ua = navigator.userAgent, iPhone = /iphone/i.test(ua), chrome = /chrome/i.test(ua), android = /android/i.test(ua);
	$.mask = {
		definitions: {
			"9": "[0-9]",
			a: "[A-Za-z]",
			"*": "[A-Za-z0-9]"
		},
		autoclear: !0,
		dataName: "rawMaskFn",
		placeholder: "_"
	}, $.fn.extend({
		caret: function(begin, end) {
			var range;
			if (0 !== this.length && !this.is(":hidden")) return "number" == typeof begin ? (end = "number" == typeof end ? end : begin, 
			this.each(function() {
				this.setSelectionRange ? this.setSelectionRange(begin, end) : this.createTextRange && (range = this.createTextRange(), 
				range.collapse(!0), range.moveEnd("character", end), range.moveStart("character", begin), 
				range.select());
			})) : (this[0].setSelectionRange ? (begin = this[0].selectionStart, end = this[0].selectionEnd) : document.selection && document.selection.createRange && (range = document.selection.createRange(), 
			begin = 0 - range.duplicate().moveStart("character", -1e5), end = begin + range.text.length), 
			{
				begin: begin,
				end: end
			});
		},
		unmask: function() {
			return this.trigger("unmask");
		},
		mask: function(mask, settings) {
			var input, defs, tests, partialPosition, firstNonMaskPos, lastRequiredNonMaskPos, len, oldVal;
			if (!mask && this.length > 0) {
				input = $(this[0]);
				var fn = input.data($.mask.dataName);
				return fn ? fn() : void 0;
			}
			return settings = $.extend({
				autoclear: $.mask.autoclear,
				placeholder: $.mask.placeholder,
				completed: null
			}, settings), defs = $.mask.definitions, tests = [], partialPosition = len = mask.length, 
			firstNonMaskPos = null, $.each(mask.split(""), function(i, c) {
				"?" == c ? (len--, partialPosition = i) : defs[c] ? (tests.push(new RegExp(defs[c])), 
				null === firstNonMaskPos && (firstNonMaskPos = tests.length - 1), partialPosition > i && (lastRequiredNonMaskPos = tests.length - 1)) : tests.push(null);
			}), this.trigger("unmask").each(function() {
				function tryFireCompleted() {
					if (settings.completed) {
						for (var i = firstNonMaskPos; lastRequiredNonMaskPos >= i; i++) if (tests[i] && buffer[i] === getPlaceholder(i)) return;
						settings.completed.call(input);
					}
				}
				function getPlaceholder(i) {
					return settings.placeholder.charAt(i < settings.placeholder.length ? i : 0);
				}
				function seekNext(pos) {
					for (;++pos < len && !tests[pos]; ) ;
					return pos;
				}
				function seekPrev(pos) {
					for (;--pos >= 0 && !tests[pos]; ) ;
					return pos;
				}
				function shiftL(begin, end) {
					var i, j;
					if (!(0 > begin)) {
						for (i = begin, j = seekNext(end); len > i; i++) if (tests[i]) {
							if (!(len > j && tests[i].test(buffer[j]))) break;
							buffer[i] = buffer[j], buffer[j] = getPlaceholder(j), j = seekNext(j);
						}
						writeBuffer(), input.caret(Math.max(firstNonMaskPos, begin));
					}
				}
				function shiftR(pos) {
					var i, c, j, t;
					for (i = pos, c = getPlaceholder(pos); len > i; i++) if (tests[i]) {
						if (j = seekNext(i), t = buffer[i], buffer[i] = c, !(len > j && tests[j].test(t))) break;
						c = t;
					}
				}
				function androidInputEvent() {
					var curVal = input.val(), pos = input.caret();
					if (oldVal && oldVal.length && oldVal.length > curVal.length) {
						for (checkVal(!0); pos.begin > 0 && !tests[pos.begin - 1]; ) pos.begin--;
						if (0 === pos.begin) for (;pos.begin < firstNonMaskPos && !tests[pos.begin]; ) pos.begin++;
						input.caret(pos.begin, pos.begin);
					} else {
						for (checkVal(!0); pos.begin < len && !tests[pos.begin]; ) pos.begin++;
						input.caret(pos.begin, pos.begin);
					}
					tryFireCompleted();
				}
				function blurEvent() {
					checkVal(), input.val() != focusText && input.change();
				}
				function keydownEvent(e) {
					if (!input.prop("readonly")) {
						var pos, begin, end, k = e.which || e.keyCode;
						oldVal = input.val(), 8 === k || 46 === k || iPhone && 127 === k ? (pos = input.caret(), 
						begin = pos.begin, end = pos.end, end - begin === 0 && (begin = 46 !== k ? seekPrev(begin) : end = seekNext(begin - 1), 
						end = 46 === k ? seekNext(end) : end), clearBuffer(begin, end), shiftL(begin, end - 1), 
						e.preventDefault()) : 13 === k ? blurEvent.call(this, e) : 27 === k && (input.val(focusText), 
						input.caret(0, checkVal()), e.preventDefault());
					}
				}
				function keypressEvent(e) {
					if (!input.prop("readonly")) {
						var p, c, next, k = e.which || e.keyCode, pos = input.caret();
						if (!(e.ctrlKey || e.altKey || e.metaKey || 32 > k) && k && 13 !== k) {
							if (pos.end - pos.begin !== 0 && (clearBuffer(pos.begin, pos.end), shiftL(pos.begin, pos.end - 1)), 
							p = seekNext(pos.begin - 1), len > p && (c = String.fromCharCode(k), tests[p].test(c))) {
								if (shiftR(p), buffer[p] = c, writeBuffer(), next = seekNext(p), android) {
									var proxy = function() {
										$.proxy($.fn.caret, input, next)();
									};
									setTimeout(proxy, 0);
								} else input.caret(next);
								pos.begin <= lastRequiredNonMaskPos && tryFireCompleted();
							}
							e.preventDefault();
						}
					}
				}
				function clearBuffer(start, end) {
					var i;
					for (i = start; end > i && len > i; i++) tests[i] && (buffer[i] = getPlaceholder(i));
				}
				function writeBuffer() {
					input.val(buffer.join(""));
				}
				function checkVal(allow) {
					var i, c, pos, test = input.val(), lastMatch = -1;
					for (i = 0, pos = 0; len > i; i++) if (tests[i]) {
						for (buffer[i] = getPlaceholder(i); pos++ < test.length; ) if (c = test.charAt(pos - 1), 
						tests[i].test(c)) {
							buffer[i] = c, lastMatch = i;
							break;
						}
						if (pos > test.length) {
							clearBuffer(i + 1, len);
							break;
						}
					} else buffer[i] === test.charAt(pos) && pos++, partialPosition > i && (lastMatch = i);
					return allow ? writeBuffer() : partialPosition > lastMatch + 1 ? settings.autoclear || buffer.join("") === defaultBuffer ? (input.val() && input.val(""), 
					clearBuffer(0, len)) : writeBuffer() : (writeBuffer(), input.val(input.val().substring(0, lastMatch + 1))), 
					partialPosition ? i : firstNonMaskPos;
				}
				var input = $(this), buffer = $.map(mask.split(""), function(c, i) {
					return "?" != c ? defs[c] ? getPlaceholder(i) : c : void 0;
				}), defaultBuffer = buffer.join(""), focusText = input.val();
				input.data($.mask.dataName, function() {
					return $.map(buffer, function(c, i) {
						return tests[i] && c != getPlaceholder(i) ? c : null;
					}).join("");
				}), input.one("unmask", function() {
					input.off(".mask").removeData($.mask.dataName);
				}).on("focus.mask", function() {
					if (!input.prop("readonly")) {
						clearTimeout(caretTimeoutId);
						var pos;
						focusText = input.val(), pos = checkVal(), caretTimeoutId = setTimeout(function() {
							input.get(0) === document.activeElement && (writeBuffer(), pos == mask.replace("?", "").length ? input.caret(0, pos) : input.caret(pos));
						}, 10);
					}
				}).on("blur.mask", blurEvent).on("keydown.mask", keydownEvent).on("keypress.mask", keypressEvent).on("input.mask paste.mask", function() {
					input.prop("readonly") || setTimeout(function() {
						var pos = checkVal(!0);
						input.caret(pos), tryFireCompleted();
					}, 0);
				}), chrome && android && input.off("input.mask").on("input.mask", androidInputEvent), 
				checkVal();
			});
		}
	});
});

$("#phone").mask("+7 (999) 999-99-99",{autoclear: false});
$("#phone1").mask("+7 (999) 999-99-99",{autoclear: false});
$("#phone2").mask("+7 (999) 999-99-99",{autoclear: false});
$("#phone3").mask("+7 (999) 999-99-99",{autoclear: false});
$("#phone4").mask("+7 (999) 999-99-99",{autoclear: false});
$("#phone5").mask("+7 (999) 999-99-99",{autoclear: false});
$("#order-fld-1").mask("+7 (999) 999-99-99",{autoclear: false});



//1 пример
$(function(){
	$("#phone").mask("+7 (999) 999-99-99",{autoclear: false});
});
$(function(){
	$("#phone1").mask("+7 (999) 999-99-99",{autoclear: false});
});
$(function(){
	$("#phone2").mask("+7 (999) 999-99-99",{autoclear: false});
});
$(function(){
	$("#phone3").mask("+7 (999) 999-99-99",{autoclear: false});
});
$(function(){
	$("#phone4").mask("+7 (999) 999-99-99",{autoclear: false});
});
$(function(){
	$("#phone5").mask("+7 (999) 999-99-99",{autoclear: false});
});
//2 пример
$("#date").mask("99.99.9999", {placeholder: "дд.мм.гггг" });
$("#index").mask("999999", {placeholder: " " });
//3
$("#phone9").mask("+7 (999) 999-99-99", {
	completed: function(){ alert("Вы ввели номер: " + this.val()); }
});
//4
$("#number").mask("0.9?9");
//5
$.mask.definitions['~']='[+-]';
$("#number2").mask("~9.99");
$.mask.definitions['h']='[A-Fa-f0-9]';
$("#color").mask("#hhhhhh");

$(function() {
	function maskPhone() {
		var country = $('#country option:selected').val();
		switch (country) {
		case "ru":
			$("#phone").mask("+7 (999) 999-99-99");
			break;
		case "ua":
			$("#phone").mask("+380 (999) 999-99-99");
			break;
		case "by":
			$("#phone").mask("+375 (999) 999-99-99");
			break;			
		}	
	}
	maskPhone();
	$('#country').change(function() {
		maskPhone();
	});
});
/* END -- Маска номера телефона -- */










jQuery(document).ready(function($){
	$(document).on('click', '.question', function(event){
		event.preventDefault();
		$(this).toggleClass('show');
	});
});








/* -- КНОПКИ ПЛЮС/МИНУС (+/-) ДЛЯ КОЛИЧЕСТВА ТОВАРОВ -- */
$('.value-numb').each(function () {
	var $quantity = $(this).find('input');
	var $quantity2 = $(this).parents(".list-item").find('.item').find('.value').find('input');
	$(this).find('.tic-tac').on('click', function (event) {
	event.preventDefault();
	var currentQuantity = $quantity.val();
	if (!isNaN(currentQuantity) && currentQuantity > 0) {
		var newVal = parseInt(currentQuantity) + $(this).data('incval');
		if (newVal) {
			$quantity.val(newVal);
			$quantity2.val(newVal);
		}
	}
	$(this).parent().find('input').select();
	checkNumber($(this).parent().find('input').get(0), {keyCode:8, target: $(this).parent().find('input').get(0)}, '1');
	});
});
/* END -- КНОПКИ ПЛЮС/МИНУС (+/-) ДЛЯ КОЛИЧЕСТВА ТОВАРОВ -- */






/* -- FAQ открытие и закрытие -- */
$(".open").click( function () {
	var container = $(this).parents(".topic");
	var answer = container.find(".answer");
	var trigger = container.find(".faq-t");

	answer.slideToggle(200);

	if (trigger.hasClass("faq-o")) {
		trigger.removeClass("faq-o");
	}
	else {
		trigger.addClass("faq-o");
	}

	if (container.hasClass("opened")) {
		container.removeClass("opened");
	}
	else {
		container.addClass("opened");
	}
});
/* END -- FAQ открытие и закрытие -- */





/* -- Табы переключения -- */
jQuery(document).ready(function($){
	var tabs = $('.cd-tabs');
	
	tabs.each(function(){
		var tab = $(this),
			tabItems = tab.find('ul.cd-tabs-navigation'),
			tabContentWrapper = tab.children('ul.cd-tabs-content'),
			tabNavigation = tab.find('nav');

		tabItems.on('click', 'a', function(event){
			event.preventDefault();
			var selectedItem = $(this);
			if( !selectedItem.hasClass('selected') ) {
				var selectedTab = selectedItem.data('content'),
					selectedContent = tabContentWrapper.find('li[data-content="'+selectedTab+'"]'),
					slectedContentHeight = selectedContent.innerHeight();
				
				tabItems.find('a.selected').removeClass('selected');
				selectedItem.addClass('selected');
				selectedContent.addClass('selected').siblings('li').removeClass('selected');
				//animate tabContentWrapper height when content changes 
				tabContentWrapper.animate({
					'height': slectedContentHeight
				}, 200);
			}
		});

		//hide the .cd-tabs::after element when tabbed navigation has scrolled to the end (mobile version)
		checkScrolling(tabNavigation);
		tabNavigation.on('scroll', function(){ 
			checkScrolling($(this));
		});
	});
	
	$(window).on('resize', function(){
		tabs.each(function(){
			var tab = $(this);
			checkScrolling(tab.find('nav'));
			tab.find('.cd-tabs-content').css('height', 'auto');
		});
	});

	function checkScrolling(tabs){
		var totalTabWidth = parseInt(tabs.children('.cd-tabs-navigation').width()),
		 	tabsViewport = parseInt(tabs.width());
		if( tabs.scrollLeft() >= totalTabWidth - tabsViewport) {
			tabs.parent('.cd-tabs').addClass('is-ended');
		} else {
			tabs.parent('.cd-tabs').removeClass('is-ended');
		}
	}
});
/* END -- Табы переключения -- */







/*! WOW wow.js - v1.3.0 - 2016-10-04
* https://wowjs.uk
* Copyright (c) 2016 Thomas Grainger; Licensed MIT */!function(a,b){if("function"==typeof define&&define.amd)define(["module","exports"],b);else if("undefined"!=typeof exports)b(module,exports);else{var c={exports:{}};b(c,c.exports),a.WOW=c.exports}}(this,function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function d(a,b){return b.indexOf(a)>=0}function e(a,b){for(var c in b)if(null==a[c]){var d=b[c];a[c]=d}return a}function f(a){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)}function g(a){var b=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],c=arguments.length<=2||void 0===arguments[2]?!1:arguments[2],d=arguments.length<=3||void 0===arguments[3]?null:arguments[3],e=void 0;return null!=document.createEvent?(e=document.createEvent("CustomEvent"),e.initCustomEvent(a,b,c,d)):null!=document.createEventObject?(e=document.createEventObject(),e.eventType=a):e.eventName=a,e}function h(a,b){null!=a.dispatchEvent?a.dispatchEvent(b):b in(null!=a)?a[b]():"on"+b in(null!=a)&&a["on"+b]()}function i(a,b,c){null!=a.addEventListener?a.addEventListener(b,c,!1):null!=a.attachEvent?a.attachEvent("on"+b,c):a[b]=c}function j(a,b,c){null!=a.removeEventListener?a.removeEventListener(b,c,!1):null!=a.detachEvent?a.detachEvent("on"+b,c):delete a[b]}function k(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight}Object.defineProperty(b,"__esModule",{value:!0});var l,m,n=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),o=window.WeakMap||window.MozWeakMap||function(){function a(){c(this,a),this.keys=[],this.values=[]}return n(a,[{key:"get",value:function(a){for(var b=0;b<this.keys.length;b++){var c=this.keys[b];if(c===a)return this.values[b]}}},{key:"set",value:function(a,b){for(var c=0;c<this.keys.length;c++){var d=this.keys[c];if(d===a)return this.values[c]=b,this}return this.keys.push(a),this.values.push(b),this}}]),a}(),p=window.MutationObserver||window.WebkitMutationObserver||window.MozMutationObserver||(m=l=function(){function a(){c(this,a),"undefined"!=typeof console&&null!==console&&(console.warn("MutationObserver is not supported by your browser."),console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content."))}return n(a,[{key:"observe",value:function(){}}]),a}(),l.notSupported=!0,m),q=window.getComputedStyle||function(a){var b=/(\-([a-z]){1})/g;return{getPropertyValue:function(c){"float"===c&&(c="styleFloat"),b.test(c)&&c.replace(b,function(a,b){return b.toUpperCase()});var d=a.currentStyle;return(null!=d?d[c]:void 0)||null}}},r=function(){function a(){var b=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];c(this,a),this.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null,scrollContainer:null,resetAnimation:!0},this.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),this.vendors=["moz","webkit"],this.start=this.start.bind(this),this.resetAnimation=this.resetAnimation.bind(this),this.scrollHandler=this.scrollHandler.bind(this),this.scrollCallback=this.scrollCallback.bind(this),this.scrolled=!0,this.config=e(b,this.defaults),null!=b.scrollContainer&&(this.config.scrollContainer=document.querySelector(b.scrollContainer)),this.animationNameCache=new o,this.wowEvent=g(this.config.boxClass)}return n(a,[{key:"init",value:function(){this.element=window.document.documentElement,d(document.readyState,["interactive","complete"])?this.start():i(document,"DOMContentLoaded",this.start),this.finished=[]}},{key:"start",value:function(){var a=this;if(this.stopped=!1,this.boxes=[].slice.call(this.element.querySelectorAll("."+this.config.boxClass)),this.all=this.boxes.slice(0),this.boxes.length)if(this.disabled())this.resetStyle();else for(var b=0;b<this.boxes.length;b++){var c=this.boxes[b];this.applyStyle(c,!0)}if(this.disabled()||(i(this.config.scrollContainer||window,"scroll",this.scrollHandler),i(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live){var d=new p(function(b){for(var c=0;c<b.length;c++)for(var d=b[c],e=0;e<d.addedNodes.length;e++){var f=d.addedNodes[e];a.doSync(f)}});d.observe(document.body,{childList:!0,subtree:!0})}}},{key:"stop",value:function(){this.stopped=!0,j(this.config.scrollContainer||window,"scroll",this.scrollHandler),j(window,"resize",this.scrollHandler),null!=this.interval&&clearInterval(this.interval)}},{key:"sync",value:function(){p.notSupported&&this.doSync(this.element)}},{key:"doSync",value:function(a){if("undefined"!=typeof a&&null!==a||(a=this.element),1===a.nodeType){a=a.parentNode||a;for(var b=a.querySelectorAll("."+this.config.boxClass),c=0;c<b.length;c++){var e=b[c];d(e,this.all)||(this.boxes.push(e),this.all.push(e),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(e,!0),this.scrolled=!0)}}}},{key:"show",value:function(a){return this.applyStyle(a),a.className=a.className+" "+this.config.animateClass,null!=this.config.callback&&this.config.callback(a),h(a,this.wowEvent),this.config.resetAnimation&&(i(a,"animationend",this.resetAnimation),i(a,"oanimationend",this.resetAnimation),i(a,"webkitAnimationEnd",this.resetAnimation),i(a,"MSAnimationEnd",this.resetAnimation)),a}},{key:"applyStyle",value:function(a,b){var c=this,d=a.getAttribute("data-wow-duration"),e=a.getAttribute("data-wow-delay"),f=a.getAttribute("data-wow-iteration");return this.animate(function(){return c.customStyle(a,b,d,e,f)})}},{key:"resetStyle",value:function(){for(var a=0;a<this.boxes.length;a++){var b=this.boxes[a];b.style.visibility="visible"}}},{key:"resetAnimation",value:function(a){if(a.type.toLowerCase().indexOf("animationend")>=0){var b=a.target||a.srcElement;b.className=b.className.replace(this.config.animateClass,"").trim()}}},{key:"customStyle",value:function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a}},{key:"vendorSet",value:function(a,b){for(var c in b)if(b.hasOwnProperty(c)){var d=b[c];a[""+c]=d;for(var e=0;e<this.vendors.length;e++){var f=this.vendors[e];a[""+f+c.charAt(0).toUpperCase()+c.substr(1)]=d}}}},{key:"vendorCSS",value:function(a,b){for(var c=q(a),d=c.getPropertyCSSValue(b),e=0;e<this.vendors.length;e++){var f=this.vendors[e];d=d||c.getPropertyCSSValue("-"+f+"-"+b)}return d}},{key:"animationName",value:function(a){var b=void 0;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=q(a).getPropertyValue("animation-name")}return"none"===b?"":b}},{key:"cacheAnimationName",value:function(a){return this.animationNameCache.set(a,this.animationName(a))}},{key:"cachedAnimationName",value:function(a){return this.animationNameCache.get(a)}},{key:"scrollHandler",value:function(){this.scrolled=!0}},{key:"scrollCallback",value:function(){if(this.scrolled){this.scrolled=!1;for(var a=[],b=0;b<this.boxes.length;b++){var c=this.boxes[b];if(c){if(this.isVisible(c)){this.show(c);continue}a.push(c)}}this.boxes=a,this.boxes.length||this.config.live||this.stop()}}},{key:"offsetTop",value:function(a){for(;void 0===a.offsetTop;)a=a.parentNode;for(var b=a.offsetTop;a.offsetParent;)a=a.offsetParent,b+=a.offsetTop;return b}},{key:"isVisible",value:function(a){var b=a.getAttribute("data-wow-offset")||this.config.offset,c=this.config.scrollContainer&&this.config.scrollContainer.scrollTop||window.pageYOffset,d=c+Math.min(this.element.clientHeight,k())-b,e=this.offsetTop(a),f=e+a.clientHeight;return d>=e&&f>=c}},{key:"disabled",value:function(){return!this.config.mobile&&f(navigator.userAgent)}}]),a}();b["default"]=r,a.exports=b["default"]});








wow = new WOW(
	{
		animateClass: 'animated',
		offset: 0,
		callback: function(box) {
			console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
		}
	}
);
wow.init();