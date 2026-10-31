const welcomeScreen = document.getElementById("welcomeScreen");
const enterButton = document.getElementById("enterButton");
const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicIcon = document.getElementById("musicIcon");
const musicText = document.getElementById("musicText");

let musicStarted = false;

function updateMusicButton() {
  if (music.paused) {
    musicIcon.textContent = "♫";
    musicText.textContent = "PLAY MUSIC";
  } else {
    musicIcon.textContent = "Ⅱ";
    musicText.textContent = "PAUSE MUSIC";
  }
}

// Start the website and attempt to play music
enterButton.addEventListener("click", async () => {
  welcomeScreen.classList.add("hide");

  try {
    await music.play();
    musicStarted = true;
  } catch (error) {
    console.error("Music playback failed:", error);
    alert(
      "The birthday page opened, but the song could not play. Check the release audio link."
    );
  }

  updateMusicButton();
});

// Play and pause control
musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicStarted = true;
    } catch (error) {
      console.error("Music playback failed:", error);
      alert("The song could not play. Please check the audio file link.");
    }
  } else {
    music.pause();
  }

  updateMusicButton();
});

// Keep the button updated
music.addEventListener("play", updateMusicButton);
music.addEventListener("pause", updateMusicButton);
music.addEventListener("ended", updateMusicButton);

// Notes content
const notes = {
  noteOne: {
    title: "For your smile",
    message:
      "I hope you always have reasons to smile, even on the ordinary days. Never underestimate how much joy the little things can bring."
  },

  noteTwo: {
    title: "For your dreams",
    message:
      "I hope you keep exploring, trying new things and going after the life you imagine for yourself. Don't make yourself smaller for anyone."
  },

  noteThree: {
    title: "For the year ahead",
    message:
      "May this new chapter bring you peace, beautiful surprises, unforgettable experiences and moments that remind you how much life has to offer."
  }
};

const noteModal = document.getElementById("noteModal");
const noteTitle = document.getElementById("noteTitle");
const noteMessage = document.getElementById("noteMessage");
const closeModal = document.getElementById("closeModal");

// Open a note
document.querySelectorAll(".note-card").forEach((button) => {
  button.addEventListener("click", () => {
    const selectedNote = notes[button.dataset.note];

    if (!selectedNote) return;

    noteTitle.textContent = selectedNote.title;
    noteMessage.textContent = selectedNote.message;
    noteModal.classList.add("show");
  });
});

// Close popup
closeModal.addEventListener("click", () => {
  noteModal.classList.remove("show");
});

noteModal.addEventListener("click", (event) => {
  if (event.target === noteModal) {
    noteModal.classList.remove("show");
  }
});

// Close popup with Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    noteModal.classList.remove("show");
  }
});
