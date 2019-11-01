/* VERSION 1.0
 * CREATED BY LUNATICMAESTRO
 * 
 * all data file names are to be mentioned in this script 
 * under the variale filesList.
 * 
 * getFiles(papercode)
 * retrives dictionary of all the data file names with papercode.
 * 
 * 
 * TO ADD NEW DATA FILE NAMES:
 *  add comma separated name of file as string in filesList
 * 
 * FUTURE RECOMMENDATION
 *  generate the filesList by listing all the files present
 *  in all the directories.
 * 
 */


var fileDir = {
    1 : "first_year",
    2 : "second_year",
    3 : "third_year",  
    4 : "fourth_year"
};

var filesList = [   
                    "cs101_2017mid_1.jpg",
                    "cs101_2017mid_2.jpg",
                    "cs101_2018mid.jpg",
                    "cs501_2018mid_1.jpg",
                    "cs501_2018mid_2.jpg",
                    
                    "ec201_2018mid.jpg",

                    "hu101_2017mid.jpg",

                    "ma201_2018mid.jpg",

                    "ph101_2017end_1.jpg",
                    "ph101_2017end_2.jpg",
                    "ph101_2019mid.jpg",

];

function getFiles(papercode, constraints){        // take subject code as arg, example : cs101
    var papers = {};    // empty dictionary
    for (var i = filesList.length-1; i>=0; i--){
        if(filesList[i].includes(papercode)){
            var year = filesList[i].substr(6, 4).toString();    // extract year
            var kind = filesList[i].substr(10, 3).toString();   // extracts mid | end | ct1
            var file  = filesList[i];
            // snippet to build structure for paperslinked list in following format
            /*  var papers = 
            * { "2018" : { "mid":  ["1.jpg", "2.jpg",], 
            *              "end":  ["1.jpg", "2.jpg",]} 
            *   "2019" : { "mid":  ["1.jpg", "2.jpg",]}    
            * };
            */
            
            if (constraints['year']>=0){
                if(constraints['year']>0){  // other than 0 means equality check else no year constriant
                    if(constraints['year'] !=year)  continue ;
                }
            }
            else continue;

            if (constraints['kind'].length>0){ // all is empty string
                if(constraints['kind'].includes(kind) == false){  
                    continue ;
                }
            }
            (typeof papers[year] == "undefined") ? 
                papers[year] = {[kind]: [file]} 
                                        :
                                        ((typeof papers[year][kind] == "undefined") ? 
                                            papers[year] = {[kind] : [file]}
                                            :
                                            papers[year][kind].push(file)
                                            );
            
        }
    }
    return papers;
}