const alfy = require('alfy');
const oneliner_kintai = require('./oneliner_kintai');


let query = process.argv[2];
let arg_command_name = query.split(" ")[0];
// let arg_command_args = query.split(" ").splice(1);

var kintai = new oneliner_kintai();

const items = alfy
    .matches(arg_command_name, kintai.commands, 'name')
    .map((elm) => ({
      title: elm.name,
      subtitle: elm.description,
      arg: elm.name,
    }));

alfy.output(items);
