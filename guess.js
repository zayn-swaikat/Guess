const words = [
  "adventurous", "ambitious", "beautiful", "charming", "clever", "cute",
  "empathetic", "funny", "gorgeous", "handsome", "kind", "lovely", "nice",
  "patient", "protective", "reliable", "supportive", "sweet", "tough", "wise",
  "respectful", "sharp", "strong"
];

let remainingWords = [...words];
let currentSelection = [];
let selectedCells = [];
let score = 0;

const gridData = `
RILOVETRELGYYOU
EEMYCEEHUOMLYCE
LTAIEVGFRTTENHM
IUNWEUIGSSDVNAP
ACSLOTEHUTEOURA
BICTUONPASRLFMT
LKYAUYPEINOOBIH
ELESOOHWIJDINNE
DBCLRHWJPTTSIGT
YNVTTZUXEIANOII
IWIDFSPCOYAPHMC
KVLKHKNUJFIQIJE
EJQARESPECTFULO
MMREVITCETORPEQ
HPTMSUORUTNEVDA`.trim().split("\n").map(row => row.split(""));

const gridContainer = document.getElementById("grid");
const resetBtn = document.getElementById("reset");
const remainingDisplay = document.getElementById("remaining");
const scoreDisplay = document.getElementById("score");
const currentWordDisplay = document.getElementById("current-word");
const success = document.getElementById("success");
const win = document.getElementById("win");

function updateRemaining() {
  remainingDisplay.textContent = remainingWords.join(", ");
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function updateCurrentSelection() {
  currentWordDisplay.textContent = currentSelection.join("");
}

function resetSelection() {
  currentSelection = [];
  selectedCells.forEach(cell => cell.classList.remove("selected"));
  selectedCells = [];
  updateCurrentSelection();
}

gridData.forEach((row, y) => {
  row.forEach((letter, x) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = letter;
    cell.dataset.x = x;
    cell.dataset.y = y;

    cell.addEventListener("click", () => {
      if (cell.classList.contains("selected")) {
        cell.classList.remove("selected");
        const idx = selectedCells.indexOf(cell);
        if (idx > -1) {
          selectedCells.splice(idx, 1);
          currentSelection.splice(idx, 1);
        }
      } else {
        cell.classList.add("selected");
        selectedCells.push(cell);
        currentSelection.push(cell.textContent.toLowerCase());
      }
    
      updateCurrentSelection();
    
      const currentWord = currentSelection.join("");
      if (remainingWords.includes(currentWord)) {
        selectedCells.forEach(c => {
          c.classList.add("correct");
          c.classList.remove("selected");
        });
    
        remainingWords = remainingWords.filter(w => w !== currentWord);
        score++;
        updateScore();
        updateRemaining();
        success.play();
    
        resetSelection();
    
        if (remainingWords.length === 0) {
          setTimeout(() => {
            win.play();
            alert("Congratulations my Matt! You found all the words! Now, make a sentence from the remaining letters, starting from the upper left corner.");
          }, 300);
        }
      }
    });
    

    gridContainer.appendChild(cell);
  });
});

resetBtn.addEventListener("click", () => {
  resetSelection();
});

updateRemaining();
updateScore();
updateCurrentSelection();
