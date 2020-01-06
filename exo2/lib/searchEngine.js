$(document).ready(function () {

  let api_url = 'https://pokeapi.co/api/v2/';

  function generateLvSelectEl(el) {
    let selectEl = '<form><select name="niveau" id="niveau">' +
      '<option value="">Sélectionner niveau 1-100</option>';

    for (let i = 1; i <= 100; i++) {
      selectEl += '<option value="' + i + '">Niveau ' + i + '</option>';
    }

    selectEl += '</select></form>';

    $(el).append(selectEl);
  }


  function calculateStat(data, lvl=1) {
    console.log('lvl: '+ lvl);
    if (!(lvl == null || lvl == undefined || lvl == 0 || lvl =='') ) {
      let stats = [];
      let stat = null;
      for (let i = 0; i < data.stats.length; i++) {

        if (data.stats[i].stat.name == 'hp') {
          stat = Math.floor(2 * data.stats[i].base_stat + data.base_experience * lvl /100 + lvl + 10);
        } else {
          stat = Math.floor((2 * data.stats[i].base_stat + data.base_experience) * lvl /100 + 5);

        }
        stats.push({
          'name': data.stats[i].stat.name,
          'val': stat
        });

      }
      console.log(stats);
     let newStatsEl= '<div id="stats-'+data.name+ '">' +
      '<span class="stat-level">Stats au niveau ' + lvl+'</span><br>'+
      '<span class="speed">Vitesse: ' +stats[0].val + '</span><br>' +
      '<span class="special-defense">Défense spéciale: ' + stats[1].val + '</span><br>' +
      '<span class="special-attack">Attaque spéciale: ' + stats[2].val + '</span><br>' +
      '<span class="defense">Défense: ' + stats[3].val + '</span><br>' +
      '<span class="attack">Attaque: ' + stats[4].val + '</span><br>' +
      '<span class="hp">Points de vie: ' + stats[5].val + '</span><br>';
      $('#stats-'+data.name).replaceWith(newStatsEl);
    }
  }


  function render(data) {
    let pokemonCard = '<div class="card-pokemon" id="card-' + data.id + '">' +
      '<div>' +
      '<div><span class="name">Nom: ' + data.name + '</span></div>' +
      '<div class="image"><img src="' + data.sprites.front_default + '"></div>' +
      '<div><span class="weight">Poid: ' + data.weight + 'kg</span></div>' +
      '<div class="types"><span class="type-1" >Type 1: ' + data.types[0].type.name + '</span><br>';
    if (data.types[1]) {
      pokemonCard += '<span class="type-1" >Type 2: ' + data.types[1].type.name + '</span>';
    }
    pokemonCard += '</div>' +
      '<div class="select-level"></div>' +
      '<div id="stats-'+data.name+ '">' +
      '<span class="stat-level">Stats de base</span><br>'+
      '<span class="speed">Vitesse: ' + data.stats[0].base_stat + '</span><br>' +
      '<span class="special-defense">Défense spéciale: ' + data.stats[1].base_stat + '</span><br>' +
      '<span class="special-attack">Attaque spéciale: ' + data.stats[2].base_stat + '</span><br>' +
      '<span class="defense">Défense: ' + data.stats[3].base_stat + '</span><br>' +
      '<span class="attack">Attaque: ' + data.stats[4].base_stat + '</span><br>' +
      '<span class="hp">Points de vie: ' + data.stats[5].base_stat + '</span><br>' +
      '</div>' +
      '</div>';


    $('#list-card').append(pokemonCard);
    generateLvSelectEl('#card-' + data.id + ' .select-level');
    $('#card-' + data.id + ' #niveau').change(function (e) {
      calculateStat(data, $('#card-' + data.id + ' #niveau').val());
    });
  }


  $('#search-btn').click(function (e) {
    e.preventDefault();
    let query = $('#query').val();
    console.log('query vaut ' + query);
    let url = api_url + 'pokemon/' + query + '/';
    let settings = {
      'async': true,
      'crossDomain': true,
      'type': 'GET',
      'url': url,
      'success': function (data) {
        console.log(data);
        render(data);
      }
    };
    $.ajax(settings);
  });
});
