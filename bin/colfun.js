module.exports = {
  log(msg) {
    console.log(`\n>> ${msg}\n`)
  },

  reqLog(req) {
    console.log(`\n>> Resquest: ${req}`)
  }
}
