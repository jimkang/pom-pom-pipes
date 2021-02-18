var RenderAsNestedList = require('render-as-nested-list');
var renderAsNestedList = RenderAsNestedList({});

function pipesFlow({ rooms }) {
  var roomsEl = document.getElementById('rooms-root');
  roomsEl.innerHTML = '';

  localStorage.setItem('rooms', JSON.stringify(rooms));
  renderAsNestedList({
    targetListEl: roomsEl,
    name: 'root',
    thing: rooms
  });
}

module.exports = pipesFlow;
