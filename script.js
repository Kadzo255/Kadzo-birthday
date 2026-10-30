const notes = {
  birthday: {
    title: "Happy birthday, Kadzo.",
    text: "I know birthdays might not be your biggest thing, so I'm not here to make you celebrate in any particular way. I just wanted to take a moment to remind you that you're appreciated. I hope this new chapter brings you beautiful experiences, new places, good food, genuine happiness and plenty of reasons to smile. Have a lovely day, birthday girl."
  },

  appreciation: {
    title: "A little appreciation.",
    text: "One thing I hope you never forget is that the little things about you matter too. Your eye for style, your love for capturing moments, your interests and all those little details that make you who you are. I hope life keeps giving you beautiful things to experience and remember."
  },

  random: {
    title: "For another day.",
    text: "If you ever come across this on an ordinary day, here's your reminder to enjoy the little things. Take the pictures, try the food, visit the places, wear the outfit and make memories. You don't have to wait for a special occasion to enjoy life."
  }
};

const modal = document.getElementById("noteModal");
const noteTitle = document.getElementById("noteTitle");
const noteText = document.getElementById("noteText");
const closeButton = document.querySelector(".close-modal");

document.querySelectorAll(".note-card").forEach((button) => {
  button.addEventListener("click", () => {
    const note = notes[button.dataset.note];

    if (!note) return;

    noteTitle.textContent = note.title;
    noteText.textContent = note.text;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeNote() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

closeButton.addEventListener("click", closeNote);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeNote();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNote();
  }
});
