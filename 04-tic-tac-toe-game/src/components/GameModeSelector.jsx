export default function GameModeSelector({ gameMode, onChangeMode }) {
  return (
    <div id="game-mode-selector">
      <button
        type="button"
        className={gameMode === "pvp" ? "active" : undefined}
        onClick={() => onChangeMode("pvp")}
      >
        👥 2 Players
      </button>
      <button
        type="button"
        className={gameMode === "easy" ? "active" : undefined}
        onClick={() => onChangeMode("easy")}
      >
        🤖 Bot: Easy
      </button>
      <button
        type="button"
        className={gameMode === "hard" ? "active" : undefined}
        onClick={() => onChangeMode("hard")}
      >
        🧠 Bot: Hard
      </button>
    </div>
  );
}
