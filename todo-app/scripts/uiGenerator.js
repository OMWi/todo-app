import { Task } from "./task.js";

export function addProjectUI(project, projectList, sectionList, data) {
    let divProject = document.createElement("div");
    let projectName = document.createElement("p");
    let projectCount = document.createElement("p");
    divProject.setAttribute("id", "project-" + project.id);
    divProject.classList.toggle("project");
    projectName.setAttribute("class", "project-name");
    projectName.innerHTML = project.name;
    projectCount.setAttribute("class", "project-count");
    projectCount.innerHTML = project.count;
    divProject.appendChild(projectName);
    divProject.appendChild(projectCount);
    divProject.onclick = function() {
        data.selectedProjectID = project.id;
        sectionList.innerHTML = "";
        for (let i = 0; i < data.getProject(project.id).sections.length; i++) {
            addSectionUI(data.getProject(project.id).sections[i], sectionList, data);
        }
    }
    projectList.appendChild(divProject);
}

export function updateProjectUI(data, projectList, sectionList) {
    let filteredProjects = data.filteredProjects;
    projectList.innerHTML = "";
    for (let i = 0; i < filteredProjects.length; i++) {
        addProjectUI(filteredProjects[i], projectList, sectionList, data);
    }
}

export function addTaskUI(task, taskList) {
    let divTask = document.createElement("div");
    divTask.setAttribute("id", "task-" + task.id);
    divTask.classList.toggle("task");
    let divTaskHeader = document.createElement("div");
    divTaskHeader.classList.toggle("task-header");
    let divTaskHeaderLeft = document.createElement("div");
    divTaskHeaderLeft.classList.toggle("task-header-left");
    let divCheckCircle = document.createElement("div");
    divCheckCircle.classList.toggle("check-circle");    
    divCheckCircle.classList.toggle("check-circle-priority-" + task.priority);
    let pTaskName = document.createElement("p");
    pTaskName.classList.toggle("task-name");
    // let iFA = document.createElement("i");
    // iFA.classList.toggle("task-options");
    // iFA.classList.toggle("fa-solid");
    // iFA.classList.toggle("fa-ellipsis");
    // iFA.classList.toggle("fa-lg");
    let pTaskDescription = document.createElement("p");
    pTaskDescription.classList.toggle("task-description");
    divTask.appendChild(divTaskHeader);
    divTask.appendChild(pTaskDescription);
    divTaskHeader.appendChild(divTaskHeaderLeft);
    // divTaskHeader.appendChild(iFA);
    divTaskHeaderLeft.appendChild(divCheckCircle);
    divTaskHeaderLeft.appendChild(pTaskName);
    pTaskName.innerHTML = task.title;
    pTaskDescription.innerHTML = task.description;

    divTask.onclick = function() {
        divTask.classList.toggle("task-selected");
    }

    taskList.appendChild(divTask);
}

