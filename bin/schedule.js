const schedule = require('node-schedule');

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0,1,2,3,4,5,6];
rule.hour = 8;
rule.minute = [0, new schedule.Range(1, 59)];
rule.second = [0, new schedule.Range(3, 53)];

const blast = () => {
  schedule.scheduleJob(rule, () => {
    console.log('blasting');
  });
}

module.exports = blast;
