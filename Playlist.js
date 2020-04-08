'use strict';

class Playlist {
  
  constructor (playlist) {
    this.current = 0;
    this.playlist = playlist;
  }
  
  next() {
    this.current >= this.playlist.length ? this.current = this.playlist.length : ++this.current;
  }

  prev() {
    this.current = this.current <= 0 ? this.current = 0 : --this.current;
  }
  
  getCurrent() {
    return this.playlist[this.current];
  }
  
}