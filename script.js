const audio = document.getElementById("audio");
const toggleBtn = document.getElementById("toggleBtn");
const seek = document.getElementById("seek");
const current = document.getElementById("current");
const duration = document.getElementById("duration");

const formatTime = (secs) => {
  const minutes = Math.floor(secs / 60) || 0;
  const seconds = Math.floor(secs % 60) || 0;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

toggleBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    toggleBtn.textContent = "Pause";
  } else {
    audio.pause();
    toggleBtn.textContent = "Play";
  }
});

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    const progress = (audio.currentTime / audio.duration) * 100;
    seek.value = progress;
    current.textContent = formatTime(audio.currentTime);
  }
});

seek.addEventListener("input", () => {
  if (!isNaN(audio.duration)) {
    audio.currentTime = (seek.value / 100) * audio.duration;
  }
});

audio.addEventListener("ended", () => {
  toggleBtn.textContent = "Play";
});
