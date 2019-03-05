function displaySportsDisciplines(xhttp,chapter) {

	handleTop();
		
		
	var parentElement = document.getElementById("main");
	var responseJSON = JSON.parse(xhttp.responseText);
	var sportName;
	var sportsObject = {};
	var listWrapper = createElement('div',false,'listWrapper',false,parentElement);
	
	//news
	//https://newsapi.org/v2/everything?q=sport&sources=bbc-sport,espn,fox-sports,nfl-news,nhl-news,talksport,the-sport-bible&from=2019-02-26&to=2019-02-26&sortBy=publishedAt&apiKey=5a84b774c3c548ffa5adbd507257cf53

	//https://newsapi.org/v2/everything?sources=nfl-news&apiKey=5a84b774c3c548ffa5adbd507257cf53
	var container = createElement('div',false,'container',sportName+'container',listWrapper);
	var el = createElement('div',padString('News',26),'mainListElement',false,container);
	el.onclick = (function(){ return function(){ajaxRequest("https://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php?s="+sportName,displayCountriesForSport,sportName)}})();
	var nr = createElement('div',sportsList['News'],'pageNumber',false,container);
	nr.ontouchstart = (function(sportName) { return function(){createElement('div',sportsList[sportName],false,'bubble',document.getElementById(sportName+'container'));}})(sportName);
	nr.onclick = (function(sportName) { return function(){createElement('div',sportsList[sportName],false,'bubble',document.getElementById(sportName+'container'));ajaxRequest("https://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php?s="+sportName,displayCountriesForSport,sportName)}})(sportName);

	var sportsKeysSorted = sortObectKeys(sportsList);
	for (var c = 0; c<sportsKeysSorted.length; ++c){
		for (var i in responseJSON['sports']){
			sportName = responseJSON['sports'][i]['strSport'], sportID = responseJSON['sports'][i]['idSport'];
			if(sportName == sportsKeysSorted[c]){
			//if(sportName in sportsList){
				var container = createElement('div',false,'container',sportName+'container',listWrapper);
				var el = createElement('div',padString(sportName,26),'mainListElement',false,container);
				el.onclick = (function(sportName){ return function(){ajaxRequest("https://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php?s="+sportName,displayCountriesForSport,sportName)}})(sportName);
				var nr = createElement('div',sportsList[sportName],'pageNumber',false,container);
				nr.ontouchstart = (function(sportName) { return function(){createElement('div',sportsList[sportName],false,'bubble',document.getElementById(sportName+'container'));}})(sportName);
				nr.onclick = (function(sportName) { return function(){createElement('div',sportsList[sportName],false,'bubble',document.getElementById(sportName+'container'));ajaxRequest("https://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php?s="+sportName,displayCountriesForSport,sportName)}})(sportName);
				sportsObject[sportName] = {};
			}
			
		}
	}
	
	localStorage.setItem("sports", JSON.stringify(sportsObject));
	updateHistory("main","main");
} 

function displayCountriesForSport(xhttp,sport){
	
	handleTop(true,0,true,displaySportsDisciplines,true,1,true,ajax_displayCountriesForSportSoccer,ajax_displaySportsDisciplines,sportsList[sport],sport);
	

	var parentElement = document.getElementById("main");
	var responseJSON = JSON.parse(xhttp.responseText);
	var sportsObject = JSON.parse(localStorage.getItem("sports"));
	var obj = sportsObject[sport];
	var listWrapper = createElement('div',false,'listWrapper',false,parentElement);
	var soccerCountriesSorted = sortObectKeys(soccerCountries);
	if (isEmpty(sportsObject[sport])){
		for (var i = 0; i < responseJSON['countrys'].length; i++){
			var country = responseJSON['countrys'][i]['strCountry'], league = responseJSON['countrys'][i]['strLeague'], leagueID = responseJSON['countrys'][i]['idLeague'];
			if(!(country in sportsObject[sport])){
				sportsObject[sport][country] = {};
			}
			sportsObject[sport][country][league] = {id:leagueID};
		}
		localStorage.setItem("sports", JSON.stringify(sportsObject));
	}
	for (var c = 0; c<soccerCountriesSorted.length; ++c){
		for (key in sportsObject[sport]){
			if(soccerCountriesSorted[c] == key){
				var sportCountry = sport+'_'+key;
				var container = createElement('div',false,'container',key+'container',listWrapper);
				var el = createElement('div',padString(key,26),'mainListElement Soccer',false,container);
				el.onclick = (function(sportCountry){ return function(){localStorage.setItem("sportCountry",sportCountry);displayLeaguesInCountryForSport(sportCountry)}})(sportCountry);
				var nr = createElement('div',soccerCountries[key],'pageNumber',false,container);
				nr.ontouchstart = (function(key,sportCountry) { return function(){createElement('div',soccerCountries[key],false,'bubble',document.getElementById(key+'container'))}})(key,sportCountry);
				nr.onclick = (function(key,sportCountry) { return function(){localStorage.setItem("sportCountry",sportCountry);setTimeout(function(){ displayLeaguesInCountryForSport(sportCountry); }, 100);}})(key,sportCountry);
			}		
		}
	}
	updateHistory("main",sport);
}

