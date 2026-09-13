export default function GameBoard({
  onSelectSquare,
  board,
  winningSquares = [],
}) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => {
              const isWinningSquare = winningSquares.some(
                (square) =>
                  square.row === rowIndex && square.column === colIndex
              );

              return (
                <li key={colIndex}>
                  <button
                    onClick={() => onSelectSquare(rowIndex, colIndex)}
                    disabled={playerSymbol !== null}
                    className={isWinningSquare ? "highlight" : undefined}
                  >
                    {playerSymbol}
                  </button>
                </li>
              );
            })}
          </ol>
        </li>
      ))}
    </ol>
  );
}
