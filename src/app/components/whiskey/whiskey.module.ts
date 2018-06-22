import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatCardModule, MatDialogModule, MatToolbarModule, MatIconModule, MatGridListModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { WhiskeyBottleListComponent } from './bottle-list/whiskeylist.component'
import { WhiskeyBottleDetailComponent } from './bottle-detail/bottle-detail.component'
import { WhiskeyBottleAddComponent } from './bottle-add/bottle-add.component'
import { WhiskeyDashboardComponent } from './whiskeydashboard.component'
import { WhiskeyService } from '../shared/services/whiskey.service'
import { WhiskeyTasteService } from '../shared/services/whiskeytaste.service'
import { WhiskeyTasteListComponent } from './taste-list/tastelist.component'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ContractsService } from '../contract/contracts.service'
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
  declarations: [
    WhiskeyBottleAddComponent,
    WhiskeyDashboardComponent,
    WhiskeyBottleListComponent,
    WhiskeyBottleDetailComponent,
    WhiskeyTasteListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [WhiskeyService, WhiskeyTasteService]
})
export class WhiskeyModule {}
