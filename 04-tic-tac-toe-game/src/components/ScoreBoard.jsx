export default function ScoreBoard({ scores, players, onResetScores }) {
  const hasScores = scores.X > 0 || scores.O > 0 || scores.draws > 0;

  return (
    <div id="scoreboard">
      <div className="score-item score-x">
        <span className="score-label">{players.X} (X)</span>
        <span className="score-value">{scores.X}</span>
      </div>
      <div className="score-item score-draw">
        <span className="score-label">Draws</span>
        <span className="score-value">{scores.draws}</span>
      </div>
      <div className="score-item score-o">
        <span className="score-label">{players.O} (O)</span>
        <span className="score-value">{scores.O}</span>
      </div>
      {hasScores && (
        <button
          type="button"
          className="reset-scores-btn"
          onClick={onResetScores}
        >
          Reset Scores
        </button>
      )}
    </div>
  );
}
