var RenderAsNestedList = require('render-as-nested-list');
var renderAsNestedList = RenderAsNestedList({});

function pipesFlow({ floors }) {
  console.log(floors);
  var floorsEl = document.getElementById('floors-root');
  floorsEl.innerHTML = '';

  renderAsNestedList({
    targetListEl: floorsEl,
    name: 'root',
    thing: floors
  });
}

module.exports = pipesFlow;
