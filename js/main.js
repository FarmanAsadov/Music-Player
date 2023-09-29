document.addEventListener("DOMContentLoaded", function () {
  const musicContainer = document.getElementById("music-container");
  const playBtn = document.getElementById("play");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const audio = document.getElementById("audio");
  const progress = document.getElementById("progress");
  const progressContainer = document.getElementById("progress-container");
  const title = document.getElementById("title");
  const cover = document.getElementById("cover");
  const currTime = document.querySelector("#currTime");
  const durTime = document.querySelector("#durTime");
  const repeat = document.querySelector("#repeat");
  const suffle = document.querySelector("#suffle");
  const volume = document.querySelector(".volume");

  // Song titles
  const songs = [
    "Juice WRLD Ft Benny Blanco - Real Shit", // 0
    "Lil Baby, Lil Durk ft Rodwave - Rich Off Pain", // 1
    "Polo G – I Know", // 2 => 3 - 1 = 2
  ];

  // default, initial index
  let songIndex = 2;

  loadSong(songs[songIndex]);

  function loadSong(songName) {
    title.innerText = songName;
    audio.src = `music/${songName}.mp3`;
    cover.src = `images/${songName}.jpg`;
  }

  playBtn.addEventListener("click", () => {
    let isPlaying = musicContainer.classList.contains("play");

    isPlaying ? pauseSong() : playSong();
  });

  function playSong() {
    // visual
    musicContainer.classList.add("play");
    playBtn.querySelector("svg").classList.remove("fa-play");
    playBtn.querySelector("svg").classList.add("fa-pause");

    // action
    audio.play();
  }

  function pauseSong() {
    // visual
    musicContainer.classList.remove("play");
    playBtn.querySelector("svg").classList.add("fa-play");
    playBtn.querySelector("svg").classList.remove("fa-pause");

    // action
    audio.pause();
  }

  function prevSong() {
    songIndex--;

    if (songIndex < 0) songIndex = songs.length - 1;

    loadSong(songs[songIndex]);

    playSong();
  }

  function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) songIndex = 0;

    loadSong(songs[songIndex]);

    playSong();
  }

  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);

  audio.addEventListener("timeupdate", updateProgress);

  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }

  progressContainer.addEventListener("click", setProgress);

  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
  }

  audio.addEventListener("ended", nextSong);

  audio.addEventListener("timeupdate", () => {
    const { currentTime, duration } = audio;
    const crntMinute = Math.floor(currentTime / 60);
    const crntSecond = Math.floor(currentTime % 60);
    const totalMinute = Math.floor(duration / 60);
    const totalSecond = Math.floor(duration % 60);

    currTime.textContent = `${crntMinute}:${String(crntSecond).padStart(
      2,
      "0"
    )}`;
    durTime.textContent = `${totalMinute}:${String(totalSecond).padStart(
      2,
      "0"
    )}`;
  });
  volume.addEventListener("input", () => {
    audio.volume = volume.value;
  });
  suffle.addEventListener("click", () => {
    const rndm = Math.floor(Math.random() * songs.length);
    if (songIndex > songs.length - 1) songIndex = 0;
    loadSong(songs[rndm]);
    songIndex++;
    playSong();
  });
  repeat.addEventListener("click", () => {
    loadSong(songs[songIndex]);
    playSong();
  });
});
