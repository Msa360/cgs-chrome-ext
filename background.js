

function getcookies() {
  cookieArray = [];
  chrome.cookies.getAll({domain: "scop.cegep-ste-foy.qc.ca", path: "/booked/Web"}, (cookies) => {
    for (let index = 0; index < cookies.length; index++) {
      cookieArray.push(cookies[index]);
    }
  });
  return cookieArray;
}

var creds = 0;
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        sendResponse({
          farewell: "background.js received from the content script",
          resp: request.greeting
        });
        creds = request.greeting;
    }
);



