$(document).ready(function(){
	setTimeout(function(){
		getData();	
	},200);
	$('.error a.close').click(function(e){
		e.preventDefault();
		$(this).closest('.error').cssfadeout(function(){
			$('.loading').cssfadein(function(){
				getData();	
			});
		});
	});
});

function getData(){
	$.ajax(
		'http://genome.klick.com/api/User?ForAutocompleter=true&Enabled=true&IsNotAPerson=false&format=JSON',
		{
			xhrFields: {
				withCredentials: true 
			},
			success : function(data){
				console.log(data);
			},
			error : function(){
				$('.loading').cssfadeout(function(){
					$('.error').cssfadein();
				});
			}
		}
	);
}


var allKnowledge = [];
var viewedIds = [];
var bannedIds = [23906];

function dataLoadedRoutines(data){
	var entries = data["Entries"];
	for(var i=0; i<entries.length; i++){
		var cardcontent = entries[i]["Content"].replace("#KLSMorningKnowledge","").replace(" - ","");

		var img = "bg-about.jpg";
		if(entries[i]["GenomeMedia"].length > 0){
			img = "http://genome.klick.com"+entries[i]["GenomeMedia"][0]["FullsizeImagePath"];
		}

		var link = "http://genome.klick.com/tools/chatter/wide?chatFilter="+entries[i]["ChatterID"];

		var id = entries[i]["ChatterID"];

		allKnowledge.push({
			"text" : cardcontent,
			"img"  : img,
			"link" : link,
			"id"   : id
		});
	}

	for(var i=0; i<bannedIds.length; i++){
		for(var j=0; j<allKnowledge.length; j++){
			if(bannedIds[i] == allKnowledge[j].id){
				allKnowledge.splice(j,1);
				break;
			}
		}	
	}
	

	$('.loading').cssfadeout(function(){
		$('.intro').cssfadein();
	});

	$('a.randomcard').click(function(e){
		e.preventDefault();
		showRandomCard();
	});

	$('a.close').click(function(e){
		e.preventDefault();
		$(this).closest('.cardcontainer').removeClass('active');
	});

	$('a.next').click(function(e){
		e.preventDefault();
		$("#card").cssfadeout(function(){
			showRandomCard();
		});
	});
}

function showRandomCard(){
	if(allKnowledge.length == viewedIds.length){
		return false;
	}
	var idToChoose = false;
	//choose random id
	while(idToChoose == false){
		var testid = Math.round(Math.random()*allKnowledge.length);
		var duplicateCard = false;
		for(var i=0; i<viewedIds.length; i++){
			if(viewedIds[i] == testid){
				//try again
				duplicateCard = true;
				break;
			}
		}

		if(!duplicateCard){
			viewedIds.push(testid);
			idToChoose = testid;
		}
	}

	var thecard = $("#card");

	thecard.find('p').html(allKnowledge[idToChoose].text);
	thecard.find('.bgtarget').css('background-image','url('+allKnowledge[idToChoose].img+')');
	thecard.find('.source').attr('href',allKnowledge[idToChoose].link);
	thecard.cssfadein();
}


$.fn.cssfadeout = function(callback){
	$(this).each(function(i,ele){
		$(ele).removeClass('active');
		setTimeout(function(){
			$(ele).removeClass('primer');
		},550);
	});

	if(typeof(callback)!='undefined'){
		setTimeout(function(){
			callback();
		},550);
	}
	return $(this);
}


$.fn.cssfadein = function(callback){
	$(this).each(function(i,ele){
		$(ele).addClass('primer');
		setTimeout(function(){
			$(ele).addClass('active');	
		},100);
	});
	if(typeof(callback)!='undefined'){
		setTimeout(function(){
			callback();
		},550);
	}
	return $(this);
}