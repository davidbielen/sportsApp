

window.onload = function(e){
	var leftleftButton = createLeftButton("leftleftArrow","&laquo;","grey",0,false);
	var leftButton = createLeftButton("leftArrow","&lsaquo;","grey",1,false);	
	
	ajaxRequest("https://www.thesportsdb.com/api/v1/json/1/all_sports.php", displaySportsDisciplines,'main');
	FastClick.attach(document.body);
}
    




