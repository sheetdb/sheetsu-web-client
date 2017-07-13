function read(slug_or_url, options, successFunction) {
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

  xhr.onreadystatechange = function() {
    if (xhr.readyState > 3 && xhr.status == 200) {
      successFunction(JSON.parse(xhr.responseText));
    }
  }

  xhr.open("GET", sheetsuUrlGet(slug_or_url, options), true);
  xhr.send();
};
