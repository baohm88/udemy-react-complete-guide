import { WINNING_COMBINATIONS } from "./winning-combinations";

function checkWinner(board) {
  for (const combination of WINNING_COMBINATIONS) {
    const first = board[combination[0].row][combination[0].column];
    const second = board[combination[1].row][combination[1].column];
    const third = board[combination[2].row][combination[2].column];

    if (first && first === second && first === third) {
      return first;
    }
  }
  return null;
}

export function getAvailableMoves(board) {
  const moves = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[r][c] === null) {
        moves.push({ row: r, col: c });
      }
    }
  }
  return moves;
}

export function getRandomMove(board) {
  const available = getAvailableMoves(board);
  if (available.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}

function minimax(board, depth, isMaximizing, aiPlayer, humanPlayer) {
  const winner = checkWinner(board);
  if (winner === aiPlayer) return 10 - depth;
  if (winner === humanPlayer) return depth - 10;

  const available = getAvailableMoves(board);
  if (available.length === 0) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const move of available) {
      board[move.row][move.col] = aiPlayer;
      const score = minimax(board, depth + 1, false, aiPlayer, humanPlayer);
      board[move.row][move.col] = null;
      bestScore = Math.max(bestScore, score);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const move of available) {
      board[move.row][move.col] = humanPlayer;
      const score = minimax(board, depth + 1, true, aiPlayer, humanPlayer);
      board[move.row][move.col] = null;
      bestScore = Math.min(bestScore, score);
    }
    return bestScore;
  }
}

export function getBestMove(board, aiPlayer = "O", humanPlayer = "X") {
  const available = getAvailableMoves(board);
  if (available.length === 0) return null;

  // Tối ưu nước đầu nếu bàn cờ trống: chọn ô trung tâm
  if (available.length === 9) {
    return { row: 1, col: 1 };
  }

  let bestScore = -Infinity;
  let bestMove = available[0];

  for (const move of available) {
    board[move.row][move.col] = aiPlayer;
    const score = minimax(board, 0, false, aiPlayer, humanPlayer);
    board[move.row][move.col] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}
