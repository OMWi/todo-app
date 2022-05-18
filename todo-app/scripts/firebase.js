import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { getDatabase, ref, get, set, update, remove } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
import { Project } from "./project.js";
import { Section } from "./section.js";
import { Task } from "./task.js";

const firebaseConfig = {
    apiKey: "AIzaSyBW9Vf6F3f2EnZY9JS9ZitWXu07Im3WX1I",
    authDomain: "itirod-data.firebaseapp.com",
    databaseURL: "https://itirod-data-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "itirod-data",
    storageBucket: "itirod-data.appspot.com",
    messagingSenderId: "354056821546",
    appId: "1:354056821546:web:1783859c7d24d505d75c53",
    measurementId: "G-SVSJGPNVQK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const database = getDatabase(app);
export class Authenticator {
    constructor() {
        this.auth = auth;
    }
    async signup(email, password) {
        return createUserWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                return userCredential;
            })
            .catch((error) => {
                return error;
            });
    }
    async login(email, password) {
        return signInWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                return userCredential;
            })
            .catch((error) => {
                return error;
            });
    }
    validateEmail(email) {
        var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(String(email).toLowerCase());
    }
    validatePassword(value) {
        return value.length > 7;
    }
}

export class Database {
    constructor() {
        this.database = database;
    }

    async addProject(uid, project) {
        let projectRef = ref(this.database, uid + "/projects/" + project.id);
        let obj = {
            "name": project.name,
            "count": project.count
        }
        set(projectRef, obj);
    }
    async addSection(uid, section, projectID) {
        let sectionRef = ref(this.database, uid + "/sections/" + section.id);
        let obj = {
            "name": section.name,
            "count": section.count,
            "projectID": projectID
        }
        set(sectionRef, obj);
    }
    async addTask(uid, task, sectionID) {
        let taskRef = ref(this.database, uid + "/tasks/" + task.id);
        let obj = {
            "title": task.title,
            "description": task.description,
            "priority": task.priority,
            "sectionID": sectionID
        }
        set(taskRef, obj);
    }

    async updateProject(uid, project) {
        let projectRef = ref(this.database, uid + "/projects/" + project.id);
        let obj = {
            "name": project.name,
            "count": project.count
        }
        update(projectRef, obj);
    }
    async updateSection(uid, section, projectID) {
        let sectionRef = ref(this.database, uid + "/sections/" + section.id);
        let obj = {
            "name": section.name,
            "count": section.count,
            "projectID": projectID
        }
        update(sectionRef, obj);
    }
    async updateTask(uid, task, sectionID) {
        let taskRef = ref(this.database, uid + "/tasks/" + task.id);
        let obj = {
            "title": task.title,
            "description": task.description,
            "priority": task.priority,
            "sectionID": sectionID
        }
        update(taskRef, obj);
    }

    async getProjects(uid) {
        let projects = [];
        let projectsRef = ref(this.database, uid + "/projects");
        let projectsSnap = await get(projectsRef);
        let projectsDB = projectsSnap.val();
        let sectionsRef = ref(this.database, uid + "/sections");
        let sectionsSnap = await get(sectionsRef);
        let sectionssDB = sectionsSnap.val();
        let tasksRef = ref(this.database, uid + "/tasks");
        let tasksSnap = await get(tasksRef);
        let tasksDB = tasksSnap.val();
        for (let projectId in projectsDB) {
            let newProject = new Project(projectsDB[projectId].name);
            newProject.id = projectId;
            newProject.count = projectsDB[projectId].count;
            for (let sectionId in sectionssDB) {
                if (sectionssDB[sectionId].projectID != projectId) {
                    continue;
                }
                let newSection = new Section(sectionssDB[sectionId].name);
                newSection.id = sectionId;
                newSection.count = sectionssDB[sectionId].count;
                for (let taskId in tasksDB) {
                    if (tasksDB[taskId].sectionID != sectionId) {
                        continue;
                    }
                    let newTask = new Task(tasksDB[taskId].title, tasksDB[taskId].description, 
                        tasksDB[taskId].priority);
                    newTask.id = taskId;
                    newSection.tasks.push(newTask);                    
                }
                newProject.sections.push(newSection);
            }
            projects.push(newProject);
        }
        return projects;
    }

    async deleteProject(uid, projectId) {
        let projectRef = ref(this.database, uid + "/projects/" + projectId);
        remove(projectRef);
    }

    async deleteSection(uid, sectionId) {
        let sectionRef = ref(this.database, uid + "/sections/" + sectionId);
        remove(sectionRef);
    }

    async deleteTask(uid, taskId) {
        let taskRef = ref(this.database, uid + "/tasks/" + taskId);
        remove(taskRef);
    }
}