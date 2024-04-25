import { useState } from 'react';
import { Box, Button, Grid, GridItem, Text, useToast } from '@chakra-ui/react';

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const toast = useToast();

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    const squares = board.slice();
    if (calculateWinner(board) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setBoard(squares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => (
    <Button onClick={() => handleClick(i)} size="lg" p={7} m={1}>
      {board[i]}
    </Button>
  );

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
    toast({
      title: status,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <Box textAlign="center" mt={10}>
      <Text fontSize="2xl" mb={4}>{status}</Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={1}>
        <GridItem>{renderSquare(0)}</GridItem>
        <GridItem>{renderSquare(1)}</GridItem>
        <GridItem>{renderSquare(2)}</GridItem>
        <GridItem>{renderSquare(3)}</GridItem>
        <GridItem>{renderSquare(4)}</GridItem>
        <GridItem>{renderSquare(5)}</GridItem>
        <GridItem>{renderSquare(6)}</GridItem>
        <GridItem>{renderSquare(7)}</GridItem>
        <GridItem>{renderSquare(8)}</GridItem>
      </Grid>
    </Box>
  );
};

export default Index;