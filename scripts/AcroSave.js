// JavaScript Document

$(document).on('change', 'input:checkbox', function()
{
	"use strict";
	var acroChecked = $(this).is(':checked');
	var acroNameN = $(this).attr('id').replace(/_SAVE/,'');
	var acroInfo = $('#'+acroNameN+'').parent().html();
	var acroName = acroNameN.slice(0, -1);
	var saveThis = '<button type="button" title="View '+acroName+' Information" id="'+acroNameN+'">'+acroName+'</button>';
	if(acroChecked)
	{
		$('#BANK').append(saveThis); //SAVE
		
		$('#CURTAIN>div').append('<div>'+acroInfo+'<button type="button" class="removeAcro" title="Remove This Acronym From My List">X</button></div>');
		if ($('#BANK>button').length === 1)
		{
			$('#BANK>p').append('<span><br>Click an acronym below for more information</span>');
		}
	}
	else
	{
		$('#'+acroNameN).remove(); //UNSAVE
		$('#CURTAIN h3#'+acroNameN).parent().remove(); //REMOVE FROM LIST
		if ($('#BANK>button').length === 0)
		{
			$('#BANK>p>span').remove();
		}
	}
});

//OPEN BANKED ITEMS
$(document).on('click', '#BANK>button', function()
{
	"use strict";
	$('body').addClass('curtainPrint', function()
	{
		$('#CURTAIN').attr('aria-hidden',false);
	});
});

//REMOVE BANKED ITEM FROM LIST
$(document).on('click', '.removeAcro', function()
{
	"use strict";
	var removeMe = $(this).siblings('h3').attr('id');
	$('#BANK>#'+removeMe).remove();
	$('.list h3#'+removeMe+'>input').attr('checked',false);
	$(this).parent().remove();
	if ($('#BANK>button').length === 0)
	{
		$('#BANK>p>span').remove();
	}
});


$('#CLOSE_LIST').click(function()
{
	"use strict";
	$('#CURTAIN').attr('aria-hidden', true);
	$('body').removeClass('curtainPrint');
	$('#PRINT_LIST').removeAttr('style');
});