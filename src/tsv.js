var fs = require('fs');
var path = require('path');
var filepath = path.join(process.cwd(), "logs", "kintai_log.tsv");


class TSV {
  constructor() {
    
  }

  write(...args) {
    var line = args.join('\t') + '\n';
    fs.writeFileSync(filepath, line, { encoding: 'utf-8', flag: 'a' });
  }

  load() {
    var text = fs.readFileSync(filepath, "utf-8");
    var tsv_array = text.split('\n').map(function (row) {
      return row.split('\t');
    });
    tsv_array.pop();
    return tsv_array;    
  }
}


module.exports = TSV;