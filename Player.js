'use strict';

class Player {
  constructor(playlist) {
    this.volume = 20;
    this.track = undefined;
    this.longsoft = 5;

    this.context = new AudioContext();
    this.playlist = new Playlist(playlist);

    // получаем элементы фронтэнда
    this.highButton = document.querySelector('#volumeHigh');
    this.lowButton = document.querySelector('#volumeLow');
    this.playButton = document.querySelector('#play');
    this.nextButton = document.querySelector('#next');
    this.prevButton = document.querySelector('#prev');
    this.stopButton = document.querySelector('#stop');
    this.softButton = document.querySelector('#soft');

    // связывает фрронтэнд с функционалом
    this.highButton.onclick = () => this.volumeHigh();
    this.lowButton.onclick = () => this.volumeLow();
    this.playButton.onclick = () => this.play();
    this.nextButton.onclick = () => this.next();
    this.prevButton.onclick = () => this.prev();
    this.stopButton.onclick = () => this.stop();
    this.softButton.onclick = () => this.soft();
  }

  volumeHigh() {
    this.volume = this.volume >= 100 ? this.volume = 100 : ++this.volume;
    this.track.setVolume(this.volume);
  }

  volumeLow() {
    this.volume = this.volume <= 0 ? this.volume = 0 : --this.volume;
    this.track.setVolume(this.volume);
  }

  play() {
    if (this.track == undefined) {
      this.track = new Track(this.playlist.getCurrent());
    }
    this.playButton.classList.add('player_control-buttons_pause');
    this.track.play();
  }

  next() {
    if (this.track !== undefined) {
      this.playlist.next();
      this.track.stop();
      this.track = undefined;
      this.play();
    }

  }

  prev() {
    if (this.track !== undefined) {
      this.playlist.prev();
      this.track.stop();
      this.track = undefined;
      this.play();
    }
  }

  stop() {
    if (this.track != undefined) {
      this.track.stop();
      this.track = undefined;
    }

    this.playButton.classList.remove('player_control-buttons_pause');
  }

  soft() {
    if (this.track != undefined) {
      this.track.soft(this.longsoft);
    }
    this.playlist.next();
    this.play();
  }

}