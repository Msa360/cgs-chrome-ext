console.log("I am here");

function injection() {
    // inject snag button
    const btn_ref = document.getElementsByClassName("pull-right")[1]
    const snag_btn = document.createElement('BUTTON');
    snag_btn.setAttribute("class", "btn btn-success ");
    snag_btn.setAttribute("type", "button");
    snag_btn.innerHTML = "snag";
    btn_ref.insertBefore(snag_btn, btn_ref.children[1]);
}
injection();

function get_credentials() {
    //"userId": document.getElementById("userId").value,
    var creds = {
        "userId": "12493",
        "beginDate": document.getElementById("formattedBeginDate").value,
        "beginPeriod": document.getElementById("BeginPeriod").value,
        "endDate": document.getElementById("formattedEndDate").value,
        "endPeriod": document.getElementById("EndPeriod").value,
        "scheduleId": "64", // the sport id
        "resourceId": (parseInt(document.getElementById("reservationDetails").getElementsByClassName("pull-left")[0].innerHTML[34])+4745).toString(), // 4745+i pour le slot
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
const creds = get_credentials();
chrome.runtime.sendMessage({greeting: creds}, function(response) {
    console.log(response.farewell);
    console.log(response.resp);
});


// console.log(creds)
// fetch("https://scop.cegep-ste-foy.qc.ca/booked/Web/ajax/reservation_update.php", {
//     method: "POST",
//     body: creds,
//     credentials: 'include'
// }).then((response) => response.text()).then((result) => console.log(result));


// to prove it works !! (tested and it do work!)
// fetch("https://scop.cegep-ste-foy.qc.ca/booked/Web/dashboard.php", {
//     method: "GET",
//     // headers: {
//     //   "hworld": "wasssup"
//     // },
//     //body: JSON.stringify(creds),
//     credentials: 'include'
// }).then((response) => response.text()).then((result) => console.log(result));


