/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');

var main = new UI.Card({
  title: 'MyFHEM',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello Michi',
  body: 'Drücke Select für Menü'
});

main.show();

main.on('click', 'select', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Küche',
        subtitle: 'Licht an/aus'
      }, {
        title: 'Wohnzimmer',
        subtitle: 'Licht an/aus'
      }, {
        title: 'Flur',
        subtitle: 'Rot'
      }, {
        title: 'Flur',
        subtitle: 'Orange'
      }, {
        title: 'Flur',
        subtitle: 'aus'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
    var ajax = require('ajax');
    if (e.itemIndex == "0") {
      console.log('Trying to toggle Kitchen light');
      ajax({ url: 'http://mypi:8083/fhem?cmd=set%20FS20_fr_bel%20toggle', type: 'xml' },
        function(data) {
          main.body(data.contents.quote);
          main.title(data.contents.author);
        }
      );
    }    
    if (e.itemIndex == "1") {
      console.log('Trying to toggle LivingRoom light');
      ajax({ url: 'http://mypi:8083/fhem?cmd=set%20FS20_fz_bel%20toggle', type: 'xml' },
        function(data) {
          main.body(data.contents.quote);
          main.title(data.contents.author);
        }
      );
    }
    if (e.itemIndex == "2") {
      console.log('Trying to set Flur light to red');
      ajax({ url: 'http://mypi:8083/fhem?cmd=set%20HueFlur1%20rgb%20FF0000&XHR=1', type: 'xml' },
        function(data) {
          main.body(data.contents.quote);
          main.title(data.contents.author);
        }
      );
    }    
    if (e.itemIndex == "3") {
      console.log('Trying to set Flur light to orange');
      ajax({ url: 'http://mypi:8083/fhem?cmd=set%20HueFlur1%20rgb%20FF830A&XHR=1', type: 'xml' },
        function(data) {
          main.body(data.contents.quote);
          main.title(data.contents.author);
        }
      );
    }    
    if (e.itemIndex == "4") {
      console.log('Trying to set Flur light off');
      ajax({ url: 'http://mypi:8083/fhem?cmd=set%20HueFlur1%20off&XHR=1', type: 'xml' },
        function(data) {
          main.body(data.contents.quote);
          main.title(data.contents.author);
        }
      );
    }    
    
  });
  menu.show();
});

/*
main.on('click', 'up', function(e) {
  var wind = new UI.Window({
    fullscreen: true,
  });
  var textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
*/