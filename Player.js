class Player {
  constructor() {
    
    this.context = new AudioContext();
    this.playButton = document.querySelector('#play');
    this.nextButton = document.querySelector('#next');
    this.prevButton = document.querySelector('#prev');
    this.softButton = document.querySelector('#soft');
    this.highButton = document.querySelector('#volumeHigh');
    this.lowButton  = document.querySelector('#volumeLow');
    
    this.highButton.onclick = () => this.volumeHigh(playlist);
    this.lowButton.onclick  = () => this.buffervolumeLow(playlist);
    this.playButton.onclick = () => this.play(playlist);
    this.nextButton.onclick = () => this.next();
    this.prevButton.onclick = () => this.prev();
    this.softButton.onclick = () => this.soft();
    
    this.buffer = new Buffer(this.context, this.playlist);
    this.buffer.loadAll();
  
    this.sound = new Sound(this.context, this.buffer.getSoundByIndex(this.currentTrack));
  }
  
  play(playlist) {
    this.sound = new Sound(this.context, this.buffer.getSoundByIndex(this.currentTrack));
    this.sound.play();
    console.log('play');
  }

  soft() {
    console.log('Soft stop');
    this.sound.setValueAtTime(0.5, now);
  }
  
  next() {
    this.currentTrack >= this.playlist.length ? this.currentTrack = this.playlist.length : ++this.currentTrack;
  }
  
  prev() {
    this.currentTrack = this.currentTrack <= 0 ? this.currentTrack = 0 : --this.currentTrack;
  }
  
  volumeHigh() {
    this.volume = this.volume >= 100 ? this.volume = 100 : ++this.volume;
  }
  
  volumeLow() {
    this.volume = this.volume <= 0 ? this.volume = 0 : --this.volume;
  }
}