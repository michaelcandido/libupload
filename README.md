libupload.js
============

A barebones library for performing file uploads without a page reload. Uses the iframe hack so that it is compatible with non-html5 browsers.

This library fills a niche for a dead simple, spiritually AJAX file upload tool that does nothing else and creates no special hoops for the rest of your code. It depends on no other libraries, takes the least amount of responsibility possible, and delegates all customization to the construction of your file upload form. The request to the server will be just as if the form was submitted normally. 

Example:

```html
<html>
  <head>
    <title>Demo</title>
    <script src='/js/libupload.js'></script>
  </head>
  <body>
    <form method='post' enctype='multipart/form-data' action='/file-upload-location'>
      <input type='file' name='file-data' />
      <input type='hidden' name='extra-parameter' value='2' />
    </form>
    <input type='button' id='upload' value='Upload File' />
    <script type='text/javascript'>    
      function onstart(fileMap) {
        alert('filename is ' + fileMap['file-data']);
      }
    
      function oncomplete(response) {
        alert('server response is ' + response);
      }
    
      document.getElementById('upload').onclick = function () {
        libupload.upload(document.forms[0], onstart, oncomplete);
      };
    </script>
  </body>
</html>
```

Tested On: Firefox, Chrome, Android 2.3
