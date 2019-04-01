function promiseError(e) { console.log("promise error"); }

function showTabs(tablist) {
    let finalHTML = '';
    for(let tab of tablist) {
	finalHTML += '<div class="panel-list-item">' + '<input type="checkbox" id=' + tab.id + '>' + tab.title + '</div>' + '<br/>';
    }
    let div = document.getElementById("tablist");
    div.innerHTML = finalHTML;
}

var tabs = browser.tabs.query({});
tabs.then(showTabs, promiseError);

var button = document.getElementById("closetabs");
var refresh = document.getElementById("refresh");

button.onclick = function(){
    let div_childs = document.getElementById("tablist").children;
    let ids = [];
    for(let i = 0; i < div_childs.length; i+=2) {
	let list_item = div_childs[i];
	let checkbox = list_item.children[0];
	if(checkbox.checked) {
	    ids.push(Number(checkbox.id));
	}
    }
    alert("Are you sure you want to delete " + ids.length + " tab(s) ?");
    browser.tabs.remove(ids);
    tabs = browser.tabs.query({});
    tabs.then(showTabs, promiseError);
}

refresh.onclick = function(){
    tabs = browser.tabs.query({});
    tabs.then(showTabs, promiseError);
}
