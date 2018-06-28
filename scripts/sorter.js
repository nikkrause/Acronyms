//CLEAR SEARCH FIELD IF MORE THAN 2 CHARACTERS ALREADY INPUT
$('#ACRO_INPUT').on('focus', function()
{
	"use strict";
	/*if ($(this).val().length > 1)
	{
		$(this).val('');	
	}*/
});

//FIND THE ACRONYM OR RETURN ERROR
$('#SEARCH>button').click(function()
{
	"use strict";
	var $value = $('#ACRO_INPUT').val();
	var v = $value.replace(/ /, '').replace(/-/, '').replace(/\./, '').replace(/,/, '').replace(/_/, '').toUpperCase();
	if (v === 'CEUS')
	{
		v = 'CEU';
	}
	var v1 = v+'1';
	var v2 = v+'2';
	var v3 = v+'3';
	var v4 = v+'4';
	var v5 = v+'5';
	var vTarget = $('.list #'+v1);
	
	var height1 = 45;
	if ($(window).scrollTop() <= 0)
	{
		height1 = 80;	
	}
	var height2 = $('#NAV_TRIO').outerHeight(true);
	var height3 = height1 + height2;
	var height4 = (height1 + height2 + height3)-29;
	
	var position = $('html,body').scrollTop();
	
	var arrayID = [];
	$('#SEARCH').removeClass('error');
	$('#ERROR_NOTICE').html('').attr('aria-expanded',false);
	$('.list li>h3').each(function() 
	{
    var id = $(this).attr('id');
    arrayID.push(id);
	});
	//alert(''+v1+'');
	//alert(JSON.stringify(arrayID));
	if ((v === 'A')||(v === 'B')||(v === 'C')||(v === 'D')||(v === 'E')||(v === 'F')||(v === 'G')||(v === 'H')||(v === 'I')||(v === 'J')||(v === 'K')||(v === 'L')||(v === 'M')||(v === 'N')||(v === 'O')||(v === 'P')||(v === 'Q')||(v === 'R')||(v === 'S')||(v === 'T')||(v === 'U')||(v === 'V')||(v === 'W')||(v === 'X')||(v === 'Y')||(v === 'Z'))
	{
		closeLIS();
		var $target = $('#'+v+'_LIST li:first-child');
		
		if ($(window).width() >= 1000) //FULL SIZE ALPHA CLICK
		{
			$('html, body').animate({scrollTop: $('#'+v+'_JUMP').offset().top-height1}, 800);
		}
		
		else if (($(window).width() < 1000) && (position < 100)) //MID SIZE ALPHA CLICK TOP OF PAGE
		{
			$('html, body').animate({scrollTop: $('#'+v+'_JUMP').offset().top-height4}, 800);
		}
		
		else //MID SIZE ALPHA CLICK ALREADY SCROLLED
		{
			$('html, body').animate({scrollTop: $('#'+v+'_JUMP').offset().top-height3}, 800);
		}
		
		if ($target.attr('tabindex') === '0')
		{
			$target.focus();
		}
		else
		{
			$target.addClass('open').focus();
		}
	}
	else if ($.inArray(v1, arrayID) !== -1)
	{
		closeLIS();
		$('#'+v1).parent().data('title-original', $('#'+v1).parent().attr('title'));
		$('#'+v2).parent().data('title-original', $('#'+v2).parent().attr('title'));
		$('#'+v3).parent().data('title-original', $('#'+v3).parent().attr('title'));
		$('#'+v4).parent().data('title-original', $('#'+v4).parent().attr('title'));
		$('#'+v5).parent().data('title-original', $('#'+v5).parent().attr('title'));
		
		if ($(window).width() >= 1000) //FULL SIZE ALPHA CLICK
		{
			$('html, body').animate({scrollTop: vTarget.offset().top-(height1 + 15)}, 800);
		}
		
		else if (($(window).width() < 1000) && (position < 100)) //MID SIZE ALPHA CLICK TOP OF PAGE
		{
			$('html, body').animate({scrollTop: vTarget.offset().top-(height4 + 15)}, 800);
		}
		
		else //MID SIZE ALPHA CLICK ALREADY SCROLLED
		{
			$('html, body').animate({scrollTop: vTarget.offset().top-(height3 + 15)}, 800);
		}
		
		$('#'+v1).parent().focus().addClass('open').attr('title',$('#'+v1).parent().data('title-swap')).find('a').attr('tabindex','0');
		$('#'+v2).parent().addClass('open').attr('title',$('#'+v2).parent().data('title-swap')).find('a').attr('tabindex','0');
		$('#'+v3).parent().addClass('open').attr('title',$('#'+v3).parent().data('title-swap')).find('a').attr('tabindex','0');
		$('#'+v4).parent().addClass('open').attr('title',$('#'+v4).parent().data('title-swap')).find('a').attr('tabindex','0');
		$('#'+v5).parent().addClass('open').attr('title',$('#'+v5).parent().data('title-swap')).find('a').attr('tabindex','0');
	}
	else
	{
		$value = $value.toUpperCase();
		$('#SEARCH').addClass('error').focus();
		$('#ERROR_NOTICE').html('<strong>\''+$value+'\'</strong> is not in this list. <br>Enter a different acronym.').attr('aria-expanded',true);
	}
});


//JUMP MENU LIST ITEM CLOSE
function closeLIS()
{
	"use strict";
	var LIS = $('.list li.open');
	LIS.each(function()
	{
		var LI = $(this);
		LI.removeClass('open').attr('aria-expanded',false).attr('title',LI.data('title-original')).find('a').attr('tabindex','-1');
	});
}


//JUMP MENU HANDLER
function jumpTo(letter)
{
	"use strict"; 
	$('#ACRO_INPUT').val(letter);
	$('#SEARCH>button').click();
	$('#ACRO_INPUT').val('');
}


//ENTER PRESS HANDLER
$('#ACRO_INPUT').keydown(function(event)
{ 
	"use strict";
	if ((event.keyCode || event.which) === 13) //ENTER
	{
		$('#SEARCH>button').click();
	}
});

