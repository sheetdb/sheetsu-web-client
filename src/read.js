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

function readWithPromise(slug_or_url, options) {
  return new Promise(function (resolve, reject) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open("GET", sheetsuUrlGet(slug_or_url, options), true);
    xhr.onload = function () {
      if (xhr.readyState === 4) {
        resolve(JSON.parse(xhr.responseText));
      }
    };

    xhr.setRequestHeader("Accept", "application/vnd.sheetsu.3+json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-User-Agent", "Sheetsu-JS");
    xhr.onerror = function (e) {
      reject(e);
    };

    xhr.send();
  });
}
