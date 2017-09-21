Sheetsu = {
  read: function(){
    if (arguments.length == 2)
      return readWithPromise.apply(null, arguments);
    return read.apply(null, arguments);
  },
  write: write,
  version: "1.0"
}