export function addSectionUI(section, sectionList, data, db, uid) {
    let taskSection = document.createElement("section");
    taskSection.setAttribute("id", "section-" + section.id);
    taskSection.classList.toggle("task-section");
    let sectionHeader = document.createElement("header");
    sectionHeader.classList.toggle("task-section-header");
    let pSectionName = document.createElement("p");
    pSectionName.classList.toggle("task-section-name");
    pSectionName.innerHTML = section.name;
    let pSectionCount = document.createElement("p");
    pSectionCount.classList.toggle("section-task-count");
    pSectionCount.innerHTML = section.count;
    let divTaskList = document.createElement("div");
    divTaskList.classList.toggle("task-list");
    let aAddTask = document.createElement("a");
    aAddTask.classList.toggle("add-task");
    let divFA = document.createElement("div");
    divFA.classList.toggle("fa-solid");
    divFA.classList.toggle("fa-plus");
    divFA.classList.toggle("fa-xl");
    let pAddTaskText = document.createElement("p");
    pAddTaskText.classList.toggle("add-task-text");
    pAddTaskText.innerHTML = "Add task";
    let divAddTaskInputform = document.createElement("div");
    divAddTaskInputform.classList.toggle("add-task-inputform");
    let addTaskForm = document.createElement("form");
    addTaskForm.setAttribute("method", "post");
    addTaskForm.classList.toggle("add-task-form");
    let divAddTaskInputContainer = document.createElement("div");
    divAddTaskInputContainer.classList.toggle("add-task-input-container");
    let addTaskInput = document.createElement("input");
    addTaskInput.classList.toggle("add-task-input");
    addTaskInput.setAttribute("type", "text");
    addTaskInput.setAttribute("placeholder", "Task name");
    let textareaAddTaskInputDescription = document.createElement("textarea");
    textareaAddTaskInputDescription.classList.toggle("add-task-input-description");
    textareaAddTaskInputDescription.setAttribute("name", "description");
    textareaAddTaskInputDescription.setAttribute("placeholder", "Description");
    let divPriorityContainer = document.createElement("div");
    divPriorityContainer.classList.toggle("priority-container");
    for (let i = 1; i <= 4; i++) {
        let label = document.createElement("label");
        let input = document.createElement("input");
        let iFA = document.createElement("i");
        input.setAttribute("type", "radio");
        input.setAttribute("name", "priority-radio");
        input.setAttribute("value", i);
        if (i == 1) {
            input.setAttribute("checked", "true");
        }
        input.classList.toggle("priority-radio-button");
        iFA.classList.toggle("fa-solid");
        iFA.classList.toggle("fa-flag");
        iFA.classList.toggle("fa-lg");
        iFA.classList.toggle("priority-" + i);
        label.appendChild(input);
        label.appendChild(iFA);
        divPriorityContainer.appendChild(label);
    }
    let divAddTaskButtons = document.createElement("div");
    divAddTaskButtons.classList.toggle("add-task-buttons");
    let addTaskButtonConfirm = document.createElement("button");
    addTaskButtonConfirm.classList.toggle("add-task-button-confirm");
    addTaskButtonConfirm.setAttribute("type", "submit");
    addTaskButtonConfirm.setAttribute("name", "add-task-button");
    addTaskButtonConfirm.innerHTML = "Add task"
    let addTaskButtonCancel = document.createElement("button");
    addTaskButtonCancel.classList.toggle("add-task-button-cancel");
    addTaskButtonCancel.setAttribute("type", "button");
    addTaskButtonCancel.innerHTML = "Cancel";

    addTaskForm.addEventListener('submit', addTaskHandler);
    function addTaskHandler(event) {
        event.preventDefault();
        let taskName = addTaskForm.getElementsByClassName("add-task-input")[0].value;
        let taskDescription = addTaskForm.getElementsByClassName("add-task-input-description")[0].value;
        let radioButtons = document.getElementById("section-" + section.id).getElementsByClassName("priority-radio-button");
        let priority = 1;
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                priority = radioButtons[i].value;
                break;
            }
        }
        let newTask = new Task(taskName, taskDescription, priority);
        data.getProject(data.selectedProjectID).getSection(section.id).addTask(newTask);
        pSectionCount.innerHTML = data.getProject(data.selectedProjectID).getSection(section.id).count;
        let divProjectCount = document.getElementById("project-" + data.selectedProjectID).getElementsByClassName("project-count")[0];
        data.getProject(data.selectedProjectID).updateCount();
        divProjectCount.innerHTML = data.getProject(data.selectedProjectID).count;

        db.addTask(uid, newTask, section.id);
        db.updateProject(uid, data.getProject(data.selectedProjectID));
        db.updateSection(uid, data.getProject(data.selectedProjectID).getSection(section.id), data.selectedProjectID);

        addTaskUI(newTask, divTaskList);
    }

    aAddTask.onclick = function() {
        divAddTaskInputform.style.display = "flex";
        aAddTask.style.display = "none";
    }
    
    addTaskButtonConfirm.onclick = function() {
        divAddTaskInputform.style.display = "none";
        aAddTask.style.display = "flex";
    }
    
    addTaskButtonCancel.onclick = function() {
        divAddTaskInputform.style.display = "none";
        aAddTask.style.display = "flex";
    }

    sectionHeader.onclick = function() {
        let selectedTasks = document.getElementsByClassName("task-selected");
        let taskIds = [];
        let oldSectionIds = [];
        for (let i = 0; i < selectedTasks.length; i++) {
            let oldSectionID = selectedTasks[i].parentElement.parentElement.getAttribute("id");
            oldSectionID = parseInt(oldSectionID.charAt(oldSectionID.length - 1));
            oldSectionIds.push(oldSectionID);
            let taskID = selectedTasks[i].getAttribute("id");
            taskID = parseInt(taskID.charAt(taskID.length - 1));            
            taskIds.push(taskID);
        }
        for (let i = 0; i < taskIds.length; i++) {
            let task = document.getElementById("task-" + taskIds[i]);
            divTaskList.appendChild(task);
            task.classList.toggle("task-selected");
            let taskData = data.getProject(data.selectedProjectID).getSection(oldSectionIds[i]).getTask(taskIds[i]);
            data.getProject(data.selectedProjectID).getSection(oldSectionIds[i]).deleteTask(taskIds[i]);
            data.getProject(data.selectedProjectID).getSection(section.id).addTask(taskData);

            db.updateTask(uid, taskData, section.id);
        }
        for (let i = 0; i < oldSectionIds.length; i++) {
            let oldSection = document.getElementById("section-" + oldSectionIds[i]);
            let oldSectionTaskCount = oldSection.getElementsByClassName("section-task-count")[0];
            oldSectionTaskCount.innerHTML = data.getProject(data.selectedProjectID).getSection(oldSectionIds[i]).count;
            
            db.updateSection(uid, data.getProject(data.selectedProjectID).getSection(oldSectionIds[i]), data.selectedProjectID);
        }
        pSectionCount.innerHTML = data.getProject(data.selectedProjectID).getSection(section.id).count;
        let divProjectCount = document.getElementById("project-" + data.selectedProjectID).getElementsByClassName("project-count")[0];
        data.getProject(data.selectedProjectID).updateCount();
        divProjectCount.innerHTML = data.getProject(data.selectedProjectID).count;

        db.updateSection(uid, data.getProject(data.selectedProjectID).getSection(section.id), data.selectedProjectID);
    }

    sectionList.appendChild(taskSection);
    taskSection.appendChild(sectionHeader);
    taskSection.appendChild(divTaskList);
    taskSection.appendChild(aAddTask);
    taskSection.appendChild(divAddTaskInputform);    
    sectionHeader.appendChild(pSectionName);
    sectionHeader.appendChild(pSectionCount);
    aAddTask.appendChild(divFA);
    aAddTask.appendChild(pAddTaskText);
    divAddTaskInputform.appendChild(addTaskForm);
    addTaskForm.appendChild(divAddTaskInputContainer);
    addTaskForm.appendChild(divAddTaskButtons);
    divAddTaskInputContainer.appendChild(addTaskInput);
    divAddTaskInputContainer.appendChild(textareaAddTaskInputDescription);
    divAddTaskInputContainer.appendChild(divPriorityContainer);
    divAddTaskButtons.appendChild(addTaskButtonConfirm);
    divAddTaskButtons.appendChild(addTaskButtonCancel);

    let taskList = document.getElementById("section-" + section.id).getElementsByClassName("task-list")[0];
    section.tasks.forEach((task) => {
        addTaskUI(task, taskList);
    })
}