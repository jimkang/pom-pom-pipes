var handleError = require('handle-error-web');
var wireControls = require('./dom/wire-controls');
var pipesFlow = require('./flows/pipes-flow');
var rollRoom = require('./defs/room');

var floors = [];

(function go() {
  window.onerror = reportTopLevelError;
  wireControls({ addRoom, rerollRoom });
  pipesFlow({ floors });
})();

function addRoom() {
  var floor = [];
  if (floors.length > 0) {
    floors[floor.length - 1];
  }
  floors.push(rollRoom());
  pipesFlow({ floors });
}

function rerollRoom() {}

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}
