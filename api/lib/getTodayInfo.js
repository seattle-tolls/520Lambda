const d = new Date()
const hour = d.getHours()
const day = d.getDay()
const date= d.getDate()
const month= d.getMonth() + 1
const year = d.getFullYear()
const today = `${year}-${month}-${date}`

const daysNames = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday', 'Sunday',
]

let payload = {
  dayName: daysNames[day],
  isWeekendOrHoliday: day === 0 || day === 6,
  holidayName: null,
  hour,
}

const holidayList = {
  1: {
    name: 'New Years Day',
    dates: ['2020-1-1', '2021-1-1', '2022-1-1', '2023-1-1', '2024-1-1'],
  },
  5:{
    name: 'Memorial Day',
    dates: ['2019-5-27', '2020-5-25', '2021-5-31', '2022-5-30', '2023-5-29'],
  },
  7:{
    name: 'Independence Day',
    dates: ['2019-7-4', '2020-7-4', '2021-7-4', '2022-7-4', '2023-7-4'],
  },
  9: {
    name: 'Labor Day',
    dates: ['2019-9-2', '2020-9-7','2021-9-6', '2022-9-5', '2023-9-4'],
  },
  11: {
    name: 'Thanksgiving Day',
    dates: ['2019-11-28', '2020-11-26', '2021-11-25', '2022-11-24', '2023-11-23'],
  },
  12: {
    name: 'Christmas Day',
    dates: ['2019-12-25', '2020-12-25', '2021-12-25', '2022-12-25', '2023-12-25'],
  },
}

module.exports = () => {
  if(holidayList[month]){
    const { name, dates } = holidayList[month]
    for(let i=0; i < dates.length; i++){
      if(today === dates[i]){
        return (
          { ...payload, holidayName: name, isWeekendOrHoliday: true }
        )
      }
    }
  }

  return payload
}