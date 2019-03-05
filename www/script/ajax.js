function ajaxRequest(url, cFunction,chapter) {
	var xhttp;
	xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			cFunction(this,chapter);
		}
		else if (this.readyState == 4){
			alert(this.status);
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}
