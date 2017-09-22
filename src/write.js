function write(slug_or_url, data, options, successFunction) {
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

  xhr.onreadystatechange = function() {
    if (xhr.readyState > 3 && xhr.status == 201) {
      successFunction(JSON.parse(xhr.responseText));
    }
  }

  xhr.open("POST", sheetsuUrlPost(slug_or_url, options), true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.send(JSON.stringify(data));
}

function writeWithPromise(slug_or_url, data, options) {
  return new Promise(function (resolve, reject) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open("POST", sheetsuUrlPost(slug_or_url, options), true);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };

    xhr.setRequestHeader("Accept", "application/vnd.sheetsu.3+json");
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.setRequestHeader("X-User-Agent", "Sheetsu-JS");
    xhr.onerror = function (e) {
      reject(e);
    };

    xhr.send(JSON.stringify(data));
  });
}
