import { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Log from "./components/Log";
import Player from "./components/Player";
import ScoreBoard from "./components/ScoreBoard";
import GameModeSelector from "./components/GameModeSelector";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import { getRandomMove, getBestMove } from "./ai";

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
  const [gameMode, setGameMode] = useState(() => {
    try {
      const saved = localStorage.getItem("tic-tac-toe-mode");
      return saved || "pvp";
    } catch {
      return "pvp";
    }
  });
  const [isBotThinking, setIsBotThinking] = useState(false);

  const [players, setPlayers] = useState(() => {
    try {
      const saved = localStorage.getItem("tic-tac-toe-players");
      return saved ? JSON.parse(saved) : PLAYERS;
    } catch {
      return PLAYERS;
    }
  });
  const [scores, setScores] = useState(() => {
    try {
      const saved = localStorage.getItem("tic-tac-toe-scores");
      return saved ? JSON.parse(saved) : { X: 0, O: 0, draws: 0 };
    } catch {
      return { X: 0, O: 0, draws: 0 };
    }
  });
  const [showGameOver, setShowGameOver] = useState(false);

  useEffect(() => {
    localStorage.setItem("tic-tac-toe-scores", JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    localStorage.setItem("tic-tac-toe-players", JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem("tic-tac-toe-mode", gameMode);
  }, [gameMode]);

  const displayedPlayers = {
    X: players.X,
    O:
      gameMode === "pvp"
        ? players.O
        : gameMode === "easy"
        ? "Bot (Easy)"
        : "Bot (Hard)",
  };

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const { winner, winningSquares } = deriveWinner(gameBoard, displayedPlayers);
  const hasDraw = gameTurns.length === 9 && !winner;

  // Lượt chơi của Bot (AI)
  useEffect(() => {
    if (gameMode === "pvp") return;
    if (activePlayer !== "O") return;
    if (winner || hasDraw) return;

    setIsBotThinking(true);

    const timer = setTimeout(() => {
      const currentBoard = deriveGameBoard(gameTurns);
      let aiMove = null;

      if (gameMode === "easy") {
        aiMove = getRandomMove(currentBoard);
      } else if (gameMode === "hard") {
        aiMove = getBestMove(currentBoard, "O", "X");
      }

      if (aiMove) {
        handleSelectSquare(aiMove.row, aiMove.col);
      }
      setIsBotThinking(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [activePlayer, gameMode, winner, hasDraw, gameTurns]);

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
    const { winner: roundWinner } = deriveWinner(
      updatedBoard,
      displayedPlayers
    );

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
    setIsBotThinking(false);
  };

  const handleModeChange = (newMode) => {
    setGameMode(newMode);
    setGameTurns([]);
    setShowGameOver(false);
    setIsBotThinking(false);
  };

  const handleUndo = () => {
    if (gameTurns.length === 0 || winner || hasDraw || isBotThinking) return;

    if (gameMode !== "pvp") {
      // Khi chơi với Máy: lùi 2 nước để trả lại lượt cho Người chơi
      if (gameTurns.length >= 2) {
        setGameTurns((prevTurns) => prevTurns.slice(2));
      } else {
        setGameTurns((prevTurns) => prevTurns.slice(1));
      }
    } else {
      setGameTurns((prevTurns) => prevTurns.slice(1));
    }
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
        <GameModeSelector
          gameMode={gameMode}
          onChangeMode={handleModeChange}
        />
        <ScoreBoard
          scores={scores}
          players={displayedPlayers}
          onResetScores={handleResetScores}
        />
        <ol id="players" className="highlight-player">
          <Player
            initialName={displayedPlayers.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            key={gameMode}
            initialName={displayedPlayers.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        <div id="game-controls">
          <button
            type="button"
            className="undo-btn"
            onClick={handleUndo}
            disabled={
              gameTurns.length === 0 || !!winner || hasDraw || isBotThinking
            }
          >
            ↩ Undo Move
          </button>
          {isBotThinking && (
            <span className="bot-thinking">🤖 Bot is thinking...</span>
          )}
        </div>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
          winningSquares={winningSquares}
          disabled={
            isBotThinking || (gameMode !== "pvp" && activePlayer === "O")
          }
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
