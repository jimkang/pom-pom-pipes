var listenersInit = false;

var addButton = document.getElementById('add-button');
var rerollButton = document.getElementById('reroll-button');

function wireControls({ addRoom, rerollRoom }) {
  if (listenersInit) {
    return;
  }
  listenersInit = true;

  addButton.addEventListener('click', addRoom);
  rerollButton.addEventListener('click', rerollRoom);
}

module.exports = wireControls;
