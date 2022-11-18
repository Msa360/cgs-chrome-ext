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
    var creds = {
        //"userId": document.getElementById("userId").value,
        "userId": "12493",
        "start_date": document.getElementById("formattedBeginDate").value,
        "start_hour": document.getElementById("BeginPeriod").value,
        "end_date": document.getElementById("formattedEndDate").value,
        "end_hour": document.getElementById("EndPeriod").value,
        "scheduleId": 64, // the sport id
        "resourceId": (parseInt(document.getElementById("reservationDetails").getElementsByClassName("pull-left")[0].innerHTML[34])+4745).toString(), // 4745+i pour le slot
        "reservationId": document.getElementsByName("reservationId")[0].value,
        "referenceNumber": document.getElementById("referenceNumber").value,
        "reservationAction": document.getElementsByName("reservationAction")[0].value,
        "seriesUpdateScope": document.getElementById("hdnSeriesUpdateScope").value,
        "csrf_token": document.getElementById("csrf_token").value,
        "cookie": document.cookie
    };
    return creds;
}
const creds = get_credentials();
chrome.runtime.sendMessage({greeting: creds}, function(response) {
    console.log(response.farewell);
    console.log(response.resp);
});
// "https://www.youtube.com/watch?v=tc8DU14qX6I"
// "https://scop.cegep-ste-foy.qc.ca/booked/Web/ajax/reservation_update.php"
//https://scop.cegep-ste-foy.qc.ca/booked/Web/reservation.php?rn=6363d84aaa3eb195022897





