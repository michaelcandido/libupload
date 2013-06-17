
var libupload = (function () {

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

  function upload(form, onStart, onComplete) {

    var document = form.ownerDocument, isSubmitted = false;

    function onload() {
      if (!isSubmitted)
        return;
      
      form.reset();
      if (this.removeEventListener)
        this.removeEventListener('load', onload);
      else if (this.detachEvent)
        this.detachEvent(onload);

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

  return {
    upload: upload
  };

})();
