

// function getcookies() {
//   cookieArray = [];
//   chrome.cookies.getAll({domain: "scop.cegep-ste-foy.qc.ca", path: "/booked/Web"}, (cookies) => {
//     for (let index = 0; index < cookies.length; index++) {
//       cookieArray.push(cookies[index]);
//     }
//   });
//   return cookieArray;
// }


// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         sendResponse({
//           farewell: "background.js received from the content script",
//           resp: request.greeting
//         });
//     }
// );

// chrome.storage.onChanged.addListener(function (changes, namespace) {
//   for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//     console.log(
//       `Storage key "${key}" in namespace "${namespace}" changed.`,
//       `Old value was "${oldValue}", new value is "${newValue}".`
//     );
//   }
// });



