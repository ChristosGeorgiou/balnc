import { Entity } from '@balnc/core'

export interface Project extends Entity {
  name: string
  description?: string
  features?: { [key: string]: boolean }
  isArchived?: boolean
}

export interface Meta {
  user: string
  updated?: {
    timestamp: number
    user?: string
  }
}

export interface Issue extends Entity, Meta {
  type: IssueType
  title: string
  description?: string
  parent?: string
  status?: IssueStatus
  assignee?: string
  reporter?: string
  branch?: string
  labels?: string[]
  estimate?: number
  time?: number
  priority?: number
  dueDate?: number
}

export interface PEvent extends Entity, Meta {
  text?: string
  type: PEventType
}

export enum IssueType {
  issue = 'TASK',
  story = 'STORY',
  bug = 'BUG',
  support = 'SUPPORT'
}

export enum IssueStatus {
  open = 'OPEN',
  pending = 'PENDING',
  progress = 'PROGRESS',
  completed = 'COMPLETED',
  review = 'REVIEW',
  closed = 'CLOSED'
}

export enum PEventType {
  activity = 'ACTIVITY',
  work = 'WORK',
  comment = 'COMMENT'
}

export const IssueTypeModel = [
  { alias: 'issue', color: '#f00' },
  { alias: 'story', color: '#f00' },
  { alias: 'bug', color: '#f00' },
  { alias: 'support', color: '#f00' }
]

export const IssueStatusViews: IssueStatusView[] = [
  { key: IssueStatus.open, label: 'Open', style: { 'background-color': '#9E9E9E', color: '#FFF' } },
  { key: IssueStatus.pending, label: 'Pending', style: { 'background-color': '#607D8B', color: '#FFF' } },
  { key: IssueStatus.progress, label: 'In Progress', style: { 'background-color': '#FF5722', color: '#FFF' } },
  { key: IssueStatus.completed, label: 'Completed', style: { 'background-color': '#2196F3', color: '#FFF' } },
  { key: IssueStatus.review, label: 'Review', style: { 'background-color': '#9C27B0', color: '#FFF' } },
  { key: IssueStatus.closed, label: 'Closed', style: { 'background-color': '#4CAF50', color: '#FFF' } }
]

export interface IssueStatusView {
  key: IssueStatus
  label: string
  style: any
}
