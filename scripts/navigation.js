// JavaScript Document

//BACK TO TOP BUTTON HANDLER
$(window).on('scroll', function() 
{
	"use strict";
	var height1 = $('header').outerHeight();
	var height2 = $('h1').outerHeight();
	var height3 = $('#TOP_INFO').outerHeight();
	var y = height1 + height2 + height3-30;
	if (y <= $(window).scrollTop()) 
	{
		$('nav').addClass('fix');
		$('#TO_TOP').addClass('show');
	} 
	else 
	{
		$('nav').removeClass('fix');
		$('#TO_TOP').removeClass('show');
	}
});


//HEADING SCROLL HANDLER
$(window).on('scroll', function() 
{
	"use strict";
	var height1 = $('header').outerHeight();
	var height2 = 43;//$('h1').css('padding-top');
	var y = height1 + height2;
	var $h1 = $('h1>span.title');
	//var h1top = $h1.position().top;
	if (y < $(window).scrollTop()) 
	{
		$h1.addClass('fixed');
	} 
	else
	{
		$h1.removeClass('fixed');
	}
});


//BACK TO TOP FUNCTION
$('#TO_TOP').click(function() 
{
	"use strict";
  $('html,body').animate({ scrollTop: 0 });
	$('.list>li.open').each(function()
	{
		var LI = $(this);
		LI.removeClass('open').attr('aria-expanded',false).attr('title',LI.data('title-original'));
	});
	//$('#ACRO_INPUT').val('').focus();
});


//ADD ARROWS TO LIST
$(document).ready(function()
{
	"use strict";
	$('.list>li p').before('<div class="arrow"><span></span><span></span></div>');
});


//ADD CHECKBOXES TO LIST
$(document).ready(function()
{
	"use strict";
	$('.acro').each(function()
	{
		var acroIdN = $(this).parent().attr('id');
		var acroId = acroIdN.slice(0, -1);
		$(this).before('<input type="checkbox" id="'+acroIdN+'_SAVE" value="Save '+acroId+'" title="Save This Acronym">');
	});
});


//REMOVE CLASS WITH BLUR
$('.open').on('click', $('body>*:not(.open)'), function()
{
	"use strict";
	$(this).removeClass('open');
});


//LIST ITEM EXPANDER
$('.list>li[aria-expanded=false]').click(function()
{
	"use strict";
	var LI = $(this);
	var y = LI.is('.open');
	if (y === false)
	{
		LI.data('title-original', LI.attr('title'));
		LI.addClass('open', 300).attr('aria-expanded',true).attr('title',LI.data('title-swap')).find('a').attr('tabindex','0');
	}
	else
	{
		LI.removeClass('open', 300).attr('aria-expanded',false).attr('title',LI.data('title-original')).find('a').attr('tabindex','-1');
	}
});


//LIST ITEM NESTED LINK 
$('.list>li[aria-expanded=false] a').click(function(event)
{
	"use strict";
	event.stopPropagation();
	$(this).parents('li').focus();
});

//LIST ITEM EXPANDER -- KEYBOARD
// ENTER KEY AND SPACEBAR
$('.list>li[aria-expanded=false]').keydown(function(event)
{
	"use strict";
	if (((event.keyCode || event.which) === 13) || ((event.keyCode || event.which) === 32)) 
	{
		var LI = $(this);
		var y = LI.is('.open');
		event.preventDefault();
		if (y === false)
		{
			LI.data('title-original', LI.attr('title'));
			LI.addClass('open', 300).attr('aria-expanded',true).attr('title',LI.data('title-swap')).find('a').attr('tabindex','0');
		}
		else
		{
			LI.removeClass('open', 300).attr('aria-expanded',false).attr('title',LI.data('title-original')).find('a').attr('tabindex','-1');
		}
	}
});

//RIGHT ARROW
$('.list>li[aria-expanded=false]').keydown(function(event)
{
	"use strict";
	if ((event.keyCode || event.which) === 39) 
	{
		var LI = $(this);
		var y = LI.is('.open');
		if (y === false)
		{
			LI.data('title-original', LI.attr('title'));
			LI.addClass('open', 300).attr('aria-expanded',true).attr('title',LI.data('title-swap')).find('a').attr('tabindex','0');
		}
		else
		{
			return false;
		}
	}
});

