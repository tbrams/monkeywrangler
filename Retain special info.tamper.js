// ==UserScript==
// @name       Retain special info
// @namespace  http://brams.dk
// @version    0.1
// @description  Experimenting with T2E and TamperMonkey
// @match      http://thai2english.com/dictionary/*
// @copyright  2014+ Torben Brams
// ==/UserScript==

// Inject the api into the document - require does not worl for some reason
var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://apis.google.com/js/client.js?onload=init";
head.appendChild(script);

var Translations=null;
var ThaiWord=null;
var Pronounce=null;
var newdiv=null;
var i,len1;

function showValues(ThaiWord, Pronounce, Translations) {
    var k=null, len2=null;
    console.log('Thai word: ' + ThaiWord);
    console.log("Pronounciation: " + Pronounce);
    for (k=0, len2=Translations.length;k<len2;k++) {
        console.log('Translation'+'('+k+'): '+Translations[k].innerText);
    }
}

function createElement( str ) {
    var frag = document.createDocumentFragment();
    
    var elem = document.createElement('div');
    elem.innerHTML = str;
    
    while (elem.childNodes[0]) {
        frag.appendChild(elem.childNodes[0]);
    }
    return frag;
}

var clientId = '571991725551-4cesoc9msrt6njcv5dc20pa9pv7cvaon.apps.googleusercontent.com';
var apiKey = 'AIzaSyC5pq_4wFNn6A62OLxNZjlzYD0hFjwPQVM';
var scopes = 'https://www.googleapis.com/auth/fusiontables';
var tableId;

// Initialize the client
function init() {
    gapi.client.setApiKey(apiKey);
    window.setTimeout(function() { auth(true); }, 1);
}

// Run OAuth 2.0 authorization.
function auth(immediate) {
    gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: immediate
    }, handleAuthResult);
}

// Handle the results of the OAuth 2.0 flow.
function handleAuthResult(authResult) {
    if (authResult) {
        alert("we are in")
    } else {
        alert("login failed")
    }
}



function newClosure(ThaiWord, Pronounce, Translations, number) {
    return function() { 
        alert('You have clicked item #'+number+'\n'+ThaiWord+'\n'+Pronounce+'\n'+Translations[0].innerText);  };
}


function callBack(ThaiWord, Pronounce, Translations, i) {
    alert('You have clicked item #'+i+':\n'+ThaiWord+'\n '+Pronounce+'\n '+Translations[0].innerText);
}

if (document.getElementById("meaningsCount")==null) { 
    //We have many suggestions in a list     
    var rows = document.getElementById('reverseSearchLoading').getElementsByClassName('stripeMe');
    for (i = 0, len1 = rows.length; i < len1; i++ ) {
        ThaiWord = rows[i].getElementsByClassName("t2e")[0].innerText;
        Pronounce = rows[i].getElementsByClassName("uc")[0].innerText;
        Translations = rows[i].getElementsByTagName("ul")[0].getElementsByTagName("li");
        showValues(ThaiWord, Pronounce, Translations);
        // Insert action text
        var newdiv = null;
        newdiv=document.createElement("DIV");
        newdiv.appendChild(document.createTextNode("[ACTION "+i+"]"));
        newdiv.onclick = newClosure(ThaiWord, Pronounce, Translations, i);
        document.getElementById('reverseSearchLoading').getElementsByClassName('stripeMe')[i].appendChild(newdiv);
    }
} else {
    // We only have one meaning and need to workaround 
    ThaiWord = document.getElementById('dictionaryWord').innerText;
    Pronounce = document.getElementById('dictionaryTransliteration').innerText;
    Translations = 
        document.getElementById('meaningsLoading').getElementsByTagName("ul")[0].getElementsByTagName("li");
    showValues(ThaiWord, Pronounce, Translations);    
    // Insert action text
    newdiv = document.createElement("DIV");
    newdiv.appendChild(document.createTextNode("<ACTION CLICK>"));
    newdiv.onclick = function(){ alert('Hi!'); };
    document.getElementById('meaningsLoading').appendChild(newdiv);
}

// Added a comment to see how I get this merged in on the client side after fetching updates