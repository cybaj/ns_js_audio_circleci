const PlayerModel = require("./player-model");
const labelModule = require("tns-core-modules/ui/label");
const timerModule = require("tns-core-modules/timer");
const createViewModel = require("./main-view-model").createViewModel;

function onNavigatingTo(args) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    const page = args.object;

    /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and JavaScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
    page.bindingContext = createViewModel();
}

const buttonList = [
  {
    'audioSrc': "https://www.w3schools.com/html/horse.mp3",
    'id': 'blue',
    'color': 'blue',
    'audioLength': 1.2,
    'isPlayable': true,
    'width': "100",
    'height': "100",
    'backgroundImage': 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRFt0knkb26N2hlBF1NzLzjwvMuFdwyJwde9ua0VTGDxqzqhjwj'
  },
  {
    'audioSrc': "http://s1download-universal-soundbank.com/mp3/sounds/12524.mp3",
    'id': 'red',
    'color': 'red',
    'audioLength': 1,
    'isPlayable': true,
    'width': "100",
    'height': "100",
    'backgroundImage': 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9Dbj50aZGtrf3z7uZyj_YHWauvVQWc4wBlg_gLayOu2uDIiCZ'
  },
  {
    'audioSrc': "http://www.vogelstimmen.info/Vogelstimmen_GRATIS/Wuestenregenpfeifer_Charadrius_leschenaultii_R_AMPLE-E0515.mp3",
    'id': 'green',
    'color': 'green',
    'audioLength': 3.2,
    'isPlayable': true,
    'width': "100",
    'height': "100",
    'backgroundImage': 'data:image/png;base64,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'
  },
  {
    'audioSrc': "http://s1download-universal-soundbank.com/mp3/sounds/12989.mp3",
    'id': 'yellow',
    'color': 'yellow',
    'audioLength': 2.2,
    'isPlayable': true,
    'width': "100",
    'height': "100",
    'backgroundImage': 'https://image.shutterstock.com/image-vector/10-seconds-minutes-stopwatch-icon-600w-401024086.jpg'
  }
]

const players = buttonList.map((buttonAttribute) => {
  return PlayerModel(buttonAttribute.id, buttonAttribute.audioSrc, buttonAttribute.audioLength)
})

const currentLabel = []

exports.pageLoaded = function (args) {
  const page = args.object;
}

exports.pageUnloaded = function () {
  homeViewModel_blue.clearTimer();
}

exports.onIconClick = function (args) {
  // console.log(args.object.id)

  if (currentLabel.findIndex((label) => {
    return label == args.object.id
  }) != -1) {
    console.log('@@@')
    return 0
  }

  currentLabel.push(args.object.id)

  const label = buttonList.find(function (cand) { return cand.id == args.object.id })
  const newLabel = new labelModule.Label()
  newLabel.id = label.id
  newLabel.width = label.width
  newLabel.height = label.height
  newLabel.backgroundColor = label.color
  newLabel.backgroundImage = label.backgroundImage
  newLabel.className = "iconBox icon"
  newLabel.on('tap', (args) => {
    const idx = currentLabel.findIndex((item) => {
      return item == args.object.id
    })
    
    currentLabel.splice(idx, 1)
    
    const table = args.object.page.getViewById('table')
    table.eachChild((child) => {
      if (child.id == args.object.id) {
        child.visibility = 'collapse'
      }
      console.log('currentLabel: ', currentLabel)
    })
  })
  const table = args.object.page.getViewById('table')
  table.addChild(newLabel)
  console.log('currentLabel: ', currentLabel)
}

const test = function () {
  return new Promise((resolve, reject) =>
    timerModule.setTimeout(() => {
      console.log('123');
      resolve('something');
    }, 10000))
}


exports.onPlayButton = function (args) {
  const startPromise = Promise.resolve(null);

  const currentPlayers = players.filter((player) => {
    for (const member of currentLabel) {
      if (player.id == member) {
        return true
      }
    }
  })
  console.log('current players:', currentPlayers)
  
  currentPlayers.reduce((p, player) => {
    console.log('p:', p)
    return p.then(player.prom)
  }, startPromise)
  
}



/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo="onNavigatingTo" binding in this page’s XML
file work.
*/
exports.onNavigatingTo = onNavigatingTo;
