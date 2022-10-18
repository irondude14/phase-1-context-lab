/* Your Code Here */
function createEmployeeRecord(array) {
    const employeeRecord = {};
    employeeRecord.firstName = array[0];
    employeeRecord.familyName = array[1];
    employeeRecord.title = array[2];
    employeeRecord.payPerHour = array[3];
    employeeRecord.timeInEvents = [];
    employeeRecord.timeOutEvents = [];
    return employeeRecord;
}

function createEmployeeRecords(array) {
    let records = array.map(record => {
            return createEmployeeRecord(record);
        })
    return records
}

function createTimeInEvent(dateStamp) {
    const [date, time] = dateStamp.split(' ');
    this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(time, 10),
    date: date,
    });
    return this;
}

function createTimeOutEvent(dateStamp) {
    const [date, time] = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: date,
        });
    return this;
}

function hoursWorkedOnDate(date) {
    const hoursIn = () => {
        for (const timeEntreeIn of this.timeInEvents) {
                if (date === timeEntreeIn.date) {
                    return timeEntreeIn.hour
                }
            }   
        }
    const hoursOut = () => {
        for (const timeEntreeOut of this.timeOutEvents) {
                    if (date === timeEntreeOut.date) {
                        return timeEntreeOut.hour
                }
            } 
        }
    let hoursWorked = (hoursOut() - hoursIn());
    let numOfHours = hoursWorked.toString().substring(0, hoursWorked.toString().length - 2);
    return parseInt(numOfHours)           
}


function wagesEarnedOnDate(date) {
    // let hoursWorked = hoursWorkedOnDate(date);
    let pay = this.payPerHour;
    let wages = pay * hoursWorkedOnDate.call(this, date);
    return wages;
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    for (const name of srcArray) {
            if (name.firstName === firstName) {
                return name
            }
    }
    return undefined
}

function calculatePayroll(array) {
    let allWages = []
    for (const e of array) {
        allWages.push(allWagesFor.call(e))
    }
    let total = allWages.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    return total
}