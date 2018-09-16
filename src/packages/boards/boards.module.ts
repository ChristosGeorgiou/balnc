import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { CommonModule } from '@balnc/common'

import { BoardService } from './board.service'

import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { BoardComponent } from './components/board/board.component'
import { BoardsEntities } from './models/_entities'
import { RxDBModule } from '@balnc/core'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RxDBModule.forChild([
      ...BoardsEntities
    ])
  ],
  declarations: [
    WrapperComponent,
    BoardComponent
  ],
  providers: [
    BoardService
  ]
})
export class BoardsModule { }
