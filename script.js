document.addEventListener("DOMContentLoaded", function () {

  const music = document.getElementById("birthdayMusic");
  const welcomeScreen = document.getElementById("welcomeScreen");
  const enterButton = document.getElementById("enterSite");
  const musicPlayer = document.getElementById("musicPlayer");
  const musicToggle = document.getElementById("musicToggle");

  function updateMusicButton() {
    if (!music || !musicToggle) return;

    const playing = !music.paused;

    musicToggle.textContent = playing ? "Ⅱ" : "▶";
    musicToggle.setAttribute(
      "aria-label",
      playing ? "Pause music" : "Play music"
    );
  }

  async function playMusic() {
    if (!music) return;

    try {
      await music.play();
      updateMusicButton();
    } catch (error) {
      console.error("Music playback error:", error);
      updateMusicButton();
      alert("The song could not play. Check that fire-on-fire.mp3 is uploaded beside index.html.");
    }
  }

  if (enterButton) {
    enterButton.addEventListener("click", function () {
      welcomeScreen.classList.add("hide");
      musicPlayer.classList.add("visible");
      playMusic();
    });
  }

  if (musicToggle) {
    musicToggle.addEventListener("click", function () {
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
    music.addEventListener("error", function () {
      console.error("Could not load fire-on-fire.mp3. Check the filename.");
      updateMusicButton();
    });
  }

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

Your eye for style, your interests and all those little details that make up your personality.

Keep exploring, keep discovering new things and keep being yourself.

There's so much more ahead of you.`
    },

    random: {
      title: "For another day.",
      message: `Here's a reminder for an ordinary day:

Take the pictures. Wear the outfit. Try the food. Visit the place you've been saving. Make the memories.

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

      if (!note) return;

      modalTitle.textContent = note.title;
      modalText.textContent = note.message;

      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  updateMusicButton();

});
