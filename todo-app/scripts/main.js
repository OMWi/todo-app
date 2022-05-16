import { Data } from "./data.js";

var data = new Data();
data.fillData();
// console.log(data);

sessionStorage.setItem('data', JSON.stringify(data));

var buttonSidemenu = document.getElementById("button-sidemenu");

var createProjectInputform = document.getElementById("create-project-inputform");
var createProjectButton = document.getElementById("create-project-button");
var createProjectConfirmButton = document.getElementById("create-project-button-confirm");
var createProjectCancelButton = document.getElementById("create-project-button-cancel");

var addSectionInputform = document.getElementById("add-section-inputform");
var addSectionButton = document.getElementById("add-section");
var addSectionConfirmButton = document.getElementById("add-section-button-confirm");
var addSectionCancelButton = document.getElementById("add-section-button-cancel");

var addTaskInputform = document.getElementById("add-task-inputform");
var addTaskButton = document.getElementById("add-task");
var addTaskConfirmButton = document.getElementById("add-task-button-confirm");
var addTaskCancelButton = document.getElementById("add-task-button-cancel");



buttonSidemenu.onclick = function() {
    document.getElementById("sidemenu").classList.toggle("sidenav-open")
    // document.getElementById("main").classList.toggle("main-sidenav-open")
}

createProjectButton.onclick = function() {
    createProjectInputform.style.display = "flex";
    createProjectButton.style.display = "none";
}

createProjectConfirmButton.onclick = function() {
    createProjectInputform.style.display = "none";
    createProjectButton.style.display = "flex";
}

createProjectCancelButton.onclick = function() {
    createProjectInputform.style.display = "none";
    createProjectButton.style.display = "flex";
}


addSectionButton.onclick = function() {
    addSectionInputform.style.display = "flex";
    addSectionButton.style.display = "none";
}

addSectionConfirmButton.onclick = function() {
    addSectionInputform.style.display = "none";
    addSectionButton.style.display = "flex";
}

addSectionCancelButton.onclick = function() {
    addSectionInputform.style.display = "none";
    addSectionButton.style.display = "flex";
}


addTaskButton.onclick = function() {
    addTaskInputform.style.display = "flex";
    addTaskButton.style.display = "none";
}

addTaskConfirmButton.onclick = function() {
    addTaskInputform.style.display = "none";
    addTaskButton.style.display = "flex";
}

addTaskCancelButton.onclick = function() {
    addTaskInputform.style.display = "none";
    addTaskButton.style.display = "flex";
}

