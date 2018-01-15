var sheetsuUrlGet = function(slug_or_url, options) {
  var url = sheetsuUrl(slug_or_url),
      pathQueryString = "",
      limit_offset_transposed = addLimitOffsetTransposed(options);

  if (options["sheet"]) {
    pathQueryString += sheet(options);
  }

  if (options["search"]) {
    pathQueryString += search(options);
  }

  if (limit_offset_transposed != "") {
    if (options["search"]) {
      pathQueryString += ("&" + limit_offset_transposed);
    } else {
      pathQueryString += ("?" + limit_offset_transposed);
    }
  }

  return (url + pathQueryString);
};

var sheetsuUrlPost = function(slug_or_url, options) {
  var url = sheetsuUrl(slug_or_url),
      pathQueryString = "";

  if (options["sheet"]) {
    pathQueryString += sheet(options);
  }

  return (url + pathQueryString);
};

var sheetsuUrl = function(urlOrSlug) {
  if (urlOrSlug.startsWith("https://sheetsu.com/apis/v1.0")) {
    return urlOrSlug;
  } else {
    return ("https://sheetsu.com/apis/v1.0ow/" + urlOrSlug);
  }
};

var search = function(options) {
  var searchQuery = [],
      searchParams = options["search"];

  for (key in searchParams) { searchQuery.push(key + "=" + searchParams[key]); };
  return ("/search?" + searchQuery.join("&"));
};

var sheet = function(options) {
  return ("/sheets/" + options["sheet"]);
};

var addLimitOffsetTransposed = function(options) {
  var queryOptions = [];
  if (options["limit"]) { queryOptions.push("limit=" + options["limit"]); };
  if (options["offset"]) { queryOptions.push("offset=" + options["offset"]); };
  if (options["transposed"]) { queryOptions.push("transposed=" + options["transposed"]); };
  if (options["ignore_case"]) { queryOptions.push("ignore_case=" + options["ignore_case"]); };

  return queryOptions.join("&");
};
