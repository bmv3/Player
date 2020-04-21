'use strict';

class Track {

  constructor(url) {
    this.context = new AudioContext();
  
    this.myAudio = new Audio(url);
    this.myAudio.crossOrigin = 'anonymous';
  
    this.source = this.context.createMediaElementSource(this.myAudio);
    this.gainNode = this.context.createGain();
    this.source.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.gainNode.gain.setValueAtTime(1, this.context.currentTime);

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

}