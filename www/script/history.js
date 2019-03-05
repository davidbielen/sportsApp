
window.addEventListener('popstate', function(e) {
	var character = e.state;
	if (character == null || character == 'main') {
		ajaxRequest("https://www.thesportsdb.com/api/v1/json/1/all_sports.php", displaySportsDisciplines);
	} 
	else{
		var sportsObject = JSON.parse(localStorage.getItem("sports"));
		if (character in sportsObject){
			ajaxRequest("https://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php?s="+character, displayCountriesForSport,character);
		}
		else if(character.split('_')[0] in sportsObject){
			displayLeaguesInCountryForSport(character);
		}
		else if(character.split('_')[0] == 'league'){
			leagueID = character.split('_')[1];
			ajaxRequest("https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?s=1819&l="+leagueID,displayLeague,leagueID );
		}
	}
});
