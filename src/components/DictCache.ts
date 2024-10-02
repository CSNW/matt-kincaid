
export class DictCache {
  root = new DictNode();
  all: BoolMap = {};

  constructor(strVersion: string) {
    let entries = strVersion
      .split("\n")
      .filter(f => f)
      .map(v => DictCache.allowOnlyAlphaNumeric(v).toLowerCase());

    for (let e of entries) {
      this.root.insert(e, e, this.all);
    }
  }

  static allowOnlyAlphaNumeric(str) {
    return str.replace(/[^a-z0-9]/gi, '');
  }
}


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
