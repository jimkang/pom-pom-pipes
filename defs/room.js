//var probable = require('probable');
var { Tablenest, r } = require('tablenest');
var tablenest = Tablenest();
//var range = require('d3-array').range;

var roomDef = {
  root: [[1, r({ roomType: r`roomType` })]],
  roomType: [
    [2, { shape: 'room', size: 'small', height: 'short' }],
    [1, { shape: 'room', size: 'small', height: 'tall' }],
    [4, { shape: 'room', size: 'medium', height: 'short' }],
    [1, { shape: 'room', size: 'big', height: 'short' }],
    [1, { shape: 'room', size: 'big', height: 'tall' }],
    [1, { shape: 'pipe', size: 'big', height: 'short' }]
  ]
};

function rollRoom() {
  var roll = tablenest(roomDef);
  return roll();
}

module.exports = rollRoom;
