
function upload(form, onComplete) {

  var document = fileInput.ownerDocument;

  var iframe = document.createElement('iframe');
  iframe.style.height = 0;
  iframe.style.width = 0;
  iframe.style.border = 'none';
  iframe.name = 'libupload_iframe' + Date.now();

  function onload() {
    if (iframe.removeEventListener)
      iframe.removeEventListener(onload);
    else if (iframe.detachEvent)
      iframe.detachEvent(onload);

    if (iframe.contentDocument)
      var response = iframe.contentDocument.body.innerHTML;
    else if (iframe.contentWindow)
      var response = iframe.contentWindow.document.body.innerHTML;
    else if (iframe.document)
      var response = iframe.document.body.innerHTML;

    if (onComplete)
      onComplete(response);

    setTimeout(function () { iframe.parentNode.removeChild(iframe); }, 0);
  }

  if (iframe.addEventListener)
    iframe.addEventListener('onload', onload);
  else if (iframe.attachEvent)
    iframe.attachEvent('onload', onload);

  form.target = iframe.name;
  document.body.appendChild(iframe);
  form.submit();
}
