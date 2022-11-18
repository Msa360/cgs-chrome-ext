
start();

function injection(creds) {
    // injects the green snag button
    const btn_ref = document.getElementsByClassName("pull-right")[1]
    const snag_btn = document.createElement('BUTTON');
    snag_btn.setAttribute("class", "btn btn-success ");
    snag_btn.setAttribute("type", "button");
    snag_btn.innerHTML = "snag";
    btn_ref.insertBefore(snag_btn, btn_ref.children[1]);

    snag_btn.addEventListener("click", () => {
        var answer = confirm("Are you sure you want this reservation? This will affect someone else's.");
        if (answer){
            update_reservation(creds);
        }
    });
}

function get_resourceId() {
    var resourceId = "";
    
    const char1 = document.getElementById("reservationDetails").getElementsByClassName("pull-left")[0].innerHTML[34];
    // char2 possibly a "-" character, depends if 1 or 2 digit number
    const char2 = document.getElementById("reservationDetails").getElementsByClassName("pull-left")[0].innerHTML[35];
    if (char2 === "-") {
        resourceId = char1; 
        var number = parseInt(resourceId);
    } else {
        resourceId = char1 + char2;
        var OG_number = parseInt(resourceId);
        var number = OG_number;
        if (OG_number > 25) {
            number += 208;
        } 
        if (OG_number > 60) {
            number += 144;
        }
    }
    // 4745+i pour le slot
    return (number+4745).toString()
}

function get_credentials(uid) {
    //"userId": document.getElementById("userId").value,
    var creds = {
        "userId": uid,
        "beginDate": document.getElementById("formattedBeginDate").value,
        "beginPeriod": document.getElementById("BeginPeriod").value,
        "endDate": document.getElementById("formattedEndDate").value,
        "endPeriod": document.getElementById("EndPeriod").value,
        "scheduleId": "64", // the sport id
        "resourceId": get_resourceId(),
        "reservationTitle": "",
        "reservationDescription": "",
        "reservationId": document.getElementsByName("reservationId")[0].value,
        "referenceNumber": document.getElementById("referenceNumber").value,
        "reservationAction": document.getElementsByName("reservationAction")[0].value,
        "seriesUpdateScope": document.getElementById("hdnSeriesUpdateScope").value,
        "CSRF_TOKEN": document.getElementById("csrf_token").value
    };
    var form = new FormData();
    form.append("userId", creds["userId"]);
    form.append("beginDate", creds["beginDate"]);
    form.append("beginPeriod", creds["beginPeriod"]);
    form.append("endDate", creds["endDate"]);
    form.append("endPeriod", creds["endPeriod"]);
    form.append("scheduleId", creds["scheduleId"]);
    form.append("resourceId", creds["resourceId"]);
    form.append("reservationTitle", creds["reservationTitle"]);
    form.append("reservationDescription", creds["reservationDescription"]);
    form.append("reservationId", creds["reservationId"]);
    form.append("referenceNumber", creds["referenceNumber"]);
    form.append("reservationAction", creds["reservationAction"]);
    form.append("seriesUpdateScope", creds["seriesUpdateScope"]);
    form.append("CSRF_TOKEN", creds["CSRF_TOKEN"]);

    return form;
}


function start() {
    var uid = "";
    chrome.storage.sync.get(['userID'], function(result) {
        console.log('Value currently is ' + result.userID);
        uid = result.userID;
        const creds = get_credentials(uid)
        injection(creds)
    });
}



function update_reservation(creds) {
    fetch("https://scop.cegep-ste-foy.qc.ca/booked/Web/ajax/reservation_update.php", {
        method: "POST",
        body: creds,
        credentials: 'include'
    }).then((response) => 
        response.text()
    ).then((result) => {
    const parser = new DOMParser();
    const r = parser.parseFromString(result, 'text/xml');
    try {
        var node = r.getElementById("created-message");
        var server_msg = node.textContent || node.innerText;
    } catch (error) {
        try {
            var node = r.getElementById("failed-message");
            var msg = node.textContent || node.innerText;
            var node2 = r.getElementsByClassName("error")[1];
            var msg2 = node2.textContent || node2.innerText;
            var server_msg = msg.trim() + "! " + msg2.trim(); 
        } catch (error) {
            var server_msg = "An error happened. It may be caused by an invalid userID."
        }
        
    }
    alert(server_msg);
    });
}



// might have to delete
// chrome.runtime.sendMessage({greeting: creds}, function(response) {
//     console.log(response.farewell);
//     console.log(response.resp);
// });


