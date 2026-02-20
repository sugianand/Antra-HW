"use strict";

class GameModel {
  constructor() {
    this.boardSize = 12;
    this.gameDuration = 30;
    this.maxMoles = 3;
    this.moleLifetimeMs = 2000;
    this.reset();
  }

  reset() {
    this.score = 0;
    this.timeLeft = this.gameDuration;
    this.running = false;
    this.cells = Array.from({ length: this.boardSize }, (_, id) => ({
      id,
      status: "empty",
      hasMole: false,
      hasSnake: false,
      moleTimeoutId: null,
    }));
  }

  setRunning(running) {
    this.running = running;
  }

  getCell(id) {
    return this.cells[id] || null;
  }

  syncStatus(cell) {
    if (cell.hasMole && cell.hasSnake) {
      cell.status = "mole-and-snake";
      return;
    }
    if (cell.hasMole) {
      cell.status = "mole";
      return;
    }
    if (cell.hasSnake) {
      cell.status = "snake";
      return;
    }
    cell.status = "empty";
  }

  activeMoleCount() {
    return this.cells.filter((cell) => cell.hasMole).length;
  }

  spawnMole() {
    if (!this.running || this.activeMoleCount() >= this.maxMoles) {
      return null;
    }

    const candidates = this.cells.filter((cell) => !cell.hasMole);
    if (candidates.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * candidates.length);
    const cell = candidates[randomIndex];
    cell.hasMole = true;
    this.syncStatus(cell);
    return cell.id;
  }

  removeMole(id) {
    const cell = this.getCell(id);
    if (!cell || !cell.hasMole) {
      return false;
    }

    cell.hasMole = false;
    cell.moleTimeoutId = null;
    this.syncStatus(cell);
    return true;
  }

  moveSnake() {
    if (!this.running) {
      return null;
    }

    this.cells.forEach((cell) => {
      cell.hasSnake = false;
      this.syncStatus(cell);
    });

    const randomIndex = Math.floor(Math.random() * this.cells.length);
    const nextCell = this.cells[randomIndex];
    nextCell.hasSnake = true;
    this.syncStatus(nextCell);
    return nextCell.id;
  }

  explodeSnake() {
    this.cells.forEach((cell) => {
      cell.hasSnake = true;
      this.syncStatus(cell);
    });
  }

  incrementScore() {
    this.score += 1;
    return this.score;
  }

  tickTimer() {
    if (!this.running) {
      return this.timeLeft;
    }
    this.timeLeft = Math.max(0, this.timeLeft - 1);
    return this.timeLeft;
  }
}

class GameView {
  constructor() {
    this.scoreElement = document.getElementById("score-value");
    this.timerElement = document.getElementById("timer-value");
    this.startButton = document.getElementById("start-button");
    this.boardElement = document.getElementById("game-board");
  }

  buildBoard(cells) {
    const fragment = document.createDocumentFragment();

    cells.forEach((cell) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "hole";
      button.setAttribute("data-cell-id", String(cell.id));
      button.setAttribute("aria-label", `Board cell ${cell.id + 1}`);
      button.innerHTML = [
        '<img class="sprite mole" src="./assets/mole.svg" alt="mole">',
        '<img class="sprite snake" src="./assets/snake.svg" alt="snake">',
      ].join("");
      fragment.appendChild(button);
    });

    this.boardElement.innerHTML = "";
    this.boardElement.appendChild(fragment);
  }

  setScore(score) {
    this.scoreElement.textContent = String(score);
  }

  setTimer(timeLeft) {
    this.timerElement.textContent = String(timeLeft);
  }

  updateCell(cell, isSnakeBurst = false) {
    const element = this.boardElement.querySelector(`[data-cell-id="${cell.id}"]`);
    if (!element) {
      return;
    }

    element.classList.toggle("has-mole", cell.hasMole);
    element.classList.toggle("has-snake", cell.hasSnake);
    element.classList.toggle("snake-burst", isSnakeBurst && cell.hasSnake);
  }

  renderBoard(cells, isSnakeBurst = false) {
    cells.forEach((cell) => this.updateCell(cell, isSnakeBurst));
  }

  bindStart(handler) {
    this.startButton.addEventListener("click", handler);
  }

  bindCellClick(handler) {
    this.boardElement.addEventListener("click", (event) => {
      const cellElement = event.target.closest(".hole");
      if (!cellElement) {
        return;
      }
      const cellId = Number(cellElement.getAttribute("data-cell-id"));
      handler(cellId);
    });
  }

  showAlert(message) {
    window.alert(message);
  }
}

