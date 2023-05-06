let mySet = new Set();
const inputEl = document.querySelector('#input-el');
const inputBtn = document.querySelector('#input-btn');
let deleteBtn = document.querySelector('#delete-btn');
let saveTabBtn = document.querySelector('#save-btn');

const ulEl = document.querySelector('#ul-el');
let leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));

if (leadsFromLocalStorage) {
    mySet = new Set(leadsFromLocalStorage);
    render();
}

function render() {
    let listItems = "";
    mySet.forEach((item) => {
        // listItems += "<li><a href='#'>" + item + "</a></li>";
        listItems += `<li><a target="_blank" href='${"https://" + item}'>${item}</a></li>`;
    });
    ulEl.innerHTML = listItems;
}

inputBtn.addEventListener('click', () => {
    mySet.add(inputEl.value);
    inputEl.value = '';
    render();
    localStorage.setItem('myLeads', JSON.stringify(Array.from(mySet)));
    console.log(mySet);
});

deleteBtn.addEventListener('dblclick', () => {
    localStorage.clear();
    mySet.clear();
    render();
});

saveTabBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        mySet.add(tabs[0].url);
        render();
        localStorage.setItem('myLeads', JSON.stringify(Array.from(mySet)));
    });
});