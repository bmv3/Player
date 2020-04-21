'use strict';

class Track {

  constructor(url) {
    this.context = new AudioContext();
  
    this.myAudio = new Audio(url);
    this.myAudio.play();
    this.myAudio.crossOrigin = 'anonymous';
  
    this.source = this.context.createMediaElementSource(this.myAudio);
    this.gainNode = this.context.createGain();
    this.source.connect(this.gainNode);

 }

  // loadTrack(url) {
  //   let source = this.context.createBufferSource();

  //   let thisBuffer = this;

  //   return fetch(url)
  //     .then(function(response) {
  //       if (!response.ok) {
  //         throw new Error("HTTP error, status = " + response.status);
  //       }
  //       return response.arrayBuffer();
  //     })
  //     .then(function(buffer) {
  //       thisBuffer.context.decodeAudioData(buffer, function(decodedData) {
  //         thisBuffer.source.buffer = decodedData;
  //         thisBuffer.source.connect(thisBuffer.context.destination);
  //       });
  //     });
  // }

  // setup() {
  //   this.gainNode = this.context.createGain();
  //   this.source = this.context.createBufferSource();
  //   this.source.buffer = this.buffer;
  //   this.source.connect(this.gainNode);
  //   this.gainNode.connect(this.context.destination);
  // }

  play() {
    // this.myAudio.start(this.context.currentTime);
    this.gainNode.connect(this.context.destination);
    this.gainNode.gain.setValueAtTime(1, this.context.currentTime);
    
  }

  stop() {
    this.myAudio.pause();

  }

  soft() {
    this.long = 5;
    this.gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime + this.long);
  }


  setVolume(volume) {
    this.gainNode.gain.value = volume / 100;
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.context.currentTime);

    console.log(this.gainNode.gain.value);
  }

}