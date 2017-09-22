Sheetsu = {
  read: function(){
    if (arguments.length == 2)
      return readWithPromise.apply(null, arguments);
    return read.apply(null, arguments);
  },
  write: function(){
    if (arguments.length == 3)
      return writeWithPromise.apply(null, arguments);
    return write.apply(null, arguments);
  },
  version: "1.0"
}
