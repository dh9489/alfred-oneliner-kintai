
const storage = require("./tsv")

class KintaiLogger{
  constructor() {
    this.storage = new storage();
    this.refresh_log();
  }

  write_log(action, message) {
    var timestamp = Date.now();
    this.storage.write(timestamp, action, message);
    this.refresh_log();
  }
  refresh_log() {
    this.logs = this.parse_array(this.storage.load()); 
    this.logs.sort((a, b) => { return b.timestamp - a.timestamp });
  }

  daily_logs() {
    let start_idx = this.logs.findIndex((log) => log.action == "taikin");
    let end_idx = this.logs.findIndex((log) => log.action == "shukkin");
    return this.logs.slice(start_idx, end_idx+1)
  }

  daily_analytics() {
    let logs = this.daily_logs();
    let start_time = new Date(logs[logs.length - 1].timestamp);
    let end_time = new Date(logs[0].timestamp);
    let total_time = end_time - start_time;
    let rest_time = 0
    let _rest_end_time;
    logs.forEach(element => {
      if (element.action == "chakuseki") {
        _rest_end_time = element.timestamp;
      } else if (element.action == "riseki") {
        rest_time += _rest_end_time - element.timestamp;
      }
    });
    let work_time = total_time - rest_time;

    return {
      start_time: start_time,
      end_time: end_time,
      total_time: total_time,
      work_time: work_time,
      rest_time: rest_time,
    }
  }

  latest_of(action) {
    let log = this.logs.find((log) => log.action == action);
    if (log) { return this.parse(log); }
    return null
  }
  latest() {
    return this.parse(this.logs[0]);
  }

  parse(log) {
    return {
      timestamp: parseInt(log[0],10),
      action: log[1],
      message: log[2],
    }
  }
  parse_array(logs) {
    return logs.map(log=>{return this.parse(log)})
  }
}


module.exports = KintaiLogger;