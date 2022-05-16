import { Section } from "./section.js";

export class Project {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.count = 0;
        this.sections = [];
    }

    addSection(section) {
        this.sections.push(section);
        this.count += section.count;
    }

    getCount() {
        let count = 0;
        for (let i = 0; i < this.sections.length; i++) {
            count += this.sections[i].count;
        }
        return count;
    }

    deleteSection(sectionId) {
        this.sections = this.sections.filter(function(value, index, arr) {
            return value.id !== sectionId;
        });
        this.count = this.getCount();
    }

    getSection(sectionId) {
        for (let i = 0; i < this.sections.length; i++) {
            if (this.sections[i].id === sectionId) {
                return this.sections[i];
            }
        }
    }

    updateSection(sectionId, section) {
        // todo: check 
        for (let i = 0; i < this.sections.length; i++) {
            if (this.sections[i].id === sectionId) {
                this.sections[i] = section;
                break;
            }
        }
    }
}