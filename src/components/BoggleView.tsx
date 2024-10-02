
import './BoggleView.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';

import { BoggleController } from '../lib/BoggleController';

const boggle = new BoggleController();
boggle.init();

function BoggleView() {
  const [results, setResults] = useState(boggle.results);
  const [board, setBoard] = useState(boggle.board);
  const [dictSize, setDictSize] = useState(boggle.dictSize);
  const [dict, setDict] = useState(boggle.dict);

  const randomizeClicked = () => {
    boggle.randomize();
    setBoard(boggle.board);
    setResults(boggle.results);
  };

  const boardChanged = (v) => {
    boggle.board = v.currentTarget.value;
    boggle.refreshResults();
    setBoard(boggle.board);
    setResults(boggle.results);
  };

  const dictChanged = (v) => {
    boggle.dict = v.currentTarget.value;
    boggle.cacheDict();
    boggle.refreshResults();
    setDict(boggle.dict);
    setDictSize(boggle.dictSize);
    setResults(boggle.results);
  };

  return (
    <div className="BoggleView">
      <div className="fxColumns">
        <h1>Boggle</h1> 
        <div>
          <Link className="body1" href="https://en.wikipedia.org/wiki/Boggle#Rules" underline="hover">Boggle Rules</Link>
        </div>
        <div>
          <Link className="body1" href="https://github.com/mkjsdemo/games-demo" underline="hover">Source Code</Link>
        </div>
        
        <div className="body1">Try to find as many words as you can in the letter matrix below.</div>
        <ul className="body1">
          <li>Words must be at least three letters in length.</li>
          <li>Each letter after the first must be a horizontal, vertical, or diagonal neighbor of the one before it.</li>
          <li>No individual letter may be used more than once in a word.</li>
          <li>No capitalized or hyphenated words are allowed.</li>
        </ul>
        <h3>
          Board:
        </h3>
        <div className="body1">
          <textarea rows={4} cols={12} value={board} onChange={boardChanged}></textarea>
          <div><Button variant="contained" onClick={randomizeClicked}>Randomize</Button></div>
        </div>

        <h3>
          Results:
        </h3>
        <div className="body1">
          {results}
        </div>
        <h3>
          Dictionary:
        </h3>
        <ul className="body1">
          <li>Enter a new word on each line.</li>
          <li>All words will be converted to lowercase.</li>
          <li>Non alpha-numeric characters will be removed.</li>
        </ul>
        <div className="body1">
          {dictSize}
        </div>
        <textarea rows={100} cols={50} value={dict} onChange={dictChanged}></textarea>    
      </div >
    </div>
  );
}

export default BoggleView;
