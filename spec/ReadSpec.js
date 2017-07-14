describe("Sheetsu.read", function() {
  var doneFn = jasmine.createSpy("success");

  beforeEach(function() {
    jasmine.Ajax.install();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  describe("it should perform a GET request", function() {
    it("with correct params", function() {
      Sheetsu.read("deadbeef", {}, doneFn);

      expect(jasmine.Ajax.requests.mostRecent().url).toBe("https://sheetsu.com/apis/v1.0/deadbeef");
      expect(jasmine.Ajax.requests.mostRecent().method).toBe("GET");
    });

    it("to correct URL", function() {
      Sheetsu.read("deadbeef69", {}, doneFn);

      expect(jasmine.Ajax.requests.mostRecent().url).toBe("https://sheetsu.com/apis/v1.0/deadbeef69");
      expect(jasmine.Ajax.requests.mostRecent().method).toBe("GET");
    });

    it("should call success function with JSON array", function(){
      jasmine.Ajax.stubRequest("https://sheetsu.com/apis/v1.0/deadbeef69").andReturn({
        "status": 200,
        "contentType": "application/json",
        "responseText": "[{\"TestColumn\":\"A\"},{\"TestColumn\":\"B\"},{\"TestColumn\":\"C\"},{\"TestColumn\":\"D\"}]"
      });

      Sheetsu.read("deadbeef69", {}, doneFn);

      expect(doneFn).toHaveBeenCalledWith([{"TestColumn":"A"},{"TestColumn":"B"},{"TestColumn":"C"},{"TestColumn":"D"}]);
    });

    describe("should perform correct request with options", function(){
      it("sheet", function() {
        Sheetsu.read("deadbeef69", { "sheet": "animals" }, doneFn);

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("https://sheetsu.com/apis/v1.0/deadbeef69/sheets/animals");
        expect(jasmine.Ajax.requests.mostRecent().method).toBe("GET");
      });

      it("limit", function() {
        Sheetsu.read("deadbeef69", { "limit": "3" }, doneFn);

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("https://sheetsu.com/apis/v1.0/deadbeef69?limit=3");
        expect(jasmine.Ajax.requests.mostRecent().method).toBe("GET");
      });

      it("offset", function() {
        Sheetsu.read("deadbeef69", { "offset": "1" }, doneFn);

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("https://sheetsu.com/apis/v1.0/deadbeef69?offset=1");
        expect(jasmine.Ajax.requests.mostRecent().method).toBe("GET");
      });

      it("transposed", function() {
        Sheetsu.read("deadbeef69", { "transposed": "true" }, doneFn);

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("https://sheetsu.com/apis/v1.0/deadbeef69?transposed=true");
        expect(jasmine.Ajax.requests.mostRecent().method).toBe("GET");
      });

      it("limit, offset and transposed", function() {
        Sheetsu.read("deadbeef69", { "limit": "1", "offset": "2", "transposed": "true" }, doneFn);

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("https://sheetsu.com/apis/v1.0/deadbeef69?limit=1&offset=2&transposed=true");
        expect(jasmine.Ajax.requests.mostRecent().method).toBe("GET");
      });

      it("/search", function() {
        Sheetsu.read("deadbeef69", { "search": { "name": "Peter", "score": "43" } }, doneFn);

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("https://sheetsu.com/apis/v1.0/deadbeef69/search?name=Peter&score=43");
        expect(jasmine.Ajax.requests.mostRecent().method).toBe("GET");
      });

      it("/search with offset", function() {
        Sheetsu.read("deadbeef69", { "search": { "name": "Peter", "score": "43" }, "offset": "3" }, doneFn);

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("https://sheetsu.com/apis/v1.0/deadbeef69/search?name=Peter&score=43&offset=3");
        expect(jasmine.Ajax.requests.mostRecent().method).toBe("GET");
      });

      it("/sheets/:sheet + limit + offset + transposed", function() {
        Sheetsu.read("deadbeef69", { "sheet": "animals", "limit": "1", "offset": "2", "transposed": "true" }, doneFn);

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("https://sheetsu.com/apis/v1.0/deadbeef69/sheets/animals?limit=1&offset=2&transposed=true");
        expect(jasmine.Ajax.requests.mostRecent().method).toBe("GET");
      });
    });
  });
});
