import { Data } from "./data.js";
import { Project } from "./project.js";
import { Section } from "./section.js";
import { Task } from "./task.js";
import { addProjectUI, addTaskUI, addSectionUI, updateProjectUI } from "./uiGenerator.js";
import { Authenticator, Database } from "./firebase.js";

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
    data.selectedProjectID = newProject.id;
    sectionList.innerHTML = "";
    for (let i = 0; i < data.getProject(newProject.id).sections.length; i++) {
        addSectionUI(data.getProject(newProject.id).sections[i], sectionList, data);
    }
    db.addProject(uid, newProject);
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
    if (data.selectedProjectID == -1) {
        return;
    }
    let sectionName = addSectionForm.elements['section-name'].value;
    let newSection = new Section(sectionName);
    data.getProject(data.selectedProjectID).addSection(newSection);
    addSectionUI(newSection, sectionList, data, db, uid);
    db.addSection(uid, newSection, data.selectedProjectID);
}

var searchInput = document.getElementsByClassName("search-input")[0];
searchInput.addEventListener("input", (e) => {
    let searchString = e.target.value;
    data.search(searchString);
    updateProjectUI(data, projectList, sectionList);
})

var searchForm = document.getElementsByClassName("search-form")[0];
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
})


var data = new Data();
const db = new Database();
var uid = sessionStorage.getItem("uid");
if (String(uid) == String(null)) {
    window.location = "../index.html"
}
let userProjects = db.getProjects(uid);
userProjects.then((projects) => {
    data.projects = projects;
    if (projects.length == 0) {
        return;
    }
    data.selectedProjectID = data.projects[0].id;
    data.updateFilteredProjects();
    data.projects.forEach((project) => {
        addProjectUI(project, projectList, sectionList, data);
    })
    data.getProject(data.selectedProjectID).sections.forEach((section) => {
        addSectionUI(section, sectionList, data, db, uid);
    })
})

var logout = document.getElementsByClassName("logout")[0];
logout.onclick = function() {
    sessionStorage.setItem("uid", null);
    window.location = "../index.html";
}
