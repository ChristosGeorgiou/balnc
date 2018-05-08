import * as schema from './project.json'
import { RxDocument } from 'rxdb';

declare interface IProject {
    name: string
    description: string
    features: { [key: string]: boolean }
    tags: any[]
    isStarred: boolean
    isArchived: boolean
}

export type Project = IProject
export type RxProject = RxDocument<IProject> & IProject
export const ProjectSchema = schema
