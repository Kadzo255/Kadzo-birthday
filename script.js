document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const music = document.getElementById("birthdayMusic");
  const welcomeScreen = document.getElementById("welcomeScreen");
  const enterButton = document.getElementById("enterSite");
  const musicPlayer = document.getElementById("musicPlayer");
  const musicToggle = document.getElementById("musicToggle");
  const musicIndicator = document.getElementById("musicIndicator");

  // Music controls
  function updateMusicButton() {
    if (!music || !musicToggle) return;

    const playing = !music.paused;

    musicToggle.textContent = playing ? "Ⅱ" : "▶";
    musicToggle.setAttribute(
      "aria-label",
      playing ? "Pause music" : "Play music"
    );

    if (musicIndicator) {
      musicIndicator.textContent = playing ? "♪" : "♫";
    }
  }

  async function playMusic() {
    if (!music) return;

    try {
      music.volume = 1;
      await music.play();
      updateMusicButton();
    } catch (error) {
      console.error("Music playback error:", error);
      updateMusicButton();
      alert("The music could not start. Please check the song file and your browser.");
    }
  }

  if (enterButton) {
    enterButton.addEventListener("click", function () {
      if (welcomeScreen) {
        welcomeScreen.classList.add("hide");
      }

      if (musicPlayer) {
        musicPlayer.classList.add("visible");
      }

      playMusic();
    });
  }

  if (musicToggle) {
    musicToggle.addEventListener("click", function () {
      if (!music) return;

      if (music.paused) {
        playMusic();
      } else {
        music.pause();
        updateMusicButton();
      }
    });
  }

  if (music) {
    music.addEventListener("play", updateMusicButton);
    music.addEventListener("pause", updateMusicButton);
    music.addEventListener("ended", updateMusicButton);

    music.addEventListener("error", function () {
      console.error(
        "The music file could not be loaded. Check that fire-on-fire.mp3 is in the same folder as index.html."
      );
      updateMusicButton();
    });
  }

  updateMusicButton();

  // Birthday notes
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

  const modal = document.getElementById("noteModal");
  const modalTitle = document.getElementById("noteTitle");
  const modalText = document.getElementById("noteText");
  const closeButton = document.getElementById("close-modal");

  document.querySelectorAll(".note-card").forEach(function (button) {
    button.addEventListener("click", function () {
      const note = notes[button.dataset.note];

      if (!note || !modal || !modalTitle || !modalText) return;

      modalTitle.textContent = note.title;
      modalText.textContent = note.message;

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
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });
});
