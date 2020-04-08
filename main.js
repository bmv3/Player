(function() {
  'use strict';

  let currentTrack = 0;
  let volume = 0;

  const playlist = [
    "audio/BachGavotteShort.mp3",
    "audio/HarrisLilliburleroShort.mp3",
    "audio/PurcellSongMusShort.mp3",
    "audio/PurcellSongSpinShort.mp3",
    "audio/WalloonLilliShort.mp3"
 ];

  const context = new AudioContext();
  const playButton = document.querySelector('#play');
  const nextButton = document.querySelector('#next');
  const prevButton = document.querySelector('#prev');
  const softButton = document.querySelector('#soft');
  const highButton = document.querySelector('#volumeHigh');
  const lowButton  = document.querySelector('#volumeLow');


  highButton.onclick = () => volumeHigh(playlist);
  lowButton.onclick  = () => volumeLow(playlist);
  playButton.onclick = () => play(playlist);
  nextButton.onclick = () => next();
  prevButton.onclick = () => prev();
  softButton.onclick = () => soft();


  let buffer = new Buffer(context, playlist);
  buffer.loadAll();
  
  let sound = new Sound(context, buffer.getSoundByIndex(currentTrack));
    
  function play(playlist) {
    sound = new Sound(context, buffer.getSoundByIndex(currentTrack));
    sound.play();
    console.log('play');
    console.log(buffer.getSoundByIndex(currentTrack));
  }
  
  
  function soft() {
    console.log('Soft stop');
    sound.setValueAtTime(0.5, now);
  }

  function next() {
    currentTrack >= playlist.length ? currentTrack = playlist.length : ++currentTrack;
    console.log(currentTrack);
  }
  
  function prev() {
    currentTrack = currentTrack <= 0 ? currentTrack = 0 : --currentTrack;
    console.log(currentTrack);
  }

  function volumeHigh() {
    volume = volume >= 100 ? volume = 100 : ++volume;
  }

  function volumeLow() {
    volume = volume <= 0 ? volume = 0 : --volume;
  }

}());