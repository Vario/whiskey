import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatCardModule, MatDialogModule, MatToolbarModule, MatIconModule, MatGridListModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { WhiskeyBottleListComponent } from './whiskey-bottlelist/whiskey-bottlelist.component'
import { WhiskeyDetailComponent } from './whiskey-detail/whiskey-detail.component'
import { WhiskeyAddComponent } from './whiskey-add/whiskey-add.component'

import { WhiskeyService } from './whiskey.service'

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
  entryComponents: [WhiskeyAddComponent],
  declarations: [WhiskeyBottleListComponent, WhiskeyDetailComponent, WhiskeyAddComponent],
  providers: [WhiskeyService]
})
export class WhiskeyModule {}
