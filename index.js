let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteEl = document.getElementById("delete-btn");
const tabBtn = document.getElementById("save-btn");

const localStorageValue = JSON.parse(localStorage.getItem("myLeads"));
if(localStorageValue){
    myLeads = localStorageValue;
    render(myLeads);
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
});

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
});

deleteEl.addEventListener("dblclick", function(){
    myLeads = [];
    localStorage.clear();
    render(myLeads);
});

function render(leads){
    let listItem = "";
    for(let i = 0; i < leads.length; i++){
        listItem += `
        <li>
            <a target="_blank" href="${leads[i]}">
                ${leads[i]}
            </a>
        </li>`;
    }
    ulEl.innerHTML = listItem;
}