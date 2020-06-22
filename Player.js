'use strict';

class Player {
  constructor(playlist) {
    this.track = undefined;
    this.longsoft = 10;

    this.context = new AudioContext();
    this.playlist = new Playlist(playlist);

    // получаем элементы фронтэнда
    this.volumeControl = document.querySelector('#volume');
    this.playButton = document.querySelector('#play');
    this.nextButton = document.querySelector('#next');
    this.prevButton = document.querySelector('#prev');
    this.stopButton = document.querySelector('#stop');
    this.softButton = document.querySelector('#soft');

    // связывает фрронтэнд с функционалом
    this.volumeControl.onclick = () => this.volume();
    this.playButton.onclick = () => this.play();
    this.nextButton.onclick = () => this.next();
    this.prevButton.onclick = () => this.prev();
    this.stopButton.onclick = () => this.stop();
    this.softButton.onclick = () => this.soft();
  }

  volume() {
    this.track.setVolume(this.volumeControl.value);
  }

  play() {
    if (this.track === undefined) {
      this.track = new Track(this.playlist.getCurrent());
      
      document.title = this.playlist.getCurrent()['name'] || "Название трека";
      
      this.track.myAudio.onended = () => {
        this.playButton.classList.remove('player_control-buttons_pause');
        this.track = undefined;
      }
      this.playButton.classList.add('player_control-buttons_pause');
      this.track.play();
    }
    this.track.myAudio.onplaying = () => console.log('Video is no longer paused');
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