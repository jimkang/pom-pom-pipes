var handleError = require('handle-error-web');
var wireControls = require('./dom/wire-controls');
var pipesFlow = require('./flows/pipes-flow');
var rollRoom = require('./defs/room');

var rooms = [];

(function go() {
  window.onerror = reportTopLevelError;
  wireControls({ addRoom, rerollRoom });
  var serializedRooms = localStorage.getItem('rooms');
  if (serializedRooms) {
    rooms = JSON.parse(serializedRooms);
  }
  pipesFlow({ rooms });
})();

function addRoom() {
  rooms.push(rollRoom(rooms.length));
  pipesFlow({ rooms });
}

function rerollRoom() {
  const index = rooms.length - 1;
  if (index < 0) {
    return;
  }
  rooms[index] = rollRoom(index);
  pipesFlow({ rooms });
}

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}
