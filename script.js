const notes = {
  birthday: {
    title: "Happy birthday, Kadzo.",
    message: `Today is yours, and I hope you get to enjoy it in whatever way feels right to you.

I hope this new chapter brings you beautiful experiences, new places to explore, good food, genuine happiness and plenty of reasons to smile.

May the year ahead be kind to you and give you so many things worth looking forward to.

Have a beautiful birthday.`
  },

  appreciation: {
    title: "A reminder about you.",
    message: `I hope you never lose the things that make you unmistakably you.

Your eye for style, your love for capturing moments, your interests and all those little details that make up your personality.

Keep exploring, keep discovering new things and keep being yourself.

There's so much more ahead of you.`
  },

  random: {
    title: "For another day.",
    message: `Here's a reminder for an ordinary day:

Take the pictures. Wear the outfit. Try the food. Visit the place you've been saving on Pinterest. Make the memories.

Life has so many beautiful experiences waiting for you.

I hope you get to enjoy as many of them as possible.`
  }
};

// Birthday notes
const modal = document.getElementById("noteModal");
const modalTitle = document.getElementById("noteTitle");
const modalText = document.getElementById("noteText");
const closeButton = document.getElementById("close-modal");

document.querySelectorAll(".note-card").forEach((button) => {
  button.addEventListener("click", () => {
    const selectedNote = notes[button.dataset.note];
    if (!selectedNote || !modal) return;

    modalTitle.textContent = selectedNote.title;
    modalText.textContent = selectedNote.message;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (closeButton) {
  closeButton.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

// Birthday music
const welcomeScreen = document.getElementById("welcomeScreen");
const enterButton = document.getElementById("enterSite");
const birthdayMusic = document.getElementById("birthdayMusic");
const musicPlayer = document.getElementById("musicPlayer");
const musicToggle = document.getElementById("musicToggle");
const musicIndicator = document.getElementById("musicIndicator");

function updateMusicControls() {
  if (!birthdayMusic || !musicToggle) return;

  if (birthdayMusic.paused) {
    musicToggle.textContent = "▶";
    musicToggle.setAttribute("aria-label", "Play music");
  } else {
    musicToggle.textContent = "Ⅱ";
    musicToggle.setAttribute("aria-label", "Pause music");
  }

  if (musicIndicator) {
    musicIndicator.textContent = birthdayMusic.paused ? "♫" : "♪";
  }
}

async function playBirthdayMusic() {
  if (!birthdayMusic) return;

  try {
    await birthdayMusic.play();
    updateMusicControls();
  } catch (error) {
    console.error("Music playback failed:", error);
    updateMusicControls();
  }
}

if (enterButton) {
  enterButton.addEventListener("click", async () => {
    if (welcomeScreen) welcomeScreen.classList.add("hide");
    if (musicPlayer) musicPlayer.classList.add("visible");

    await playBirthdayMusic();
  });
}

if (musicToggle) {
  musicToggle.addEventListener("click", async () => {
    if (!birthdayMusic) return;

    if (birthdayMusic.paused) {
      await playBirthdayMusic();
    } else {
      birthdayMusic.pause();
      updateMusicControls();
    }
  });
}

if (birthdayMusic) {
  birthdayMusic.addEventListener("play", updateMusicControls);
  birthdayMusic.addEventListener("pause", updateMusicControls);
  birthdayMusic.addEventListener("ended", updateMusicControls);
}

updateMusicControls();
