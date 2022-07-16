function myFunction() {
    var txt = "";
    if (document.getElementById("time").validity.rangeOverflow) {
        txt = "Enter Valid Time In 24 Hour Format";
    } else {
        main();
    }
    document.getElementById("demo").innerHTML = txt;
}

function main() {
    let d = new Date();
    let day = document.getElementById("day").value
    if (day == 'Saturday' || day == 'Sunday') {
        document.getElementById('result').innerHTML = 'Closed'
        return;
    }

    let hour = document.getElementById("time").value

    let MonToFri = { start: 7, end: 5 };


    var cal = (Math.abs((hour - MonToFri.end)));

    if (day == 6 || day == 7) {
        document.getElementById('result').innerHTML = 'Closed'
        return;
    }
    if (MonToFri.start > hour) {
        if (hour > MonToFri.end) {
            document.getElementById('result').innerHTML = 'Closed'
        }
    }
    if (MonToFri.end > MonToFri.start && MonToFri.start > hour) {
        document.getElementById('result').innerHTML = 'Closed'
    }
    else
        if (hour >= MonToFri.start && hour <= MonToFri.end) {
            document.getElementById('result').innerHTML = ("Shop wil close in " + Math.abs((hour - MonToFri.end)))
        }
        else if (hour < MonToFri.end) {
            if (hour < MonToFri.end) {
                document.getElementById('result').innerHTML = ("Shop wil close in " + Math.abs((hour - MonToFri.end)))
            }
            else
                document.getElementById('result').innerHTML = 'Closed'
        }
        else if (hour < (MonToFri.start || hour > MonToFri.start) && hour == MonToFri.end) {
            document.getElementById('result').innerHTML = 'Closed'
        } else if (MonToFri.start > MonToFri.end) {
            document.getElementById('result').innerHTML = ("Shop wil close in " + (24 - Math.abs((hour - MonToFri.end))))

        } else {
            document.write('Closed')
        }
}
