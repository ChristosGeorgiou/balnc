import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@balnc/shared';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { CreateIssueComponent } from './create-issue/create-issue.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { IssueComponent } from './issue/issue.component';
import { ManageComponent } from './manage/manage.component';
import { OverviewComponent } from './overview/overview.component';
import { FilterIssuesPipe, ProjectComponent } from './project/project.component';
import { ProjectsRoutes } from './projects.routes';
import { ProjectsService } from './_shared/projects.service';
import { ProjectsResolver } from './_shared/resolver';
import { ShellComponent } from './_shell/shell.component';

@NgModule({
  imports: [
    SharedModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: false,
          tables: false,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: false,
          smartypants: false
        }
      }
    }),
    RouterModule.forChild(ProjectsRoutes)
  ],
  declarations: [
    ShellComponent,
    OverviewComponent,
    ProjectComponent,
    IssueComponent,
    CreateIssueComponent,
    CreateProjectComponent,
    ManageComponent,

    FilterIssuesPipe,
  ],
  providers: [
    ProjectsResolver,
    ProjectsService
  ],
  entryComponents: [
    CreateIssueComponent,
    CreateProjectComponent
  ]
})
export class ProjectsModule { }
