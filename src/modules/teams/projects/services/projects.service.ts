import { Injectable } from "@angular/core"

import * as moment from 'moment'
import { DatabaseService } from "../../../_core/database/services/database.service"
import { RxProjectDocument } from "../data/project"
import { RxTaskDocument } from "../data/task"
import { RxCollection } from "rxdb"
import { Observable } from "rxjs";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

@Injectable()
export class ProjectsService implements Resolve<any> {
    dbTasks: RxCollection<RxTaskDocument>
    dbProjects: RxCollection<RxProjectDocument>

    constructor(
        private dbService: DatabaseService,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        return this.setup()
    }

    async setup() {
        console.log("async")
        this.dbProjects = await this.dbService.get<RxProjectDocument>("project")
        this.dbTasks = await this.dbService.get<RxTaskDocument>("task")
    }

    getProjects() {
        console.log("getProjects")
        return this.dbProjects.find().$
            .map((data) => {
                if (!data) { return data }
                data.sort((a, b) => {
                    return a.name < b.name ? -1 : 1
                })
                return data
            })
    }

    getProject(projectId) {
        console.log("getProject", projectId)
        return this.dbProjects.findOne(projectId).$
    }

    addProject(name: string, description: string) {
        console.log("addProject")
        const project = this.dbProjects.newDocument({
            name: name,
            description: description,
        })
        return project.save()
    }

    getTasksForProject(projectId: string) {
        console.log("getTasksForProject", projectId)
        return this.dbTasks
            .find({ project: { $eq: projectId } }).$
            .map((data) => {
                if (!data) { return data }
                data.sort((a, b) => {
                    return a.updatedAt > b.updatedAt ? -1 : 1
                })
                return data
            })
    }

    addTask(title: string, projectId: string, description: string) {
        console.log("addTask")
        const now = moment().toISOString()
        const user = "anonymous"

        const taskObj = {
            title: title,
            insertedAt: now,
            updatedAt: now,
            insertedFrom: user,
            log: [{
                comment: "Task Created",
                from: user,
                at: now,
                type: "SYSTEM"
            }],
            status: "PENDING",
            project: projectId
        }

        if (description) {
            taskObj.log.push({
                comment: description,
                from: user,
                at: now,
                type: "COMMENT"
            })
        }

        const task = this.dbTasks.newDocument(taskObj)
        return task.save()
    }
}
