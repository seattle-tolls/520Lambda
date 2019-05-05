const cheerio = require('cheerio')
const fetch = require('node-fetch')

const getTodayInfo = require('./api/lib/getTodayInfo')
const getParsedWebData = require('./api/lib/getParsedWebData')

const toolLink = process.env.TOLL_URI

exports.handler = async(event) => {

  const todayInfo = getTodayInfo()

  const link = await fetch(toolLink)
  const buff = await link.buffer()
  const html = await buff.toString()

  const $ = cheerio.load(html)
  const rawTable = $('table').find('tbody')[Number(todayInfo.isWeekendOrHoliday)]
  const todaySchedule = getParsedWebData(rawTable)


  const response = {
    statusCode: 200,
    headers:{
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,

    },
    body:{
      todayInfo,
      todaySchedule,
    },
  }

  return JSON.stringify(response)
}

