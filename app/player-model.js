const observableModule = require("data/observable");
const isIOS = require('tns-core-modules/platform').isIOS;
const audio = require('nativescript-audio');
const timerModule = require("tns-core-modules/timer");

function PlayerModel(id, audiosource, audioLength) {
    const player = new audio.TNSPlayer();

    const playerOptions = {
        audioFile: audiosource,
        loop: false,
        autoplay: false,
        completeCallback: function () {
            console.log('finished playing');
        },
    };

    player
        .initFromUrl(playerOptions)
        .then((res) => {
            console.log('init success');
        })
        .catch((err) => {
            console.log("something went wrong...", err);
        });

    let _checkInterval;

    const _module = observableModule.fromObject({
        id: id,
        audioLength: audioLength,
        progress: 0,
        isPlaying: false,
        player: player,
        prom: function () {
            return new Promise((resolve, reject) => {
                player.play()
                timerModule.setTimeout(() => {
                    console.log('@play finished.')
                    timerModule.clearInterval(_checkInterval);
                    resolve('@play finished.')
                }, audioLength * 1000)
            })
        },
        advprom: function () {
            return new Promise((resolve, reject) => {
                player.play()
                timerModule.setTimeout(() => {
                    /*
                    while (_module.isPlaying == true) {
                        timerModule.clearInterval(_checkInterval);
                    }
                    */
                    console.log('audio playing finished')

                    resolve('finished')
                }, 500)
            })
        },
        test: function () {
            return new Promise((resolve, reject) =>
                timerModule.setTimeout(() => {
                    console.log('123');

                    resolve('something');
                }, 10000))
        }
    })

    _checkInterval = timerModule.setInterval(() => {
        player.getAudioTrackDuration().then(duration => {
            // iOS: duration is in seconds
            // Android: duration is in milliseconds
            let current = player.currentTime
            if (isIOS) {
                duration *= 1000
                current *= 1000
            }

            if (_module) {
                _module.set('progress', Math.ceil(current / duration * 100));
                _module.set('isPlaying', player.isAudioPlaying());
            }
        });
    }, 200);

    return _module
}


module.exports = PlayerModel
