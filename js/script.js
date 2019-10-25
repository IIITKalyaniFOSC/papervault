var data = [
    {
        name : "Mathematics - II ( Probability and Statistics )",
        code : "MA-201",
        fullcode : "B.Tech/CSE/2nd-Sem-M/2018/MA-201",
        time : "1 hour 30 min",
        marks : "30",
        imgs : ["btechcse2ndsemm2018ma201_0.jpg"],
    },

    {
        name : "Digital Electronics",
        code : "EC-201",
        fullcode : "B.Tech/CSE/2nd-Sem-M/2018/EC-201",
        time : "1 hour 30 min",
        marks : "25",
        imgs : ["btechcse2ndsemm2018ec201_0.jpg"],
    },

    {
        name : "Data Structures and Algorithms",
        code : "CS-201",
        fullcode : "B.Tech/CSE/2nd-Sem-M/2018/CS-201",
        time : "1 hour 30 min",
        marks : "30",
        imgs : [ "btechcse2ndsemm2018cs201_0.jpg"],
    },

    {
        name : "Computer Fundamentals and Programming With C",
        code : "CS-201",
        fullcode : "B.Tech/CSE/1st-Sem-M/2017/CS-101",
        time : "1 hour 30 min",
        marks : "30",
        imgs : [ "btechcse1stsemm2017cs101_0.jpg",
                "btechcse1stsemm2017cs101_1.jpg"],
    }
];

function showpaper(id) {
    document.getElementsByName("urls")[0].value = String(data[id].imgs);
    document.getElementById("frmpaper").submit();
}

function matchSubs(data, query){
    var flagFound = 0;
    var matches = -1;

    var keywords = query.split(" ");
    for (var i=keywords.length - 1; i>=0; i--){
        
        // skip matching articles
        if(keywords[i].length <= 3) continue;

        if(data.includes(keywords[i])){
            matches += 1;
        }

        // match plurals
        if(data.includes(keywords[i].substring(0, keywords[i].length - 1))){
            matches += 1;
        }

        // Fall back
        if ( data.search(keywords[i].toLowerCase()) != -1 )    {
                matches += 1;
            }

    }
    return matches
}

function dosearch(all) {
    var resultbox = document.getElementById("resultbox");
    var query = document.getElementById("searchbox").value;
    var found = 0;
    resultbox.innerHTML = "";
    for (var i=data.length - 1;i>=0;i--) {
        if ( matchSubs(data[i].name.toLowerCase(), query) != -1 || all)
        {
            found = 1;
            resultbox.innerHTML += "<div class=\"resultentry\"><strong>" + data[i].name + "</strong><br/>" + data[i].fullcode + "<br/>" + "<button type=\"button\" class=\"btnshowpaper\" onclick=\"showpaper(" + String(i) + ")\">Show Question Paper</button><br/></div>";
        }
    }
    if (!found)
        resultbox.innerHTML = "<div class=\"resultboxheading\">Sorry, found no result for your query <strong>:|</strong></div>";

}

function populaterecent() {
    var resultbox = document.getElementById("resultbox");
    resultbox.innerHTML = "<div class=\"resultboxheading\">Recent Additions</div>";
    for (var i=data.length - 1;i>=Math.max(data.length - 5,0);i--) {
            found = 1;
            resultbox.innerHTML += "<div class=\"resultentry\"><strong>" + data[i].name + "</strong><br/>" + data[i].fullcode + "<br/>" + "<button type=\"button\" class=\"btnshowpaper\" onclick=\"showpaper(" + String(i) + ")\">Show Question Paper</button><br/></div>";
        }
}

//For contributer-result
    var clickCount=0;
    function showresult(){
      if(clickCount==0){
        clickCount = 1;
        document.getElementById("contributer-result").className= "active";
      }
      else{
        clickCount=0;
        document.getElementById("contributer-result").className = "not-active";
      }
    }
window.onload = function () {
    populaterecent();
}
