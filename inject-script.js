

window.addEventListener("load", main, false);

function main() {
    // this function asserts that every react component is loaded
    
    var jsInitChecktimer = setInterval(checkForJS_Finish, 111);

    function checkForJS_Finish() {
        if (typeof csrf != "undefined") {
            if (document.querySelector("#reservation-title")) {
                // if this id exists then it is the user's own reservation so no inject
                clearInterval(jsInitChecktimer);
            } else if (document.getElementsByClassName('alert alert-danger')[0]) {
                clearInterval(jsInitChecktimer);
                injection(); // entry point
            }
        } 
    }
}

function injection() {

    const main_div = document.getElementById('react-root');
    const alert_div = main_div.getElementsByClassName('alert alert-danger')[0];
    const redeem_btn = document.createElement('BUTTON');
    redeem_btn.setAttribute("class", "btn btn-success ");
    redeem_btn.setAttribute("type", "button");
    redeem_btn.innerHTML = "redeem";
    alert_div.innerHTML = alert_div.innerHTML + " but with CGS you can redeem it ";
    alert_div.appendChild(redeem_btn);


    redeem_btn.addEventListener("click", () => {
        var answer = confirm("Are you sure you want this reservation? This will affect someone else's.");
        if (answer) {
            get_resourceId((residlist) => {
                get_res_info(get_refnum(), residlist, (data) => {
                    update_reservation(data);
                });
            });
        }
    });
}

/*
    Here are constants useful declared by the page where this script is executed (https://scop-sas.csfoy.ca/booked_sas/Web/reservation/?rn=*)
    const csrf = "MTViZjY0OTg3MjU1ZThlMGQzYTcwYwMWY4MDM0N2M=";
    const userId = 13593;
*/

function date_convert(date, time) {
    // used for reservation requests body
    // params: date is (yyyy-mm-dd), time is (HH:MM)
    var offset = new Date().getTimezoneOffset() / 60;
    if (offset > 0) {var sign = "-";} else {var sign = "+"}
    offset = zero_pad_before(offset.toString(), 2)
    date = new Date(`${date}T${time}:00${sign}${offset}:00`);
    return date.toISOString();
}

function zero_pad_before(data, length) {
    // length is the desired total length of data so zero_pad("12", 4) -> "0012"
    if (data.length >= length) {
        return data;
    } else {
        return "0".repeat(length - data.length) + data;
    }
}

function get_refnum() {
    return document.documentURI.split("rn=")[1];
}

function get_resourceId(callback) {
    resid_list = []
    fetch("https://scop-sas.csfoy.ca/booked_sas/Web/api/resources.php?api=tree&sid=64", {
        method: "GET",
        headers: {"X-Csrf-Token": csrf} // le csrf est dispo dans la page meme
    }).then((response) => 
        response.json()
    ).then((result) => {
        result['data']['resources'].forEach(element => {
            resid_list.push(element['id'])
        });
        callback(resid_list);
    });
}

function get_res_info(refnum, resource_array, callback) {
    
    var current_date = new Date();
    var current_date_string = String(current_date.getFullYear()) +"-"+ zero_pad_before(String(current_date.getMonth()+1), 2) +"-"+ zero_pad_before(String(current_date.getDate()), 2);
    
    var end_date = new Date(current_date);
    end_date.setDate(end_date.getDate() + 7);
    var end_date_string = String(end_date.getFullYear()) +"-"+ zero_pad_before(String(end_date.getMonth()+1), 2) +"-"+ zero_pad_before(String(end_date.getDate()), 2);


    var form = new FormData();
    form.append("beginDate", current_date_string);
    form.append("endDate", end_date_string);
    form.append("scheduleId", "64");
    form.append("MIN_CAPACITY", "");
    form.append("RESOURCE_TYPE_ID", "");
    for (let i = 0; i < resource_array.length; i++) {
        form.append("resourceId[]", resource_array[i]);
    }
    form.append("userId", "");


    // fetch reservations and find the matching one to see its data
    fetch("https://scop-sas.csfoy.ca/booked_sas/Web/schedule.php?dr=reservations", {
        method: "POST",
        body: form,
        credentials: 'include'
    }).then((response) => 
        response.json()
    ).then((result) => {
        let found = false;
        result.forEach(element => {
            if (element.ReferenceNumber === refnum) {
                found = true;
                callback(element);
            }
        });
        if (found === false) {
            alert("Unable to find data, reservation may be expired, or more than 7 days in the future.");
        }
    });
}

function update_reservation(reservation_data) {
    // make the reservation string with the reservation data
    reservation_string = `{"reservation":{"referenceNumber":"${reservation_data.ReferenceNumber}","ownerId":${userId},"resourceIds":[${reservation_data.ResourceId}],"accessories":[],"title":"","description":null,"start":"${date_convert(reservation_data.StartDateString, reservation_data.StartTime)}","end":"${date_convert(reservation_data.EndDateString, reservation_data.EndTime)}","recurrence":{"type":"none","interval":1,"weekdays":null,"monthlyType":null,"terminationDate":null,"repeatDates":[]},"startReminder":null,"endReminder":null,"inviteeIds":[],"coOwnerIds":[],"participantIds":[],"guestEmails":[],"participantEmails":[],"allowSelfJoin":false,"attachments":[],"requiresApproval":false,"checkinDate":null,"checkoutDate":null,"termsAcceptedDate":null,"attributeValues":[],"meetingLink":null},"retryParameters":[],"updateScope":"full"}`;

    let form = new FormData();
    form.append("request", reservation_string);

    fetch("https://scop-sas.csfoy.ca/booked_sas/Web/api/reservation.php?action=update", {
        method: "POST",
        body: form,
        credentials: 'include',
        headers: {"X-Csrf-Token": csrf}
    }).then((response) => 
        response.text()
    ).then((raw_result) => {
        const result = JSON.parse(raw_result);
        if (result.success === true) {
            if (result.data.success === true) {
                alert("The reservation was successfully updated!");
                location.reload();
            } else {
                result.data.errors.forEach(err => {
                    alert(err);
                });
            }
        } else {
            alert(`An unexpected error happened!\nThe website might have changed, contact CGS administrator for help.\nError message: ${result.errors}`);
        }
    });
}
