import { english10000 } from './english10000';
import { BoolMap, DictCache, DictNode } from './DictCache';
import { measureExecutionTime } from './measureExecutionTime';

export class BoggleController {
  public readonly DefaultBoard = "cato\nodog\nbrat\nnrab";

  board = this.DefaultBoard;
  boardSize = 4;
  dict = english10000;
  results = "";
  dictSize: string = "";
  cache: DictCache = null;

  init() {
    this.cacheDict();
    this.refreshResults();
  }

  randomize() {
    this.board = BoggleController.generateRandomString(this.boardSize);
    this.refreshResults();
  }

  cacheDict() {
    let duration = measureExecutionTime(() => {
      this.cache = new DictCache(this.dict);
    });
    this.dictSize = `${Object.keys(this.cache.all).length} entries. ${duration.toFixed(2)}ms.`;
  }

  refreshResults() {
    let matches;
    let duration = measureExecutionTime(() => {
      matches = BoggleController.boggle(this.board, this.cache);
    });
    this.results = JSON.stringify(Object.keys(matches as any).sort(), null, 4) + ` ${duration.toFixed(2)}ms.`;
  }

  static boggle(board: string, cache: DictCache) {
    board = DictCache.allowOnlyAlphaNumeric(board).toLowerCase();

    if (board.length != 16) {
      throw new Error("Expected board size of 16");
    }

    let matches = {};

    for (let a = 0; a < board.length; ++a) {
      BoggleController.searchBoard(board, 4, [a], matches, cache.root);
    }

    return matches;
  }

  static generateRandomString(size) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < size; i++) {
      let randomString = '';
      for (let j = 0; j < size; j++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      result += randomString + '\n';
    }
    return result;
  }

  static *makeSearches(i, size) {
    let x = i % size;
    let y = Math.floor(i / size);
    for (let dx = -1; dx <= 1; ++dx)
      for (let dy = -1; dy <= 1; ++dy) {
        let nx = x + dx;
        let ny = y + dy;
        if (nx >= 0 && nx < size && ny >= 0 && ny < size)
          yield ny * size + nx;
      }
  }

  // Recursively traverses the board extending a word path following the Boggle rules.
  static searchBoard(board: string, boardSize: number, path: number[], matches: BoolMap, cache: DictNode) {
    // get the char from the board at the search position
    let i = path[path.length - 1];
    let key = board[i];

    // search
    let n = cache.children[key];
    if (n) {
      let val = n.value;
      if (val?.length > 2) { // boggle matches must be 3char or longer
        matches[val] = true;
      }

      if (n.children) {
        // keep searching
        let searches = [...BoggleController.makeSearches(i, boardSize) as any];
        for (let newI of searches) {
          if (!path.includes(newI)) {
            // havent visited this yet
            BoggleController.searchBoard(board, boardSize, [...path, newI], matches, n);
          }
        }
      }
    }
  }
}
