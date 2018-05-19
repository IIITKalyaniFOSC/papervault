var data = [];
var queue = [];
var JSON_stack = [];        
        
function showpaper(id) {
    document.getElementsByName("urls")[0].value = String(data[id].imgs);
    document.getElementById("frmpaper").submit();
}
        
function dosearch(all) {
    var resultbox = document.getElementById("resultbox");
    var query = document.getElementById("searchbox").value;
    var found = 0;
    resultbox.className = "mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet mdl-card mdl-shadow--2dp";
    resultbox.innerHTML = "<div class=\"mdl-card__title mdl-color--green-500 mdl-card--expand\"><h2 class=\"mdl-card__title-text mdl-color-text--white\">Search Results</h2></div>";
    for (var i=data.length - 1;i>=0;i--) {
        if ( data[i].name.toLowerCase().search(query.toLowerCase()) != -1 || all)
        {
            found = 1;
                resultbox.innerHTML +="<div class=\"mdl-card__supporting-text\"><h6>" + data[i].name + "</h6><br>" + data[i].fullcode +"</div><div class=\"mdl-card__actions\"><a class=\"mdl-button mdl-button--icon mdl-button--colored mdl-js-button mdl-js-ripple-effect\" onclick=\"showpaper(" + String(i) + ")\"><i class=\"material-icons\">remove_red_eye</i></a><a class=\"mdl-button mdl-button--icon mdl-button--colored mdl-js-button mdl-js-ripple-effect\"><i class=\"material-icons\">save_alt</i></a><a class=\"mdl-button mdl-button--icon mdl-button--colored mdl-js-button mdl-js-ripple-effect\" onclick=\"populatequeue(" + String(i) + ")\"><i class=\"material-icons\">playlist_add</i></a>";
        }
    }
    if (!found){
    	resultbox.className = "mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet mdl-card mdl-shadow--2dp mdl-color--red";
        resultbox.innerHTML = "<div class=\"mdl-card__title mdl-color-text--white mdl-card--expand\"><h4>Sorry. No results found.</h4></div>";
        }
            
}        
                
function populaterecent() {
            var resultbox = document.getElementById("resultbox");
            resultbox.innerHTML ="<div class=\"mdl-card__title mdl-color--green-500 mdl-card--expand\"><h2 class=\"mdl-card__title-text mdl-color-text--white\">Recent Uploads</h2></div>";
            for (var i=data.length - 1;i>=Math.max(data.length - 5,0);i--) {
            resultbox.innerHTML +="<div class=\"mdl-card__supporting-text\"><h6>" + data[i].name + "</h6><br>" + data[i].fullcode +"</div><div class=\"mdl-card__actions\"><a class=\"mdl-button mdl-button--icon mdl-button--colored mdl-js-button mdl-js-ripple-effect\" onclick=\"showpaper(" + String(i) + ")\"><i class=\"material-icons\">remove_red_eye</i></a><a class=\"mdl-button mdl-button--icon mdl-button--colored mdl-js-button mdl-js-ripple-effect\"><i class=\"material-icons\">save_alt</i></a><a class=\"mdl-button mdl-button--icon mdl-button--colored mdl-js-button mdl-js-ripple-effect\" onclick=\"populatequeue(" + String(i) + ")\"><i class=\"material-icons\">playlist_add</i></a>";
            }
        }

function populatequeue(n) {
	var downqueue = document.getElementById("downqueue");
	var inqueue=0;
	if(queue.length >0)
	{		

		 for (var j=queue.length - 1;j>=0;j--)
		 	{
		 	 if (queue[j].search(String(n)) != -1)
		 	 	{
		 	 	 inqueue=1;
		 	 	}	
			}
		 if (!inqueue){
		 		 queue.push(String(n));			 	 	 
            	 downqueue.innerHTML +="<div class=\"mdl-grid\"><div class=\"section__circle-container mdl-cell mdl-cell--2-col mdl-cell--1-col-phone\"><div class=\"section__circle-container__circle mdl-color--primary\"></div></div><div class=\"mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone\"><h5>" + data[n].name + "</h5>" + data[n].fullcode +"</div></div>";
		 
		 }	
			 
	}
	else
	{
				 queue.push(String(n));	
            	 downqueue.innerHTML +="<div class=\"mdl-grid\"><div class=\"section__circle-container mdl-cell mdl-cell--2-col mdl-cell--1-col-phone\"><div class=\"section__circle-container__circle mdl-color--primary\"></div></div><div class=\"mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone\"><h5>" + data[n].name + "</h5>" + data[n].fullcode +"</div></div>";
		
	}		          
}        

function catchJSON(i,callback) {   
   var jsonfullpath ="paperdata/"+ i + ".json";
   var xobj = new XMLHttpRequest();
   var check = 0;
   xobj.overrideMimeType("application/json");
   xobj.open('GET', jsonfullpath, true); // Replace 'my_data' with the path to your file
   xobj.onreadystatechange = function () {
         if (xobj.readyState == 4 && xobj.status == "200") {
           // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
           callback(xobj.responseText);
         }
   };
   xobj.send(null);
} 

function loadJSON(i){
	return new Promise(function(resolve,reject){
		catchJSON(i,function(called){
			var temp = JSON.parse(called);
			var check =0;
			JSON_stack.push(temp);
			check = 1;
			if (check == 1){
				resolve(i);
			}
			else {
				reject("Error handling JSON data " + i + ".json");
			}
		});
	});


}
 
function populatezip() {
		for (var k=queue.length - 1;k>=0;k--)
		{
		var temp="papers/";
		temp +=String(data[queue[k]].imgs);
		fileurls.push(temp);
		}
		zipdown(fileurls,zipname);

} 
 
function populatedata() {
var seeder = [1,2,3,4,5,6,7,8];
var JSONpromises = seeder.map(loadJSON);
Promise.all(JSONpromises).then(function(){
for(var i=0; i<= JSON_stack.length -1; i++)
	{
	 for (var j=0; j<= JSON_stack[i].data.length -1; j++)
	 	{
	 	 data.push(JSON_stack[i].data[j]);
	 	}
	}
JSON_stack=[];
populaterecent();	
});	
		
} 
        
window.onload = function () {
			populatedata();
			
        }    
       
