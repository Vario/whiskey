import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatCardModule, MatDialogModule, MatToolbarModule, MatIconModule, MatGridListModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//import { WhiskeyBottleListComponent } from './whiskey-bottlelist/whiskey-bottlelist.component'
//import { WhiskeyDetailComponent } from './whiskey-detail/whiskey-detail.component'
import { WhiskeyBottleAddComponent } from './bottle-add/bottle-add.component'
import { WhiskeyDashboardComponent } from './whiskeydashboard.component'
import { WhiskeyService } from '../shared/services/whiskey.service'

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [WhiskeyBottleAddComponent],
  declarations: [WhiskeyBottleAddComponent, WhiskeyDashboardComponent],
  providers: [WhiskeyService]
})
export class WhiskeyModule {}
