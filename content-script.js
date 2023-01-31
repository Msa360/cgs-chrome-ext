/*
this file is injecting the inject script into the webpage so it 
has access to the same javascript runtime environment
*/

var s = document.createElement('script');
s.src = chrome.runtime.getURL('inject-script.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);