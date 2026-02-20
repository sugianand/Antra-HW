"use strict";

// Starter MVC shell only (basic setup)
class GameModel {
  constructor() {
    this.score = 0;
    this.timeLeft = 30;
    this.cells = Array.from({ length: 12 }, (_, id) => ({ id, status: "empty" }));
  }
}

class GameView {
  constructor() {
    this.board = document.getElementById("game-board");
    this.score = document.getElementById("score-value");
    this.timer = document.getElementById("timer-value");
    this.startButton = document.getElementById("start-button");
  }

  renderBoard(cells) {
    this.board.innerHTML = "";
    cells.forEach((cell) => {
      const el = document.createElement("div");
      el.className = "hole";
      el.setAttribute("data-id", String(cell.id));
      this.board.appendChild(el);
    });
  }
}

class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.renderBoard(this.model.cells);
    this.view.score.textContent = String(this.model.score);
    this.view.timer.textContent = String(this.model.timeLeft);

    this.view.startButton.addEventListener("click", () => {
      window.alert("Starter only: game logic will be added next.");
    });
  }
}

new GameController(new GameModel(), new GameView());
