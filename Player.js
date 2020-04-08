'use strict';


class Player {
  constructor(playlist) {
    
    this.context = new AudioContext();
    this.highButton = document.querySelector('#volumeHigh');
    this.lowButton = document.querySelector('#volumeLow');
    this.playButton = document.querySelector('#play');
    this.nextButton = document.querySelector('#next');
    this.prevButton = document.querySelector('#prev');
    this.stopButton = document.querySelector('#stop');
    this.softButton = document.querySelector('#soft');
    
    this.highButton.onclick = () => this.volumeHigh();
    this.lowButton.onclick  = () => this.volumeLow();
    this.playButton.onclick = () => this.play();
    this.nextButton.onclick = () => this.next();
    this.prevButton.onclick = () => this.prev();
    this.stopButton.onclick = () => this.stop();
    this.softButton.onclick = () => this.soft();
    
    this.currentTrack = 0;
    this.volume = 0;
    this.playlist = playlist;
    
    this.buffer = new Buffer(this.context, playlist);
    this.buffer.loadAll();
  
    this.sound = new Sound(this.context, this.buffer.getSoundByIndex(this.currentTrack));
  }
  
  volumeHigh() {
    this.volume = this.volume >= 100 ? this.volume = 100 : ++this.volume;
  }

  volumeLow() {
    this.volume = this.volume <= 0 ? this.volume = 0 : --this.volume;
  }
  
  play() {
    this.sound = new Sound(this.context, this.buffer.getSoundByIndex(this.currentTrack));
    this.sound.play();
    console.log('play');
  }
  
  next() {
    this.currentTrack >= this.playlist.length ? this.currentTrack = this.playlist.length : ++this.currentTrack;
    this.sound.stop();
}
  
  prev() {
    this.currentTrack = this.currentTrack <= 0 ? this.currentTrack = 0 : --this.currentTrack;
    this.sound.stop();
}
  
  stop() {
    this.sound.stop();
  }
  
  soft() {
    console.log('Soft stop');
    console.log(typeof this.context);
    this.sound.setValueAtTime(0.5, this.context.currentTime);
    this.sound.stop();
  }
  
}