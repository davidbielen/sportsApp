function isEmpty(map) {
   for(var key in map) {
     if (map.hasOwnProperty(key)) {
        return false;
     }
   }
   return true;
}

function str_pad(n) {
    return String("00" + n).slice(-2);
}

function Comparator(a, b) {
   if (a[0] < b[0]) return -1;
   if (a[0] > b[0]) return 1;
   return 0;
}
function createElement(type,innerHTML,className,id,parentElement){
	var el = document.createElement(type);
	if(innerHTML){
		el.innerHTML = innerHTML;
	}
	if(className){
		el.className = className;
	}
	if(id){
		el.id = id;
	}
	if(parentElement){
		parentElement.appendChild(el);
	}
	return el;
}

function cleanTop(){
	var parentTopElement2Inner = document.getElementById("topElement2Inner");
	var parentElement = document.getElementById("main");
	parentTopElement2Inner.innerHTML = '';
	parentElement.innerHTML = ';'
}

function updateHistory(oldState,newState){
	history.pushState(oldState,oldState,oldState);
	history.pushState(newState,newState,newState);
}

function sortObectKeys(object){
	keysSorted = Object.keys(object).sort(function(a,b){return object[a]-object[b]});
	return keysSorted;
}

function padString(string,length){
	return string.padEnd(length,'.');
}

function ajaxRequestComplete(parameter1,parameter2,parameter3,functionName,state){
	if (parameter1){
		ajaxRequest(stateToUrlObject[state]+parameter1, functionName,state);
	}
	else{
		ajaxRequest(stateToUrlObject[state], functionName,state);
	}
	return;
}

function createLeftButton(id,content,color,position,pop) {
	if(document.getElementById(id)){
		document.getElementById(id).outerHTML = "";
	}
	var parent = document.getElementById('pagenumber');
	var el = createElement('div',content,'leftArrow '+color,id,false);
	if(pop){
		el.addEventListener('click', function () {
		    el.classList.add("pop");
		    setTimeout(function(){ el.classList.remove("pop"); }, 100);
		});
	}
	parent.insertBefore(el, parent.childNodes[position]);
	return el;
}
var ajax_displaySportsDisciplines = function() {
		ajaxRequestComplete(false,false,false,displaySportsDisciplines,'main');
	};

var ajax_displayCountriesForSportSoccer = function() {
		ajaxRequestComplete('Soccer',false,false,displayCountriesForSport,'Soccer');
	}

function handleTop(
		leftleftButtonActive = false,
		leftleftButtonNumber = 0,
		leftleftButtonBoolean = false,
		leftleftButtonFunction = false,
		leftButtonActive = false,
		leftButtonNumber = 1,
		leftButtonBoolean = false,
		leftButtonRemoveFunction = false,
		leftButtonAddFunction = false,
		topNumberText = '000',
		parentTopElement2InnerText = 'Overview'
	){

	cleanTop();


	/* ### HANDLE LEFT LEFT BUTTON ### */	

		if(leftleftButtonActive == false){
			var leftleftButton = createLeftButton("leftleftArrow","&laquo;",'grey',leftleftButtonNumber,leftleftButtonBoolean);
		}
		else{
			var leftleftButton = createLeftButton("leftleftArrow","&laquo;",'white',leftleftButtonNumber,leftleftButtonBoolean);
			leftleftButton.addEventListener('click', function () {
			    leftleftButton.classList.add("pop");
			    setTimeout(function(){ leftleftButton.classList.remove("pop"); }, 100);
			});
			leftleftButton.addEventListener('click', function () {
				ajaxRequestComplete(false,false,false,leftleftButtonFunction,'main');
			});
		}


	/* ### HANDLE LEFT BUTTON ### */		

		if(leftButtonActive == false){
			var leftButton = createLeftButton("leftArrow","&lsaquo;",'grey',leftButtonNumber,leftButtonBoolean);
		}
		else{
			var leftButton = createLeftButton("leftArrow","&lsaquo;",'white',leftButtonNumber,leftButtonBoolean);
			leftButton.addEventListener('click', function () {
			    leftButton.classList.add("pop");
			    setTimeout(function(){ leftButton.classList.remove("pop"); }, 100);
			});
			leftButton.removeEventListener('click', leftButtonRemoveFunction);
			leftButton.addEventListener('click', leftButtonAddFunction);
		}


	/* ### HANDLE TOP NUMBER ### */

		var topNumberElement = document.getElementById("pagenumberNumber");
		topNumberElement.innerHTML = topNumberText;
	

	/* ### HANDLE TEXT IN RED ### */

		var parentTopElement2Inner = document.getElementById("topElement2Inner");
		var parentTopElement2InnerTextConverted = convertForTopDisplay(parentTopElement2InnerText);
		parentTopElement2Inner.innerHTML = parentTopElement2InnerTextConverted;
		parentTopElement2Inner.className = 'topElement2Inner';
		
}

function convertForTopDisplay(string){
	var wordsArray = string.split(' ');
	var returnString = '';
	var tempWord;
	for(var count = 0; count < wordsArray.length; count++){
		tempWord = wordsArray[count];
		returnString += tempWord.toUpperCase().split('').join(' ')+'\xa0\xa0';
	}
	returnString = returnString.substring(0, returnString.length-2);
	return returnString.substring(0,24);
}





