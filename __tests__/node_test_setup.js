// set the fabric famework as a global for tests
const fabric = require("../dist/fabric.rollup").fabric
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
var jsdom = require("jsdom")
// make a jsdom version for tests that does not spam too much.
class CustomResourceLoader extends jsdom.ResourceLoader {
  fetch(url, options) {
    return super.fetch(url, options).catch(e => {
      console.log("JSDOM CATCHED FETCHING", url)
      throw new Error("JSDOM FETCH CATCHED")
    })
  }
}

var jsdom = require("jsdom")
var virtualWindow = new jsdom.JSDOM(
  decodeURIComponent(
    "%3C!DOCTYPE%20html%3E%3Chtml%3E%3Chead%3E%3C%2Fhead%3E%3Cbody%3E%3C%2Fbody%3E%3C%2Fhtml%3E"
  ),
  {
    features: {
      FetchExternalResources: ["img"]
    },
    resources: new CustomResourceLoader()
  }
).window
fabric.document = virtualWindow.document
fabric.jsdomImplForWrapper = require("jsdom/lib/jsdom/living/generated/utils").implForWrapper
fabric.nodeCanvas = require("jsdom/lib/jsdom/utils").Canvas
fabric.window = virtualWindow
