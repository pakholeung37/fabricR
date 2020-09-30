// set the fabric famework as a global for tests
global.fabric = require("../dist/fabric.rollup").fabric
global.pixelmatch = require("pixelmatch")
global.fs = require("fs")
global.path = require("path")
global.visualCallback = {
  addArguments: function () {}
}
global.isWin = require("os").platform() === "win32"
global.visualTestLoop = require("./lib/visualTestLoop").visualTestLoop
global.getFixture = require("./lib/visualTestLoop").getFixture
global.getAsset = require("./lib/visualTestLoop").getAsset
global.getAssetName = require("./lib/visualTestLoop").getAssetName
global.simulateEvent = require("./lib/event.simulate").simulateEvent

global.imageDataToChalk = function (imageData) {
  // actually this does not work on travis-ci, so commenting it out
  return ""
}
// make a jsdom version for tests that does not spam too much.
var jsdom = require("jsdom")
class CustomResourceLoader extends jsdom.ResourceLoader {
  fetch(url, options) {
    return super.fetch(url, options).catch(e => {
      console.log("JSDOM CATCHED FETCHING", url)
      throw new Error("JSDOM FETCH CATCHED")
    })
  }
}
