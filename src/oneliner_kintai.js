const logger = require('./kintai_logger')

class OnelinerKintai { 
  constructor() {
    this.logger = new logger();
    this.commands = [
      {
        name: this.shukkin.name,
        description: "出勤する"
      },
      {
        name: this.taikin.name,
        description: "退勤する"
      },
      {
        name: this.riseki.name,
        description: "離席する"
      },
      {
        name: this.chakuseki.name,
        description: "着席する"
      }
    ];
  }

  call(func_name, args) {
    switch (func_name) {
      case this.shukkin.name:
        return this.shukkin();
      case this.taikin.name:
        return this.taikin();
      case this.riseki.name:
        return this.riseki();
      case this.chakuseki.name:
        return this.chakuseki();
    }
  }

  shukkin() {
    this.logger.write_log("shukkin");
    return "出勤を記録しました"
  }

  taikin() {
    if (this.logger.latest().action == "riseki") {
      this.logger.write_log("chakuseki");
    }
    this.logger.write_log("taikin");

    let da = this.logger.daily_analytics();
    return "退勤を記録しました\n" +
      "本日の出勤時刻:" + new Date(da.start_time).toLocaleTimeString() + "\n" +
      "本日の退勤時刻:" + new Date(da.end_time).toLocaleTimeString() + "\n" +
      "作業時間:" + this.time_format(da.work_time) + "\n" +
      "休憩時間時間:" + this.time_format(da.rest_time);
  }

  riseki() {
    this.logger.write_log("riseki");
    return "離席中"
  }

  chakuseki() {
    this.logger.write_log("chakuseki");
    return "離席を解除しました"
  }

  time_format(timestamp) {
    let hour = Math.floor(timestamp / 1000 / 60 / 60);
    let min = Math.floor(timestamp / 1000 / 60);
    let sec = Math.floor(timestamp / 1000);
    return hour + "時間" + (min % 60) + "分" + (sec % 60) + "秒";
  }
}

module.exports = OnelinerKintai;