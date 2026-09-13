import { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Log from "./components/Log";
import Player from "./components/Player";
import ScoreBoard from "./components/ScoreBoard";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
};

const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
};

const deriveWinner = (gameBoard, players) => {
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      return {
        winner: players[firstSquareSymbol],
        winningSquares: combination,
      };
    }
  }

  return { winner: null, winningSquares: [] };
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [showGameOver, setShowGameOver] = useState(false);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const { winner, winningSquares } = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  useEffect(() => {
    if (winner || hasDraw) {
      const timer = setTimeout(() => {
        setShowGameOver(true);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setShowGameOver(false);
    }
  }, [winner, hasDraw]);

  const handleSelectSquare = (rowIndex, colIndex) => {
    if (winner || hasDraw) return; // Block click if game over

    const currentPlayer = deriveActivePlayer(gameTurns);
    const updatedTurns = [
      { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
      ...gameTurns,
    ];

    const updatedBoard = deriveGameBoard(updatedTurns);
    const { winner: roundWinner } = deriveWinner(updatedBoard, players);

    setGameTurns(updatedTurns);

    if (roundWinner) {
      setScores((prevScores) => ({
        ...prevScores,
        [currentPlayer]: prevScores[currentPlayer] + 1,
      }));
    } else if (updatedTurns.length === 9) {
      setScores((prevScores) => ({
        ...prevScores,
        draws: prevScores.draws + 1,
      }));
    }
  };

  const handleRestart = () => {
    setGameTurns([]);
    setShowGameOver(false);
  };

  const handleResetScores = () => {
    setScores({ X: 0, O: 0, draws: 0 });
  };

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ScoreBoard
          scores={scores}
          players={players}
          onResetScores={handleResetScores}
        />
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
          winningSquares={winningSquares}
        />
        {showGameOver && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
