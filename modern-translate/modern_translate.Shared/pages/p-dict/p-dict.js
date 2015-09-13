﻿!function(){"use strict";var e=WinJS.Binding,n=WinJS.Navigation,t=WinJS.Utilities,a=WinJS.Application,i=Windows.Storage.ApplicationData.current,c=i.localSettings;i.roamingSettings;WinJS.UI.Pages.define("/pages/p-dict/p-dict.html",{ready:function(t,a){var i=this;this.bindingData=e.as({pageTitle:a.title,onclickBack:e.initializer(function(){n.back()})}),e.processAll(t,i.bindingData);var c;c="google"==a.source?"inputDict"==a.type?this.generateinputDictbyGoogle(JSON.parse(a.dict)):this.generateoutputDictbyGoogle(JSON.parse(a.dict)):this.generateDictbyBing(a.dict),t.querySelector(".material-content").appendChild(c)},unload:function(){},generateDictbyBing:function(e){e=decodeURIComponent(e);var n=document.createElement("div");n.className="dict";var t=document.createElement("div");return t.className="bing-dict",t.innerHTML=e,n.appendChild(t),n},generateoutputDictbyGoogle:function(e){var n=this,t=document.createElement("div");t.className="dict";var a=document.createElement("div");return a.className="title themed",a.innerText=WinJS.Resources.getString("translations").value,t.appendChild(a),e.forEach(function(e){var a=document.createElement("div");a.className="part-container";var i=document.createElement("div");i.className="type",i.innerText="/ "+WinJS.Resources.getString(e[0]).value+" /",a.appendChild(i),e[2].forEach(function(e,t){var i=document.createElement("div");i.className="word-item";var r=document.createElement("div");r.className="word",r.innerText=t+1+". ",e[4]&&(r.innerText+=e[4]+" ");var l=document.createElement("a");l.className="blue",l.innerText=e[0],l.onclick=function(){n.translate(c.values.outputLang,c.values.inputLang,e[0])},r.appendChild(l);var d=document.createElement("div");d.className="meaning",e[1].forEach(function(e,t){if(t>0){var a=document.createElement("span");a.innerText=", ",d.appendChild(a)}var i=document.createElement("a");i.innerText=e,i.onclick=function(){n.translate(c.values.inputLang,c.values.outputLang,e)},d.appendChild(i)}),i.appendChild(r),i.appendChild(d),a.appendChild(i)}),t.appendChild(a)}),t},generateinputDictbyGoogle:function(e){var n=this,a=document.createElement("div");if(a.className="dict",e[1]){var i=document.createElement("div");i.className="title themed",i.innerText=WinJS.Resources.getString("definitions").value,a.appendChild(i),e[1].forEach(function(e){var t=document.createElement("div");t.className="part-container";var i=document.createElement("div");i.className="type",i.innerText="/ "+WinJS.Resources.getString(e[0]).value+" /",t.appendChild(i),e[1].forEach(function(e,a){var i=document.createElement("div");i.className="word-item";var r=document.createElement("div");r.className="word",r.innerText=a+1+". ";var l=document.createElement("a");if(l.className="blue",l.innerText=e[0],l.onclick=function(){n.translate(c.values.inputLang,c.values.outputLang,e[0])},r.appendChild(l),i.appendChild(r),e[2]){var d=document.createElement("div");d.className="meaning";var o=document.createElement("a");o.innerText='"'+e[2]+'"',o.onclick=function(){n.translate(c.values.inputLang,c.values.outputLang,e[2])},d.appendChild(o),i.appendChild(d)}t.appendChild(i)}),a.appendChild(t)})}if(e[0]){var i=document.createElement("div");i.className="title themed",i.innerText=WinJS.Resources.getString("synonyms").value,a.appendChild(i);var r=document.createElement("div");r.className="part-container",e[0].forEach(function(e){var t=document.createElement("div");t.className="type",t.innerText="/ "+e[0]+" /";var a=document.createElement("ul");e[1].forEach(function(e){var t=document.createElement("li");e[0].forEach(function(e,a){if(a>0){var i=document.createElement("span");i.innerText=", ",t.appendChild(i)}var r=document.createElement("a");r.innerText=e,r.onclick=function(){n.translate(c.values.inputLang,c.values.outputLang,e)},t.appendChild(r)}),a.appendChild(t)}),r.appendChild(t),r.appendChild(a)}),a.appendChild(r)}if(e[2]){var i=document.createElement("div");i.className="title themed",i.innerText=WinJS.Resources.getString("examples").value,a.appendChild(i);var r=document.createElement("div");r.className="part-container",e[2][0].forEach(function(e,a){var i=document.createElement("div");i.className="word-item";var l=document.createElement("div");l.className="word";var d=document.createElement("span");d.innerText=a+1+". ",l.appendChild(d);var o=document.createElement("a");t.setInnerHTML(o,toStaticHTML(e[0])),o.onclick=function(){n.translate(c.values.inputLang,c.values.outputLang,o.innerText)},l.appendChild(o),i.appendChild(l),r.appendChild(i)}),a.appendChild(r)}if(e[3]){var i=document.createElement("div");i.className="title themed",i.innerText=WinJS.Resources.getString("see_also").value,a.appendChild(i);var r=document.createElement("div");r.className="part-container",e[3].forEach(function(e){var a=document.createElement("div");a.className="word-item";var i=document.createElement("div");i.className="word",e.forEach(function(e,a){if(a>0){var r=document.createElement("span");r.innerText=", ",i.appendChild(r)}var l=document.createElement("a");t.setInnerHTML(l,toStaticHTML(e)),l.onclick=function(){n.translate(c.values.inputLang,c.values.outputLang,l.innerText)},i.appendChild(l)}),a.appendChild(i),r.appendChild(a)}),a.appendChild(r)}return a},translate:function(e,t,i){c.values.inputLang=e,c.values.outputLang=t,a.sessionState.inputText=i,n.back()}})}();