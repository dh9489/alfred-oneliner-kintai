const oneliner_kintai = require("./oneliner_kintai")

let query = process.argv[2];
let arg_command_name = query.split(" ")[0];
let arg_command_args = query.split(" ").splice(1);

let kintai = new oneliner_kintai();
let message = kintai.call(arg_command_name, arg_command_args)
console.log(message)

