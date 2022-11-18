

function getcookies() {
  cookieArray = [];
  chrome.cookies.getAll({domain: "scop.cegep-ste-foy.qc.ca", path: "/booked/Web"}, (cookies) => {
    for (let index = 0; index < cookies.length; index++) {
      cookieArray.push(cookies[index]);
    }
  });
  return cookieArray;
}
console.log(getcookies());

// if (request.greeting === "hello")
// farewell: sender.tab ? "background.js received from a content script:" + sender.tab.url : "from the extension",
var creds = 0;
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        sendResponse({
          farewell: "background.js received from the content script",
          resp: request.greeting
        });
        creds = request.greeting;
        // fetch("https://ptsv2.com/t/wmmy1-1668752845/post", {
        //     method: "POST",
        //     headers: {
        //       "hworld": "wasssup"
        //     },
        //     body: JSON.stringify(
        //     //   {
        //     //   first: "firstt",
        //     //   second: "secondd"
        //     // }
        //     creds
        //     ),
        //     credentials: 'include'
        //   }).then(response => {
        //     console.log(response);
        // });
        
    }
);
// https://scop.cegep-ste-foy.qc.ca/booked/Web/ajax/reservation_update.php
// "https://scop.cegep-ste-foy.qc.ca/booked/Web/ajax/reservation_update.php"
// fetch("https://ptsv2.com/t/wmmy1-1668752845/post", {
//     method: "POST",
//     headers: {
//       "hworld": "wasssup"
//     },
//     body: JSON.stringify(
//       {
//       first: "firstt",
//       second: "secondd"
//     }
//     ),
//     credentials: 'include'
//   }).then(response => {
//     console.log(response);
// });


