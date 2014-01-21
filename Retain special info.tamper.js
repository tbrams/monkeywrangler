// ==UserScript==
// @name       Retain special info
// @namespace  http://brams.dk
// @version    0.1
// @description  Experimenting with T2E and TamperMonkey
// @match      http://thai2english.com/dictionary/*
// @copyright  2014+ Torben Brams
// ==/UserScript==

// Inject the api into the document - require does not work for some reason
//var head = document.getElementsByTagName('head')[0];
//var script = document.createElement('script');
//script.type = 'text/javascript';
//script.src = "https://apis.google.com/js/client.js?onload=init";
//head.appendChild(script);

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


// Initialize the client
//function init() {
//    console.log("@init finally..");
//    gapi.client.setApiKey(apiKey);
//    window.setTimeout(function() { auth(true); }, 1);
//}


function newClosure(ThaiWord, Pronounce, Translations, number) {
    return function() { 
        alert('You have clicked item #'+number+'\n'+ThaiWord+'\n'+Pronounce+'\n'+Translations[0].innerText);  
        fetchLine(ThaiWord, Pronounce, Translations[0]);        
    }; 
}


function callBack(ThaiWord, Pronounce, Translations, i) {
    //alert('You have clicked item #'+i+':\n'+ThaiWord+'\n '+Pronounce+'\n '+Translations[0].innerText);
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

function fetchLine(t,p,e) {
    console.log("fetchLine initiated...");
    xmlHttp=GetXmlHttpObject();
    
    if (xmlHttp==null)  {
        alert ("Browser does not support HTTP Request");
        return;
    } 
    
    var url="http://brams/flashcards/insert_data.php";
    url=url+"?T="+t;
    url=url+"&P="+p;
    url=url+"&E="+e;
    url=url+"&sid="+Math.random();
    xmlHttp.onreadystatechange=stateChanged; 
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);
} 

function stateChanged() { 
    console.log("stateChanged initiated...");
    
    if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete") { 
        document.getElementById("output").innerHTML=xmlHttp.responseText;
    } 
}

function GetXmlHttpObject() {
    console.log("GetXmlHttpObject initiated...");
    
    var xmlHttp=null;
    try {
        // Firefox, Opera 8.0+, Safari
        xmlHttp=new XMLHttpRequest();
    }
    catch (e) {
        // Internet Explorer
        try {
            xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xmlHttp;
}