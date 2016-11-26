// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */


function getTabsOpenned(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  // var queryInfo = {
  //   active: true,
  //   currentWindow: true
  // };

  chrome.tabs.query({}, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    // var tab = tabs[0];

    // // A tab is a plain object that provides information about the tab.
    // // See https://developer.chrome.com/extensions/tabs#type-Tab
    // var url = tab.url;

    // // tab.url is only available if the "activeTab" permission is declared.
    // // If you want to see the URL of other tabs (e.g. after removing active:true
    // // from |queryInfo|), then the "tabs" permission is required to see their
    // // "url" properties.
    // console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(tabs)
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  var bkg = chrome.extension.getBackgroundPage();
  var clock = $('.clock').FlipClock(bkg.wholeTime-bkg.getTime() , {
      clockFace: 'MinuteCounter',
      countdown: true
      //,
      // // The onStop callback
      // onStop: function() {
      //   alert("Timer stopped!")
      //   bkg.isOn = false;
      //   chrome.tabs.create(function() {
      //     bkg.isOn = true;
      //   });

      // },

      // // The onReset callback
      // onReset: function() {
       
      // }
  });
  if(bkg.getTime() === 1500) {
    //alert("niggas in paris");
     bkg.isOn = true;
     bkg.wholeTime = 300;
     bkg.initialTime = new Date();
      chrome.tabs.create({}, function() {
        // bkg.isOn = false;
      });
  } else if(bkg.getTime() === 300) {
      bkg.wholeTime = 1500;
      bkg.initialTime = new Date();
      bkg.isOn = false;
  }
   
  getTabsOpenned(function(tabs) {
    console.log(tabs)
  });
});
