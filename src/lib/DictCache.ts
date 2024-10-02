
// Dictionary tree structure to optimize incremental string searching.
export class DictCache {
  root = new DictNode();
  all: BoolMap = {};

  // strList is a \n separated list of words.
  // all words will be converted to lowercase.
  // non alpha - numeric characters will be removed.
  constructor(strList: string) {
    // split and sanitize word list
    // TODO add more validation
    let entries = strList
      .split("\n")
      .filter(f => f)
      .map(v => DictCache.allowOnlyAlphaNumeric(v).toLowerCase());

    // insert each word into dictionary tree
    for (let e of entries) {
      this.root.insert(e, e, this.all);
    }
  }

  static allowOnlyAlphaNumeric(str) {
    return str.replace(/[^a-z0-9]/gi, '');
  }
}

// A node in the dictionary tree
//  contains optionally children and/or leaf data (words)
export class DictNode {
  children?
  value: string;

  insert(word: string, remainingWord: string, all: BoolMap) {
    // Ensure child node exists
    let key = remainingWord[0];
    if (!this.children)
      this.children = {};
    let n = this.children[key];
    if (!n) {
      n = new DictNode();
      this.children[key] = n;
    }

    // recurse or leaf
    if (remainingWord.length > 1)
      n.insert(word, remainingWord.substring(1), all);
    else {
      n.value = word; // leaf
      all[word] = true;
    }
  }
}

export interface IStringMap<T> {
  [key: string]: T;
}
export type StringMap = IStringMap<string>;
export type BoolMap = IStringMap<boolean>;
