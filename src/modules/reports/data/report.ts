import * as schema from './report.json'
import { RxDocument } from 'rxdb';

declare interface IReport {
    alias?: string
    name?: string
    description?: string
    hierarchy?: number
    fields?: any
    filters?: ReportFilter[]
    pdf?: any
}

declare interface ReportFilterType {
    name: string
    field: string
    type: string
    default?: any
    value?: any
    data?: string
    values?: any[]
}

export type Report = IReport
export type RxReportDoc = RxDocument<IReport> & IReport
export type ReportFilter = ReportFilterType
export const ReportSchema = schema