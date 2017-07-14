describe("Sheetsu.write", function() {
  var doneFn = jasmine.createSpy("success");

  beforeEach(function() {
    jasmine.Ajax.install();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  describe("a POST request", function() {
    it("should be performed", function() {
      Sheetsu.write("deadbeef69", { "name": "hippo", "sound": "growl" }, {}, doneFn);

      expect(jasmine.Ajax.requests.mostRecent().url).toBe("https://sheetsu.com/apis/v1.0/deadbeef69"); 
      expect(jasmine.Ajax.requests.mostRecent().method).toBe("POST");
      expect(JSON.parse(jasmine.Ajax.requests.mostRecent().params)).toEqual({ "name": "hippo", "sound": "growl" });
    });

    it("should be performed to proper URL", function() {
      Sheetsu.write("https://sheetsu.com/apis/v1.0/deadbeef69", { "name": "hippo", "sound": "growl" }, {}, doneFn);

      expect(jasmine.Ajax.requests.mostRecent().url).toBe("https://sheetsu.com/apis/v1.0/deadbeef69"); 
      expect(jasmine.Ajax.requests.mostRecent().method).toBe("POST");
      expect(JSON.parse(jasmine.Ajax.requests.mostRecent().params)).toEqual({ "name": "hippo", "sound": "growl" });
    });

    it("should perform POST to a worksheet", function() {
      Sheetsu.write("deadbeef69", { "name": "hippo", "sound": "growl" }, { "sheet": "Sheet1" }, doneFn);

      expect(jasmine.Ajax.requests.mostRecent().url).toBe("https://sheetsu.com/apis/v1.0/deadbeef69/sheets/Sheet1"); 
      expect(jasmine.Ajax.requests.mostRecent().method).toBe("POST");
      expect(JSON.parse(jasmine.Ajax.requests.mostRecent().params)).toEqual({ "name": "hippo", "sound": "growl" });
    });

    it("should send a few rows", function() {
      var data = [
        { "name": "hippo", "sound": "growl" },
        { "name": "dog", "sound": "woff" },
        { "name": "cat", "sound": "meow" },
      ];
      Sheetsu.write("https://sheetsu.com/apis/v1.0/deadbeef69", data, {}, doneFn);

      expect(jasmine.Ajax.requests.mostRecent().url).toBe("https://sheetsu.com/apis/v1.0/deadbeef69"); 
      expect(jasmine.Ajax.requests.mostRecent().method).toBe("POST");
      expect(JSON.parse(jasmine.Ajax.requests.mostRecent().params)).toEqual(data);
    });

  });
});
