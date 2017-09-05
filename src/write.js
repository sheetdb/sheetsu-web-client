function write(slug_or_url, data, options, successFunction, errorFunction) {
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

  xhr.onreadystatechange = function() {
    if (xhr.readyState > 3 && xhr.status == 201) {
      successFunction(JSON.parse(xhr.responseText));
    } else {
      if (errorFunction != undefined) {
        errorFunction(xhr.responseText);
      }
    }
  }

  xhr.open("POST", sheetsuUrlPost(slug_or_url, options), true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.send(JSON.stringify(data));
}
