function readPlayers() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "/players", true);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      const players = JSON.parse(xmlhttp.responseText);
      let table = document.createElement('table');

      for (let i = 0; i < players.length; i++) {
        let newRow = document.createElement('tr');
        newRow.appendChild(createCell(players[i].name));
        newRow.appendChild(createCell(players[i].dob));
        newRow.appendChild(createCell(players[i].nationality));
        newRow.appendChild(createCell(players[i].height));
        newRow.appendChild(createCell(players[i].position));
        newRow.appendChild(createCell(players[i].number));
        newRow.appendChild(createCell(players[i].goals));
        newRow.appendChild(createCell(players[i].injured));

        newRow.appendChild(createForm(players[i], 'update'));
        newRow.appendChild(createForm(players[i], 'delete'));

        table.appendChild(newRow);
      }

      document.getElementById("demo").appendChild(table);
    }
    
  }

  function createCell(value) {
    let newCell = document.createElement('td');
    newCell.innerHTML = value;
    return newCell;
  }
}

readPlayers();



function createForm(player, action) {
  let newCell = document.createElement('td');
  let form = document.createElement('form');
  form.method = action == 'delete' ? 'POST' : 'GET';
  form.action = action == 'delete' ? '/deletePlayer' : '/updatePlayer.html';
  

  let input = document.createElement('input');
  input.value = player._id;
  input.type = 'hidden';
  input.name = '_id';
  form.appendChild(input);

 
  input = document.createElement('input');
  input.value = player.name;
  input.type = 'hidden';
  input.name = 'name';
  form.appendChild(input);

  input = document.createElement('input');
  input.value = player.dob;
  input.type = 'hidden';
  input.name = 'dob';
  form.appendChild(input);

  input = document.createElement('input');
  input.value = player.nationality;
  input.type = 'hidden';
  input.name = 'nationality';
  form.appendChild(input);

  input = document.createElement('input');
  input.value = player.height;
  input.type = 'hidden';
  input.name = 'height';
  form.appendChild(input);

  input = document.createElement('input');
  input.value = player.position;
  input.type = 'hidden';
  input.name = 'position';
  form.appendChild(input);

  input = document.createElement('input');
  input.value = player.number;
  input.type = 'hidden';
  input.name = 'number';
  form.appendChild(input);

  input = document.createElement('input');
  input.value = player.goals;
  input.type = 'hidden';
  input.name = 'goals';
  form.appendChild(input);

  input = document.createElement('input');
  input.value = player.injured;
  input.type = 'hidden';
  input.name = 'injured';
  form.appendChild(input);

  input = document.createElement('input');
  input.type = 'submit';
  input.value = action == 'delete' ? 'Delete player' : 'Update player';
  form.appendChild(input);

  newCell.appendChild(form);
  return newCell;
}
