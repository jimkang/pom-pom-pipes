var { rollDie, shuffle, createTableFromSizes } = require('probable');
var { Tablenest, r, d } = require('tablenest');
var tablenest = Tablenest();
var cloneDeep = require('lodash.clonedeep');
//var range = require('d3-array').range;

var roomDef = {
  root: [[1, r({ name: '', roomType: r`roomType`, exits: [], pool: r`pool` })]],
  roomType: [
    [2, { shape: 'room', size: 'small', height: 'short' }],
    [1, { shape: 'room', size: 'small', height: 'tall' }],
    [4, { shape: 'room', size: 'medium', height: 'short' }],
    [1, { shape: 'room', size: 'big', height: 'short' }],
    [1, { shape: 'room', size: 'big', height: 'tall' }],
    [1, { shape: 'pipe', size: 'big', height: 'short' }]
  ],
  pool: r({
    kind: r`poolKind`,
    tileCount: r`poolSize`
  }),
  poolKind: [
    [4, 'none'],
    [3, 'water'],
    [1, 'lava'],
    [2, 'slime'],
    [2, 'bubble wrap']
  ],
  poolSize: [[3, 1], [3, 2], [2, 3], [1, 4]]
};

var exitPositionDeck = ['north', 'east', 'south', 'west', 'floor'];

var wallExitKindTable = createTableFromSizes([
  [1, { kind: 'direct connection' }],
  [2, { kind: 'pipe', orientation: 'vertical' }],
  [1, { kind: 'pipe', orientation: 'vertical', rungs: true }],
  [2, { kind: 'pipe', orientation: 'sloped' }]
]);

var floorExitKindTable = createTableFromSizes([
  [1, { kind: 'direct connection' }],
  [3, { kind: 'pipe', orientation: 'horizontal' }],
  [2, { kind: 'pipe', orientation: 'sloped' }]
]);

var barrierRoll = tablenest({
  root: [
    [2, r({ kind: 'door', lock: r`lock` })],
    [5, { kind: 'none' }],
    [2, r({ kind: 'hatch', DC: d`d8+d12+2` })]
  ],
  lock: [[6, 'none'], [3, 'keyA'], [2, 'keyB'], [1, 'keyC']]
});

var rollTheRoom = tablenest(roomDef);

function rollRoom(name) {
  var room = cloneDeep(rollTheRoom());
  room.name = name;
  const exitCount = rollDie(4);
  var positions = shuffle(exitPositionDeck);
  for (var i = 0; i < exitCount; ++i) {
    const position = positions[i];
    let kindEtc;
    if (position === 'floor') {
      kindEtc = floorExitKindTable.roll();
    } else {
      kindEtc = wallExitKindTable.roll();
    }

    let exit = Object.assign({}, kindEtc, { position });
    exit.barrier = barrierRoll();
    room.exits.push(exit);
  }

  return room;
}

module.exports = rollRoom;