function displayLeaguesInCountryForSport(sportCountry){
	var parentElement = document.getElementById("main");
	var parentTopElement = document.getElementById("top");
	cleanTop();
	var sport = sportCountry.split('_')[0];
	var country = sportCountry.split('_')[1];
	leftButton.addEventListener('click', function () {
	    leftButton.classList.add("pop");
	    setTimeout(function(){ leftButton.classList.remove("pop"); }, 100);
	});
	leftButton.removeEventListener('click', ajax_displaySportsDisciplines);
	leftButton.addEventListener('click', ajax_displayCountriesForSportSoccer);
	//leftButton.onclick = function() {ajaxRequest("https://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php?s="+sportCountry.split('_')[0], displayCountriesForSport,sportCountry.split('_')[0]);};
	var parentElement = document.getElementById("main");
	var listWrapper = createElement('div',false,'listWrapper',false,parentElement);
	var topElementText = createElement('span',country ,'topElementText medium','topElementText',parentTopElement);
	var sportsObject = JSON.parse(localStorage.getItem("sports"));
	for (key in sportsObject[sport][country]){
		var id = sportsObject[sport][country][key].id;
		var el = createElement('div',key,'mainListElement',false,listWrapper);
		el.onclick = (function(id,key){ return function(){localStorage.setItem("leagueName",key);ajaxRequest("https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?s=1819&l="+id,displayLeague,id ) }})(id,key);
	}
	updateHistory(sportCountry.split('_')[0],sportCountry);
}

function displayLeague(xhttp,leagueID){
	//display table
	cleanTop();
	var parentTopElement = document.getElementById("top");
	leftButton.onclick = function(){displayLeaguesInCountryForSport(localStorage.getItem("sportCountry"));};
	var topElementText = createElement('span',localStorage.getItem("leagueName") ,'topElementText Small','topElementText',parentTopElement);
	var tableElement = document.createElement('div');
	var listWrapper = createElement('div',false,'listWrapper',false,tableElement);
	//apply heading to league table
	var headerPosition = document.createElement('span');
	headerPosition.className = 'teamInLeagueStatistic Position Header';
	var headerTeamName = document.createElement('span');
	headerTeamName.className = 'teamInLeagueName Header';
	var headerGamesPlayed = document.createElement('span');
	headerGamesPlayed.className = 'teamInLeagueStatistic Header';
	headerGamesPlayed.innerHTML = 'MP';
	var headerPlusMinus = document.createElement('span');
	headerPlusMinus.className = 'teamInLeagueStatistic Header';
	headerPlusMinus.innerHTML = '+/-';
	var headerPoints = document.createElement('span');
	headerPoints.className = 'teamInLeagueStatistic Header';
	headerPoints.innerHTML = '&nbsp;Pts';
	tableElement.appendChild(headerPosition);
	tableElement.appendChild(headerTeamName);
	tableElement.appendChild(headerGamesPlayed);
	tableElement.appendChild(headerPlusMinus);
	tableElement.appendChild(headerPoints);
	var listWrapper = createElement('div',false,'listWrapper',false,tableElement);
	var leagueData = JSON.parse(xhttp.responseText);
	var gamesPlayed = []; //to determine the gameweek to be displayed
	for (var i = 0; i<leagueData['table'].length; i++){
		el = document.createElement('div');
		el.setAttribute('dataName','team_'+leagueData['table'][i]['teamid']);
		el0 = document.createElement('span');
		el0.className = 'teamInLeagueStatistic Position';
		el0.innerHTML = i+1;
		el1 = document.createElement('span');
		el1.className = 'teamInLeagueName';
		el1.innerHTML =leagueData['table'][i]['name'];
		el2 = document.createElement('span');
		el2.className = 'teamInLeagueStatistic';
		el2.innerHTML =leagueData['table'][i]['played'];
		gamesPlayed.push(leagueData['table'][i]['played']);
		el3 = document.createElement('span');
		el3.className = 'teamInLeagueStatistic';
		el3.innerHTML =leagueData['table'][i]['goalsfor'];
		el4 = document.createElement('span');
		el4.className = 'teamInLeagueStatistic';
		el4.innerHTML =leagueData['table'][i]['goalsagainst'];
		el5 = document.createElement('span');
		el5.className = 'teamInLeagueStatistic';
		el5.innerHTML =leagueData['table'][i]['goalsdifference'];
		el6 = document.createElement('span');
		el6.className = 'teamInLeagueStatistic';
		el6.innerHTML =leagueData['table'][i]['win'];
		el7 = document.createElement('span');
		el7.className = 'teamInLeagueStatistic';
		el7.innerHTML =leagueData['table'][i]['draw'];
		el8 = document.createElement('span');
		el8.className = 'teamInLeagueStatistic';
		el8.innerHTML =leagueData['table'][i]['loss'];
		el9 = document.createElement('span');
		el9.className = 'teamInLeagueStatistic bold';
		el9.innerHTML =leagueData['table'][i]['total'];
		el.appendChild(el0);
		el.appendChild(el1);
		el.appendChild(el2);
		//el.appendChild(el3);
		//el.appendChild(el4);
		el.appendChild(el5);
		//el.appendChild(el6);
		//el.appendChild(el7);
		//el.appendChild(el8);
		el.appendChild(el9);
		listWrapper.appendChild(el);
		var parentElement = document.getElementById("main");
		parentElement.appendChild(tableElement);
	}

	//display gameweek
	var gameWeek = Math.min(...gamesPlayed) + 1;
	var offset = new Date().getTimezoneOffset();
	retrieveGameWeekForLeague(leagueID,gameWeek);
	history.pushState(leagueID,leagueID,leagueID);
}


