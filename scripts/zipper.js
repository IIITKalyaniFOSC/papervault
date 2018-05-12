var fileurls = [];
var zipname = "Papervaultzip";


function zipdown(fileurls,zipname) {
  var zip = new JSZip();
  var count = 0;
  var name = zipname+".zip";
  fileurls.forEach(function(url){
    JSZipUtils.getBinaryContent(url, function (err, data) {
      if(err) {
         throw err; 
      }
       zip.file(url, data,  {binary:true});
       count++;
       if (count == fileurls.length) {
         zip.generateAsync({type:'blob'}).then(function(content) {
            saveAs(content, name);
         });
       }
      });
  });
}
