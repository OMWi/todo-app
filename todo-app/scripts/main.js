import { Data } from "./data.js";
import { Project } from "./project.js";
import { Section } from "./section.js";
import { Task } from "./task.js";
import { addProjectUI, addTaskUI, addSectionUI, updateProjectUI } from "./uiGenerator.js";

var selectedProjectID = 0;
var selectedSectionID = 0;

var buttonSidemenu = document.getElementById("button-sidemenu");
buttonSidemenu.onclick = function () {
    document.getElementById("sidemenu").classList.toggle("sidenav-open")
}


var createProjectInputform = document.getElementById("create-project-inputform");
var createProjectButton = document.getElementById("create-project-button");
var createProjectConfirmButton = document.getElementById("create-project-button-confirm");
var createProjectCancelButton = document.getElementById("create-project-button-cancel");
createProjectButton.onclick = function () {
    createProjectInputform.style.display = "flex";
    createProjectButton.style.display = "none";
}
createProjectConfirmButton.onclick = function () {
    createProjectInputform.style.display = "none";
    createProjectButton.style.display = "flex";
}
createProjectCancelButton.onclick = function () {
    createProjectInputform.style.display = "none";
    createProjectButton.style.display = "flex";
}

var createProjectForm = document.getElementById("create-project-form");
createProjectForm.addEventListener('submit', createProjectHandler);
var projectList = document.getElementById("project-list");
function createProjectHandler(event) {
    event.preventDefault();
    let projectName = createProjectForm.elements['project-name'].value;
    let newProject = new Project(projectName);
    data.addProject(newProject);
    addProjectUI(newProject, projectList, sectionList, data);
}


var addSectionInputform = document.getElementById("add-section-inputform");
var addSectionButton = document.getElementById("add-section");
var addSectionConfirmButton = document.getElementById("add-section-button-confirm");
var addSectionCancelButton = document.getElementById("add-section-button-cancel");
addSectionButton.onclick = function () {
    addSectionInputform.style.display = "flex";
    addSectionButton.style.display = "none";
}
addSectionConfirmButton.onclick = function () {
    addSectionInputform.style.display = "none";
    addSectionButton.style.display = "flex";
}
addSectionCancelButton.onclick = function () {
    addSectionInputform.style.display = "none";
    addSectionButton.style.display = "flex";
}

var addSectionForm = document.getElementById("add-section-form");
addSectionForm.addEventListener('submit', addSectionHandler);
var sectionList = document.getElementsByClassName("section-list")[0];
function addSectionHandler(event) {
    event.preventDefault();
    let sectionName = addSectionForm.elements['section-name'].value;
    let newSection = new Section(sectionName);
    data.getProject(data.selectedProjectID).addSection(newSection);
    addSectionUI(newSection, sectionList, data);
}

var searchInput = document.getElementsByClassName("search-input")[0];
searchInput.addEventListener("input", (e) => {
    let searchString = e.target.value;
    data.search(searchString);
    updateProjectUI(data, projectList, sectionList);
})


var data = new Data();
data.fillData();
data.projects.forEach((project) => {
    addProjectUI(project, projectList, sectionList, data);
})

data.getProject(data.selectedProjectID).sections.forEach((section) => {
    addSectionUI(section, sectionList, data);
    // let taskList = document.getElementById("section-" + section.id).getElementsByClassName("task-list")[0];
    // section.tasks.forEach((task) => {
    //     addTaskUI(task, taskList);
    // })
})