/*



*/

import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cell: {
    height: theme.spacing(7),
    width: theme.spacing(7),
    // backgroundColor: 'red',
    border: '1px solid black', 
  },
  board: {
    display: "flex",
    flexDirection: "column",
  },
  colorInput: {
    border: '1px solid black'
  }
}))

const DEFAULT_BOARD = Array(10).fill(0).map(r => Array(10).fill(''));

function Cell({ coords, backgroundColor, paintCell }){
  const classes = useStyles();

  return (
    <Box onClick={() => paintCell(coords[0], coords[1])} className={classes.cell} style={{backgroundColor}}></Box>
  )
}

function Board(){
  const [board, setBoard] = useState(null);
  const [cellColor, setCellColor] = useState('');

  const classes = useStyles();
  const styles = {
    display: 'grid',
    gridTemplateColumns: (board ? `repeat(${board[0].length}, min-content)` : 0),
  }

  useEffect(() => {
    setBoard(DEFAULT_BOARD);
  }, [])
  
  function paintCell(r, c){
    const newBoard = [...board];
    const newRow = [...newBoard[r]];
    newRow[c] = cellColor; 
    newBoard[r] = newRow;
    setBoard(newBoard);
  } 

  return (
    <Box className={classes.board}>
      <TextField 
        fullwidth="true"
        className={classes.colorInput}
        value={cellColor}
        onChange={(e) => setCellColor(e.target.value)}></TextField>
      <Box style={styles}>
        {board ? board.map((row, r) => row.map((col, c) => <Cell key={`${r}-${c}`} coords={[r, c]} backgroundColor={board[r][c]} paintCell={paintCell}/>)) : null}
      </Box>
    </Box>
  )
}

function App() {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <header className="App-header">
        <Typography variant='h1' component='h1'>PIXEL PAINT</Typography>
      </header>
      <Board />
    </div>
  );
}

export default App;
