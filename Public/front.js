function readPlayers() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "/players", true);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      const players = JSON.parse(xmlhttp.responseText);
        // Luodaan taulukko, jossa pelaajat näytetään
      let table = document.createElement('table');
      // Silmukka pelaajien läpikäymiseen
      for (let i = 0; i < players.length; i++) {
        let newRow = document.createElement('tr');
        
        newRow.appendChild(createCell(players[i].name));
        newRow.appendChild(createCell(players[i].nationality));
        newRow.appendChild(createCell(players[i].height));
        newRow.appendChild(createCell(players[i].position));
        newRow.appendChild(createCell(players[i].number));
        newRow.appendChild(createCell(players[i].goals));
        newRow.appendChild(createCell(players[i].injured));
         //Luodaan päivitä-painike
        newRow.appendChild(createForm(players[i], 'update'));
        //Luodaan poista-painike
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
  form.method = (action == 'delete') ? 'POST' : 'GET';
  // Ternääri (ternatry) operaatio, ensimmäinen vaihtoehto true ja jälkimmäinen false. Vertaa IF
  form.action = (action == 'delete') ? '/deletePlayer' : '/updatePlayer.html';
  
//Piilokenttä id:lle
  let input = document.createElement('input');
  input.value = player._id;
  input.type = 'hidden';
  input.name = '_id';
  form.appendChild(input);

 //lisätään pelaajan nimi
  input = document.createElement('input');
  input.value = player.name;
  input.type = 'hidden';
  input.name = 'name';
  form.appendChild(input);


//lisätään pelaajan kansallisuus
  input = document.createElement('input');
  input.value = player.nationality;
  input.type = 'hidden';
  input.name = 'nationality';
  form.appendChild(input);
// lisätään pelaajan pituus
  input = document.createElement('input');
  input.value = player.height;
  input.type = 'hidden';
  input.name = 'height';
  form.appendChild(input);
//lisätään pelaajan pelipaikka
  input = document.createElement('input');
  input.value = player.position;
  input.type = 'hidden';
  input.name = 'position';
  form.appendChild(input);
//lisätään pelaajan pelinumero
  input = document.createElement('input');
  input.value = player.number;
  input.type = 'hidden';
  input.name = 'number';
  form.appendChild(input);
//lisätään pelaajan maalimäärä
  input = document.createElement('input');
  input.value = player.goals;
  input.type = 'hidden';
  input.name = 'goals';
  form.appendChild(input);
//lisätään pelaajan loukkantumistilanne(true=loukkantunut ja false=pelikuntoinen)
  input = document.createElement('input');
  input.value = player.injured;
  input.type = 'hidden';
  input.name = 'injured';
  form.appendChild(input);
//lisätään painike
  input = document.createElement('input');
  input.type = 'submit';
  input.value = action == 'delete' ? 'Delete player' : 'Update player';
  form.appendChild(input);

  newCell.appendChild(form);
  return newCell;
}
