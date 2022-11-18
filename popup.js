
chrome.storage.sync.get(['userID'], function(result) {
    console.log('Value currently is ' + result.userID);
    uid = result.userID;
    if (uid == null) {
        input_saver();
    } else {
        input_shower(uid);
    }
});

function input_saver() {
    const submit_btn = document.getElementById("submitbtn");

    submit_btn.addEventListener("click", () => {
        const userid = document.getElementById("userID").value;
        chrome.storage.sync.set({userID: userid}, function() {
            console.log('Value is set to ' + userid);
            document.getElementById("test").innerHTML = "Your userID " + userid + ", is now saved! Enjoy CGS snagger.";
        });
    });
}

function input_shower(uid) {
    const submit_btn = document.getElementById("submitbtn");
    const input_field = document.getElementById("userID");
    input_field.value = uid;
    submit_btn.addEventListener("click", () => {
        const userid = input_field.value;
        chrome.storage.sync.set({userID: userid}, function() {
            console.log('Value is set to ' + userid);
            document.getElementById("test").innerHTML = "Your userID " + userid + ", is now saved! Enjoy CGS snagger.";
        });
    });
}
