/**
 * libupload.js
 *
 * A barebones library for performing file uploads without a page
 * reload. Uses the iframe hack so that it is compatible with
 * non-html5 browsers.
 *
 * @module libupload
 * @copyright Michael Candido 2013
 */
(function (factory) {
  
  if (typeof define === 'function' && define.amd)
    define([], factory);
  else
    this.libupload = factory();

})(function () {

  function createIframe(document) {
    var iframe = document.createElement('iframe');
    iframe.style.height = 0;
    iframe.style.width = 0;
    iframe.style.border = 'none';
    iframe.name = 'libupload_iframe' + Date.now();
    return iframe;
  }

  function formFileNames(form) {
    var fileMap = {};
    for (var i = 0; i < form.elements.length; i++) {
      var input = form.elements[i];
      if (input.type == 'file' && input.name)
        fileMap[input.name] = input.value;
    }
    return fileMap;
  }

  /**
   * Asynchronously submit a form with file inputs and fetch the
   * server response.
   *
   * @param {HTMLFormElement} form   the form to submit
   * @param {function} onStart       called with a map of input
   *                                 names to file names when
   *                                 starting the upload
   * @param {function} onComplete    called with the server
   *                                 response when the upload has
   *                                 completed
   */
  function upload(form, onStart, onComplete) {

    var document = form.ownerDocument, isSubmitted = false;

    function onload() {
      // some browsers fire load upon adding the iframe to the
      // document
      if (!isSubmitted)
        return;
      
      form.reset();

      var response = this.contentDocument.body.innerHTML;
      if (onComplete)
        onComplete(response);
      
      this.parentNode.removeChild(this);
    }

    var iframe = createIframe(document);
    iframe.onload = onload;
    form.target = iframe.name;

    if (onStart)
      onStart(formFileNames(form));

    document.body.appendChild(iframe);
    form.submit();
    isSubmitted = true;
  }

  return { upload: upload };

});
