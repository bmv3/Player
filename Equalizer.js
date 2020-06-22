class Equalizer {
  
  constructor(track, funcDraw) {
    
    this.canvas = document.createElement('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    
    this.track = track;
    
    this.draw()
  }
  
  draw () {
    
    requestAnimationFrame(this.draw.bind(this));
    
    let freqByteData = new Uint8Array(this.track.analyser.frequencyBinCount);
    this.track.analyser.getByteFrequencyData(freqByteData);
    
    console.log(freqByteData);
  }
}