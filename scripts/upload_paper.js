function submitUploadForm(){
   var files = document.getElementById('file').files;
   var commitTitle = "Papervault Automatic Commit";
   var gituser = document.getElementById('gituser').value;
   var gitpassword = document.getElementById('gitpassword').value;
   var newpapername = document.getElementById('newpapername').value;
   var newpapercode = document.getElementById('newpapercode').value;
   var newpaperfullcode = document.getElementById('newpaperfullcode').value;
   var newpapertime = document.getElementById('newpapertime').value;
   var newpapermarks = document.getElementById('newpapermarks').value;
   var sem = document.getElementById('newpapersem').value;
   var newpaperpdf = newpaperfullcode +".jpg";
   
   var config = {
   		username: gituser,
   		password: gitpassword, // Either your password or an authentication token if two-factor authentication is enabled
   		auth: 'basic',
   		repository: 'testrepo',
   		branchName: 'master',
   		mode: 1,   //Mode is 1 for individual or 0 for organization
   		orgname: 'IIITKalyaniFOSC'
	};
   //Construct paper data
	var jsonfullpath = "paperdata/" + sem + ".json";
	var gitHub = new GitHub(config);
	var newpaperdata = {
                		"name" : newpapername,
                		"code" : newpapercode,
                		"fullcode" : newpaperfullcode,
                		"time" : newpapertime,
                		"marks" : newpapermarks,
                		"imgs" : newpaperpdf
            			};
	
   //Upload Paper PDF
   var filepath = "papers/" + newpaperpdf;
   uploadFiles(files, commitTitle, config.branchName, gitHub, filepath)
      .then(function() {
      	 loadJSON(sem).then(function(){
      	 	JSON_stack[0].data.push(newpaperdata);
      	 	var contentstring = JSON.stringify(JSON_stack[0]);
      	 	console.log(contentstring);
      	 	gitHub.saveFile({
                     repository: gitHub.repository,
                     branchName: config.branchName,
                     filename: jsonfullpath,
                     content: contentstring,
                     commitTitle: commitTitle
                  });
      	 	})
      	 	.catch(function(err) {
         console.error(err);
         alert('Something went wrong. Please, try again.');
      });
         alert('Your file has been saved correctly.');
      })
      .catch(function(err) {
         console.error(err);
         alert('Something went wrong. Please, try again.');
      });
    	  
							                  
}




function GitHub(config) {
   var gitHubApi = new Github({
      username: config.username,
      password: config.password,
      auth: config.auth
   });
   if (config.mode == 1)	{
    this.repository = gitHubApi.getRepo(config.username, config.repository);
   }
   
   else if (config.mode == 0) {
    this.repository = gitHubApi.getRepo(config.orgname, config.repository);
   } 
   
   else {
    console.error('Mode is not correct. Check mode');
   }
}

GitHub.prototype.saveFile = function(data) {
   return new Promise(function(resolve, reject) {
      data.repository.write(
         data.branchName,
         data.filename,
         data.content,
         data.commitTitle,
         function(err) {
            if (err) {
               reject(err);
            } else {
               resolve(data.repository);
            }
         }
      );
   });
};



function readFile(file) {
   return new Promise(function (resolve, reject) {
      var fileReader = new FileReader();

      fileReader.addEventListener('load', function (event) {
         var content = event.target.result;

         // Strip out the information about the mime type of the file and the encoding
         content = atob(content.replace(/^(.+,)/, ''));

         resolve({
            filename: file.name,
            content: content
         });
      });

      fileReader.addEventListener('error', function (error) {
         reject(error);
      });

      fileReader.readAsDataURL(file);
   });
}


function uploadFiles(files, commitTitle, branchName, gitHub, filepath) {
   // Creates an array of Promises resolved when the content
   // of the file provided is read successfully.
   var filesPromises = [].map.call(files, readFile);

   return Promise
      .all(filesPromises)
      .then(function(files) {
         return files.reduce(
            function(promise, file) {
               return promise.then(function() {
                  // Upload the file on GitHub
                  return gitHub.saveFile({
                     repository: gitHub.repository,
                     branchName: branchName,
                     filename: filepath,
                     content: file.content,
                     commitTitle: commitTitle
                  });
               });
            },
            Promise.resolve()
         );
      });
}


