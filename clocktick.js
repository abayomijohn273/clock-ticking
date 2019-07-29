//creating a clock ticking application using the functional programming paradigm making sure the program is immutable, its a pure function and take only one argument, or function and also use resursion instead of looping

//Build an clock ticking application 

//Using functional programming approach
const compose = (...fns) =>
(arg) =>
fns.reduce(
(composed, f) => f(composed),
arg
)

const oneSecond = () => 1000
const getCurrentTime = () => new Date()
//const clear = () => document.getElementById("showTime").clear()
const log = (message) => document.getElementById("showTime").innerText = message

//create three function to perform the operation
const serialTime = date => ({
  hours: date.getHours(),
    minute: date.getMinutes(), 
    seconds: date.getSeconds()
})

//function to append AM or PM
const appendApPm = clockTime => ({
  ...clockTime, 
    ampm: (clockTime.hours <=12) ? "AM":"PM"
})

//display
const display = target => time => target(time)

const formatClock = (format) => 
    time => format.replace("hh", time.hours)
                  .replace("mm", time.minute)
                  .replace("ss", time.seconds)
                  .replace("tt", time.ampm)


//prepend zero
const prependZero = key => clockTime => ({
    ...clockTime,
    [key]: (clockTime[key] < 10) ? "0" + clockTime[key] : clockTime[key]
})


//setting the main template with functions now
const convertTiCivilianTime = (clockTime) => 
    compose(appendApPm)(clockTime)

const doubleDigit = civilianTime => 
    compose(prependZero("hours"),
           prependZero("minute"),
           prependZero("seconds")
            )(civilianTime)


//start ticking
const startTicking = () =>
    setInterval(
        compose(
            getCurrentTime,
            serialTime,
            convertTiCivilianTime,
            doubleDigit,
            formatClock("hh:mm:ss:tt"),
            display(log)), oneSecond()
    )

startTicking()