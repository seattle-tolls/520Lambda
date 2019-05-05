const getChildrenArray = () => {
  return child => child.children
    .filter((child) => child.type === 'tag')
    .map(child => child.children[1].children[0].data)
}

const getReducedArray = () => {
  return (curr, next) => {
    let [schedule, goodToGo, payByMail] = next
    let hour
    let firstHour = schedule.split('to')[0].trim().split(' ')
    if(schedule.includes('Midnight')){
      hour = 0
    }
    else if(firstHour[1].includes('p')){
      hour = parseInt(firstHour[0]) + 12
    }
    else hour = parseInt(firstHour[0])
    return curr = {
      ...curr,
      [hour]:{
        schedule,
        goodToGo,
        payByMail,
      },
    }
  }
}

const parsedData = (data) => {
  return data.children
    .map(getChildrenArray()
    )
    .filter((child, i)=> i !== 0)
    .reduce(getReducedArray(), {})
}

module.exports = (table) =>{
  return parsedData(table)
}