//LEFT ARROW
$('.list>li[aria-expanded=false]').keydown(function(event)
{
	"use strict";
	if ((event.keyCode || event.which) === 37) 
	{
		var LI = $(this);
		var y = LI.is('.open');
		if (y === false)
		{
			return false;
		}
		else
		{
			LI.removeClass('open', 300).attr('aria-expanded',false).attr('title',LI.data('title-original')).find('a').attr('tabindex','-1');
		}
	}
});


//UP & DOWN ARROW
$('#JUMP li').keydown(function(event)
{ 
	"use strict";
	if ((event.keyCode || event.which) === 40) //DOWN
	{     
		event.preventDefault();
		$(this).removeClass('open');
		if ($(this).is(':last-child'))
		{
			if ($(this).attr('tabindex') === '0')
			{
				var title = $(this).attr('title');
				var titleOrig = title.replace(/Close/,'View More');
				$(this).attr('title',titleOrig).attr('aria-expanded',false);
			}
			if ($(this).parent().next().next().children(':first-child').attr('tabindex') === '0')
			{
				$(this).parent().next().next().children(':first-child').focus();
			}
			else
			{
				$(this).parent().next().next().children(':first-child').addClass('open').focus();
			}
		}
		else
		{
			if ($(this).attr('tabindex') === '0')
			{
				var	titleX = $(this).attr('title');
				var titleOrigX = titleX.replace(/Close/,'View More');
				$(this).attr('title',titleOrigX).attr('aria-expanded',false);
				if ($(this).next('li').attr('tabindex') === '0')
				{
					$(this).next('li').focus();
				}
				else
				{
					$(this).next('li').addClass('open').focus();
				}
			}
			else if ($(this).attr('tabindex') === '-1')
			{
				if ($(this).next('li').attr('tabindex') === '0')
				{
					$(this).next('li').focus();
				}
				else
				{
					$(this).next('li').addClass('open').focus();
				}
			}
		}
		$('html, body').animate({scrollTop: $(this).offset().top+15}, 200, 'swing');
	}
	if ((event.keyCode || event.which) === 38) //UP
	{  
		event.preventDefault();
		$(this).removeClass('open');
		if ($(this).is(':first-child'))
		{
			if ($(this).attr('tabindex') === '0')
			{
				var titleY = $(this).attr('title');
				var titleOrigY = titleY.replace(/Close/,'View More');
				$(this).attr('title',titleOrigY).attr('aria-expanded',false);
			}
			if ($(this).parent().prev().prev().children(':last-child').attr('tabindex') === '0')
			{
				$(this).parent().prev().prev().children(':last-child').focus();
			}
			else
			{
				$(this).parent().prev().prev().children(':last-child').addClass('open').focus();
			}
		}
		else
		{
			if ($(this).attr('tabindex') === '0')
			{
				var	titleZ = $(this).attr('title');
				var titleOrigZ = titleZ.replace(/Close/,'View More');
				$(this).attr('title',titleOrigZ).attr('aria-expanded',false);
				if ($(this).prev('li').attr('tabindex') === '0')
				{
					$(this).prev('li').focus();
				}
				else
				{
					$(this).prev('li').addClass('open').focus();
				}
			}
			else if ($(this).attr('tabindex') === '-1')
			{
				if ($(this).prev('li').attr('tabindex') === '0')
				{
					$(this).prev('li').focus();
				}
				else
				{
					$(this).prev('li').addClass('open').focus();
				}
			}
			$('html, body').animate({scrollTop: $(this).prev().offset().top}, 200, 'swing');
		}
	}
});

$('nav>h2').click(function()
{
	'use strict';
	var height = $('nav').outerHeight();
	if (height < 100)
	{
		$(this).parent().css('height','auto');
	}
	else
	{
		$(this).parent().removeAttr('style');
	}
});

function printCurtain()
{
	'use strict';
	var print = confirm 
	("You are about to print only your selected acronyms. Click 'Cancel' to cancel the print. Click 'OK' to continue."); 
	if (print)
	{
		function printAcro()
		{
			window.print();
		}
		
		setTimeout(printAcro,1000);
	}
	else
	{
		return false; //LEARNER WANTS TO STAY -- HOORAY! DO NOTHING
	}
}
