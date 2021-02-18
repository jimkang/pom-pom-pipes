var handleError = require('handle-error-web');
var wireControls = require('./dom/wire-controls');
var pipesFlow = require('./flows/pipes-flow');
var rollRoom = require('./defs/room');

var rooms = [];

(function go() {
  window.onerror = reportTopLevelError;
  wireControls({ addRoom, rerollRoom });
  pipesFlow({ rooms });
})();

function addRoom() {
  rooms.push(rollRoom(rooms.length));
  pipesFlow({ rooms });
}

function rerollRoom() {}

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}
