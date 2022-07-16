let myshop = {
    1: `close`, //sunday
    2: `${8} ${2}`, //monday
    3: `${9} ${8}`, //tuesday
    4: `${9} ${9}`, //wednesday
    5: `${9} ${1}`, //thursday
    6: `${12} ${18}`, //friday
    7: `${8} ${1}`  //saturday
}
let arr = []
const getDay = () => document.getElementById('day').value
const calc = () => {
    let day = getDay()
    let shour = parseInt(document.getElementById('shour').value)
    let smin = parseInt(document.getElementById('smin').value)
    let ehour = parseInt(document.getElementById('ehour').value)
    let emin = parseInt(document.getElementById('emin').value)
    let msg = document.getElementById('message')
    let [start, end] = myshop[day].split(' ').map(Number)

    let i = start
    while (i != end) {
        if (i >= 24) {
            i = i % 24
        }
        arr.push(i)
        i = i + 1
    }
    arr.push(i)
    console.log(arr)
    if (start == end) {
        msg.innerHTML = `hurray we are open 24/7`
    }

    else if (Math.abs(shour - ehour) == 1) {
        if (shour > end) {
            rem = 24 - (shour - end)
        } else {
            rem = end - shour
        }
        msg.innerHTML = `closing in ${rem} hours`
    }

    else if (arr.includes(shour) && arr.includes(ehour)) {
        msg.innerHTML = `i am open`
    }

    else if (arr.includes(shour)) {
        if (shour > end) {
            if (smin == 0) {
                rem = 24 - (shour - end)
                m = 0
            }
            else {
                m = 60 - smin
                rem = 24 - (shour - end) - 1
            }
        } else {
            if (smin == 0) {
                rem = end - shour
                m = 0
            }
            else {
                m = 60 - smin
                rem = end - shour - 1
            }
        }
        msg.innerHTML = `closing in ${rem} hours & ${m} minutes`
    }

    else if (arr.includes(ehour)) {
        if (shour > start) {
            if (smin == 0) {
                rem = 24 - shour - start
                m = 0
            }
            else {
                m = 60 - smin
                rem = 24 - shour - start - 1
            }
        } else {
            if (smin == 0) {
                rem = start - shour
                m = 0
            }
            else {
                m = 60 - smin
                rem = start - shour - 1
            }
        }
        msg.innerHTML = `opening in ${rem} hours ${m}`
    }

    else {
        msg.innerHTML = `we are closed during these hours`
    }

}