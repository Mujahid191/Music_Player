/* All Variables */
let song = document.querySelector(".song");
let pre_btn = document.querySelector(".pre");
let play_btn = document.querySelector(".play");
let next_btn = document.querySelector(".next");
let music_img = document.querySelector(".img");
let song_title = document.querySelector(".song_title");
let song_artist = document.querySelector(".song_artist");
let progress_bar = document.querySelector(".time_line");
let start_time = document.querySelector(".start_time");
let end_time = document.querySelector(".end_time");
let songs = [
  {
    name: "Aye ho Mari Zindge",
    artist: "Amir Khan",
  },
  {
    name: "Dil k badle Sanam",
    artist: "Salman Khan",
  },
  {
    name: "Gal kar k",
    artist: "Indian Punjabi Song",
  },
];
/* Song Play and Pause Function */
let playing = false;
const play = () => {
  playing = true;
  song.play();
  music_img.classList.add("img_anime");
  play_btn.classList.replace("fa-play", "fa-pause");
};
const pause = () => {
  playing = false;
  song.pause();
  music_img.classList.remove("img_anime");
  play_btn.classList.replace("fa-pause", "fa-play");
};
play_btn.addEventListener("click", () => {
  if (playing) {
    pause();
  } else {
    play();
  }
});
/* Song Load Function */
let index = 0;
const loadSong = () => {
  const data = songs[index];
  song_title.innerText = data.name;
  song_artist.innerText = data.artist;
  song.src = `Audio/${data.name}.mp3`;
};
loadSong();
/* Song Control function */
const nextSong = (x) => {
  index = index + x;
  if (index == songs.length) {
    index = 0;
  }
  if (index < 0) {
    index = songs.length - 1;
  }
  loadSong();
  play();
};
next_btn.addEventListener("click", function () {
  nextSong(1);
});
pre_btn.addEventListener("click", function () {
  nextSong(-1);
});
/* Song Duration Conrol Function */
if (song.play) {
  setInterval(() => {
    progress_bar.value = song.currentTime;
    progress_bar.max = song.duration;
    let st_min = Math.floor(song.currentTime / 60);
    let st_sec = Math.floor(song.currentTime % 60);
    if (st_sec < 10) {
      st_sec = `0${st_sec}`;
    }
    start_time.innerText = `${st_min}:${st_sec}`;
    let min = Math.floor(song.duration / 60);
    let sec = Math.floor(song.duration % 60);
    if (song.duration) {
      end_time.innerText = `${min}:${sec}`;
    }
  }, 500);
}
/* Song control With Progress Bar */
progress_bar.onchange = function () {
  song.currentTime = progress_bar.value;
  play();
};
/* Song Complete and Auto Play Next Song */
song.addEventListener("ended", () => {
  nextSong();
});