'use strict';

class Track {

  constructor(url) {
    this.context = new AudioContext();
  
    this.myAudio = new Audio(url);
    this.myAudio.crossOrigin = 'anonymous';
  
    this.source = this.context.createMediaElementSource(this.myAudio);
    this.gainNode = this.context.createGain();
    this.analyserNode = this.context.createAnalyser();
    this.analyserNode.fftSize = 2048;
    
    this.source.connect(this.analyserNode);
    this.analyserNode.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.gainNode.gain.setValueAtTime(1, this.context.currentTime);

  }

  play() {
    this.myAudio.play();
  }

  stop() {
    this.myAudio.pause();
    this.myAudio.src = '';
  }
  
  pause() {
    this.myAudio.pause();
  }
  
  soft(long) {
    this.gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime + long);
  }

  setVolume(volume) {
    this.myAudio.volume = volume / 100;
  }
  
  visualisation() {
    
  }

}