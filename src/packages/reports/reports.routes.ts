import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { OverviewComponent } from './components/overview/overview.component'
import { ReportComponent } from './components/report/report.component'

export const ReportsRoutes = [{
  path: 'reports',
  component: WrapperComponent,
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: ':id', component: ReportComponent },
    { path: '', pathMatch: 'full', redirectTo: 'overview' }
  ]
}]
