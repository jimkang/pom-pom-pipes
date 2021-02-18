var { rollDie, shuffle, createTableFromSizes } = require('probable');
var { Tablenest, r } = require('tablenest');
var tablenest = Tablenest();
var cloneDeep = require('lodash.clonedeep');
//var range = require('d3-array').range;

var roomDef = {
  root: [[1, r({ roomType: r`roomType`, exits: [] })]],
  roomType: [
    [2, { shape: 'room', size: 'small', height: 'short' }],
    [1, { shape: 'room', size: 'small', height: 'tall' }],
    [4, { shape: 'room', size: 'medium', height: 'short' }],
    [1, { shape: 'room', size: 'big', height: 'short' }],
    [1, { shape: 'room', size: 'big', height: 'tall' }],
    [1, { shape: 'pipe', size: 'big', height: 'short' }]
  ]
};

var exitPositionDeck = ['north', 'east', 'south', 'west', 'floor'];

var wallExitKindTable = createTableFromSizes([
  [1, 'direct connection'],
  [2, 'pipe, vertical'],
  [1, 'pipe, vertical, with rungs'],
  [2, 'pipe, sloped']
]);
var floorExitKindTable = createTableFromSizes([
  [1, 'direct connection'],
  [3, 'pipe, horizontal'],
  [2, 'pipe, sloped']
]);

var rollTheRoom = tablenest(roomDef);

function rollRoom() {
  var room = cloneDeep(rollTheRoom());
  const exitCount = rollDie(4);
  var positions = shuffle(exitPositionDeck);
  for (var i = 0; i < exitCount; ++i) {
    const position = positions[i];
    let kind;
    if (position === 'floor') {
      kind = floorExitKindTable.roll();
    } else {
      kind = wallExitKindTable.roll();
    }
    room.exits.push({ position, kind });
  }

  return room;
}

module.exports = rollRoom;
