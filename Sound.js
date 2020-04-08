'use strict';

class Sound {

  constructor(context, buffer) {
    this.context = context;
    this.buffer = buffer;
  }

  setup() {
    this.gainNode = this.context.createGain();
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    
    this.gainNode.gain.setValueAtTime(0.8, this.context.currentTime);
  }

  play() {
    this.setup();
    this.source.start(this.context.currentTime);
  }

  stop() {
    this.gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.5);
    this.source.stop(this.context.currentTime + 0.5);
  }
  
  soft() {
    this.gainNode.gain.setValueAtTime(0.5, this.context.currentTime);
    this.source.stop(5);
  }
  

}