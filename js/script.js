function download(links, dir) {
    document.getElementsByName("urls")[0].value = String(links);
    document.getElementsByName("dir")[0].value = String(dir);
    document.getElementById("openPaper").submit();
}

function matchSubstr(metadata, query){
    var flagFound = 0;
    var matches = -1;
    tags = metadata['tags']
    name = metadata['name'];
    name = name.toLowerCase();
    papercode = metadata['papercode'];
    var keywords = query.toLowerCase().split(" ");
    if (query == "") searchAll = true;
    else searchAll=false;
    for (var i=keywords.length - 1; i>=0; i--){
        // skip empty string
        if(keywords[i].length == 0 && searchAll != true) continue;
        // tag match
        for (var j=tags.length - 1; j>=0; j--){
            if(tags[j].includes(keywords[i]))  matches +=1 ;
        }
        // match papercode
        if(papercode.includes(keywords[i])) matches+=1;
        // skip matching articles
        if(keywords[i].length <= 3) continue;

        // substring within name
        if(name.includes(keywords[i])){
            matches += 1;
        }

        // match plurals
        if(name.includes(keywords[i].substring(0, keywords[i].length - 1))){
            matches += 1;
        }

        // Fall back
        if ( name.search(keywords[i].toLowerCase()) != -1 )    {
                matches += 1;
            }

    }
    return matches;
}

function doSearch(year, kind){
    var searchInfo = document.getElementById("searchinfo");
    var query = document.getElementById("search").value.toLowerCase();
    var found = 0;  
    var results = {};    // each index denote each 
    for (var i = 3; i>=0 ;i--)  results[i] = {};
    //kind = ;
    kind = getRadioValue("optradio");

    //retrieve matching papercode
    var matchedPaperCodes = new Array();
    //  external var metadata
    for (var i=metadata.length - 1;i>=0;i--) {
        if ( matchSubstr(metadata[i], query) != -1)
        {
            matchedPaperCodes.push(metadata[i]['papercode']);

            papers = getFiles(metadata[i]['papercode'], {'year':year, 'kind':kind});        //intrinsic contraint check
            for(var key in papers) {
                if( typeof results[(metadata[i]["clg_year"])-1][key] =="undefined" ){
                    results[(metadata[i]["clg_year"])-1][key] = [[i, papers[key]]];
                }
                else results[(metadata[i]["clg_year"])-1][key].push([i, papers[key]] );
            }
        }
    }
   
    var resultboxes = ["searchResults_1", "searchResults_2", "searchResults_3", "searchResults_4"];
    var resultboxesCount = [0, 0, 0, 0]; 
    resultboxes.forEach(truncateHTML);
    //results.forEach(reverseDictionary);
    var i = 0;
    
    // need cleaning HERE
    for (var cYear in results){
        var keys = Object.keys(results[cYear]);
        keys.reverse();
        var k = 0;
        for (var l in results[cYear]){
            key = keys[k];
            for(var j = results[cYear][key].length-1 ; j>=0; j--){
                var paper_name = metadata[results[cYear][key][j][0]]["name"];
                var paper_code = metadata[results[cYear][key][j][0]]["papercode"];
                var paper_kind = Object.keys(results[cYear][key][j][1])[0];
                var paper_dir = fileDir[metadata[results[cYear][key][j][0]]["clg_year"]];
                var paper_link = results[cYear][key][j][1][paper_kind].reverse();
                placeDataToHTML(paper_name, key, paper_code, paper_kind, paper_link, paper_dir, resultboxes[i]);
                resultboxesCount[i] += 1;
            }
            k+=1;
        }
        i+=1;
    }

    var headCount = ["collapse1Count", "collapse2Count", "collapse3Count", "collapse4Count"];
    for (var i = headCount.length-1; i>=0; i--){
        var obj = document.getElementById(headCount[i]);
        obj.innerHTML = '('+resultboxesCount[i]+')';
    }
    found = resultboxesCount.reduce((a, b) => a + b, 0)
    //setting info text
    if(query == ""){
        searchInfo.innerHTML = '<span id="searchinfoText" class="text-auxilary-fade">Showing all files' ;
    }
    else{
        searchInfo.innerHTML = '<span id="searchinfoText" class="text-auxilary-fade">search results for "' + query +'"' ;
    }

    // printing count total
    if(!found){
        searchInfo.innerHTML += '<span class="text-auxilary-fade to-right">No match found</span> \
                                </span>';
    }
    else{
        searchInfo.innerHTML += '<span class="text-auxilary-fade to-right">('+found+') results found</span> \
                                </span>';
    }
}

function populateRecent() {
    var currentDate = new Date();
    var year = currentDate.getFullYear() - 1;
    doSearch(year, "")
    var infoText = document.getElementById("searchinfo");
    infoText.innerHTML = '<span id="searchinfoText" class="text-auxilary-fade">Recent uploads of '+year + '</span>';
    
}

function placeDataToHTML(title, year, code, kind, links, dir, target){
    var searchResults = document.getElementById(target);    
    if(kind == "mid") decoration = '<i class = "glyphicon glyphicon-star-empty"></i>'.repeat(2) + ' Mid sem</span>  ';
    else if (kind == "end") decoration = '<i class = "glyphicon glyphicon-star"></i>'.repeat(3) + ' End sem</span>  ';
    searchResults.innerHTML+='  \
        <div class="card">              \
            <div class="card-body">     \
                <div class="card-head"> \
                        <span>'+code+'</span> \
                        <span class="to-right">'+year+'</span> \
                </div>                  \
                <h3 class="card-title">'+title+'</h3> \
                <span class="card-subtitle mb-2 text-muted">' + decoration +'<button  onclick="download(links = \'' + links +'\', dir =\''+ dir +'\'\
                )" type="button" class="card-link btn btn-default"><i class = "glyphicon glyphicon-download-alt"></i>Download</button> \
                <div class="hidden-lg hidden-md"><br></div> \
            </div> \
        </div> ';
}

function truncateHTML(target){
    var searchResults = document.getElementById(target);    
    searchResults.innerHTML = "";
}

function getRadioValue(name){
    var ele = document.getElementsByName(name); 
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) return (ele[i].value);
    } 
}

// Start screeen work
window.onload = function () {
    populateRecent();

    
// Get the input field
var input = document.getElementById("search");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger
    doSearch(year=0, kind ='')
  }
});
}