class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.intervals = {
      mole: null,
      snake: null,
      timer: null,
    };

    this.view.buildBoard(this.model.cells);
    this.view.setScore(this.model.score);
    this.view.setTimer(this.model.timeLeft);
    this.view.renderBoard(this.model.cells);

    this.view.bindStart(() => this.startGame());
    this.view.bindCellClick((cellId) => this.onCellClick(cellId));
  }

  clearIntervals() {
    Object.keys(this.intervals).forEach((key) => {
      if (this.intervals[key] !== null) {
        window.clearInterval(this.intervals[key]);
        this.intervals[key] = null;
      }
    });
  }

  clearMoleTimeouts() {
    this.model.cells.forEach((cell) => {
      if (cell.moleTimeoutId !== null) {
        window.clearTimeout(cell.moleTimeoutId);
        cell.moleTimeoutId = null;
      }
    });
  }

  startGame() {
    this.clearIntervals();
    this.clearMoleTimeouts();

    this.model.reset();
    this.model.setRunning(true);

    this.view.setScore(this.model.score);
    this.view.setTimer(this.model.timeLeft);
    this.view.renderBoard(this.model.cells);

    this.intervals.mole = window.setInterval(() => this.spawnMoleStep(), 1000);
    this.intervals.snake = window.setInterval(() => this.spawnSnakeStep(), 2000);
    this.intervals.timer = window.setInterval(() => this.timerStep(), 1000);
  }

  finishGame(reason) {
    if (!this.model.running) {
      return;
    }

    this.model.setRunning(false);
    this.clearIntervals();
    this.clearMoleTimeouts();

    if (reason === "time") {
      this.view.showAlert("Time is Over !");
    } else if (reason === "snake") {
      this.view.showAlert("Snake clicked! Game Over!");
    }
  }

  spawnMoleStep() {
    const newMoleId = this.model.spawnMole();
    if (newMoleId === null) {
      return;
    }

    const cell = this.model.getCell(newMoleId);
    if (!cell) {
      return;
    }

    if (cell.moleTimeoutId !== null) {
      window.clearTimeout(cell.moleTimeoutId);
    }

    cell.moleTimeoutId = window.setTimeout(() => {
      if (!this.model.running) {
        return;
      }
      const removed = this.model.removeMole(newMoleId);
      if (removed) {
        this.view.updateCell(this.model.getCell(newMoleId));
      }
    }, this.model.moleLifetimeMs);

    this.view.updateCell(cell);
  }

  spawnSnakeStep() {
    const movedCellId = this.model.moveSnake();
    if (movedCellId === null) {
      return;
    }
    this.view.renderBoard(this.model.cells);
  }

  onCellClick(cellId) {
    if (!this.model.running) {
      return;
    }

    const cell = this.model.getCell(cellId);
    if (!cell) {
      return;
    }

    if (cell.hasSnake) {
      this.model.explodeSnake();
      this.view.renderBoard(this.model.cells, true);
      this.finishGame("snake");
      return;
    }

    if (!cell.hasMole) {
      return;
    }

    if (cell.moleTimeoutId !== null) {
      window.clearTimeout(cell.moleTimeoutId);
      cell.moleTimeoutId = null;
    }

    this.model.removeMole(cellId);
    this.model.incrementScore();

    this.view.setScore(this.model.score);
    this.view.updateCell(this.model.getCell(cellId));
  }

  timerStep() {
    const timeLeft = this.model.tickTimer();
    this.view.setTimer(timeLeft);

    if (timeLeft === 0) {
      this.finishGame("time");
    }
  }
}

const model = new GameModel();
const view = new GameView();
const controller = new GameController(model, view);

if (typeof window !== "undefined") {
  window.whacAMoleGame = controller;
}