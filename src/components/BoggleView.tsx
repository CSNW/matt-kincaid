import React, { useState } from 'react';
import './BoggleView.css';

import { BoggleController } from './BoggleController';


function BoggleView() {
  const boggle = new BoggleController();
  boggle.init();

  const [results, setResults] = useState(boggle.results);
  const [board, setBoard] = useState(boggle.board);
  const [dictSize, setDictSize] = useState(boggle.dictSize);
  const [dict, setDict] = useState(boggle.dict);

  const handleClick = () => {
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
        <div>Board</div> 
        <button className="button" onClick={handleClick}>Randomize</button>
        
        <div>Board</div> 
        <textarea rows={5} value={board} onChange={boardChanged}></textarea>

        <div>
          Result: {results}
        </div>
        <div>
          Dict: {dictSize}
        </div>
        <textarea rows={5} value={dict} onChange={dictChanged}></textarea>    
      </div >
    </div>
  );
}

export default BoggleView;
