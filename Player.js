'use strict';

class Player {
  constructor(playlist) {
    this.volume = 0;
    this.track = null;
    
    this.context = new AudioContext();
    this.playlist = new Playlist(playlist);

    // получаем элементы фронтэнда
    this.highButton = document.querySelector('#volumeHigh');
    this.lowButton  = document.querySelector('#volumeLow');
    this.playButton = document.querySelector('#play');
    this.nextButton = document.querySelector('#next');
    this.prevButton = document.querySelector('#prev');
    this.stopButton = document.querySelector('#stop');
    this.softButton = document.querySelector('#soft');
    
    // связывает фрронтэнд с функционалом
    this.highButton.onclick = () => this.volumeHigh();
    this.lowButton.onclick  = () => this.volumeLow();
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
    console.clear();

    if(this.track == null) {
      this.track = new Track(this.context, this.playlist.getCurrent());
    }
    console.log(this.track);
    this.track.play();
  }
  
  next() {
    if (this.track!==null) {
      this.track.stop();
      this.track = null;
      this.playlist.next();
      this.play();
    }
    
  }
  
  prev() {
    if (this.track !== null) {
      this.track.stop();
      this.track = null;
      this.playlist.prev();
      this.play();
    }
  } 
  
  stop() {
    if (this.track != null) {
      this.track.stop();
    }
  }
  
  soft() {
    if (this.track != null) {
      this.track.soft();
    }
    this.playlist.next();
    this.play();
  }
  
}