function retrieveGameWeekForLeague(leagueID,gameWeek){
	ajaxRequest("https://www.thesportsdb.com/api/v1/json/1/eventsround.php?id="+leagueID+"&r="+gameWeek+"&s=1819",displayGameWeekForLeague,false);
}

function displayGameWeekForLeague(xhttp,irrelevant){
	var parentElement = document.getElementById("main");
	var element =  document.getElementById('gameWeek');
	if (typeof(element) != 'undefined' && element != null){
		element.innerHTML = '';
	}
	else{
		var gameWeekEl = document.createElement('div');
		gameWeekEl.id = 'gameWeek';
		parentElement.appendChild(gameWeekEl);
	}
	var responseJSON = JSON.parse(xhttp.responseText);
	var gameWeekArray = [];
	for (i in responseJSON['events']){
		var dateString =responseJSON['events'][i]['dateEvent'];
		var year = dateString.split('-')[0];
		var month = dateString.split('-')[1];
		var day = dateString.split('-')[2];
		var timeString = responseJSON['events'][i]['strTime'];
		var hour = timeString.split(':')[0];
		var minute = timeString.split(':')[1];
		var dateObject = new Date(year, month, day, hour, minute, 0, 0);
		var newDateObject = new Date(dateObject.getTime() + 120*60000);
		gameWeekArray.push([newDateObject,responseJSON['events'][i]['strHomeTeam'],responseJSON['events'][i]['strAwayTeam']]);
	}
	var sortedGameWeekArray = gameWeekArray.sort(Comparator);
	for (var i = 0; i < sortedGameWeekArray.length; i++){
		var el = document.createElement('div');
		var el0 = document.createElement('span');
		el0.className = 'gameEventDate';
		var el1 = document.createElement('span');
		el1.className = 'gameEventTeam1';
		var el2 = document.createElement('span');
		el2.className = 'gameEventSplit';
		var el3 = document.createElement('span');
		el3.className = 'gameEventTeam2';
		el0.innerHTML = str_pad((sortedGameWeekArray[i][0]).getDate()) + '/' + str_pad((sortedGameWeekArray[i][0]).getMonth()) + '/' + (sortedGameWeekArray[i][0]).getFullYear() + ' - ' + str_pad(sortedGameWeekArray[i][0].getHours()) + ':' + str_pad(sortedGameWeekArray[i][0].getMinutes());
		el1.innerHTML = sortedGameWeekArray[i][1];
		el2.innerHTML = '-';
		el3.innerHTML = sortedGameWeekArray[i][2];
		el.appendChild(el0);
		el.appendChild(el1);
		el.appendChild(el2);
		el.appendChild(el3);
		gameWeekEl.appendChild(el);
	}
}


