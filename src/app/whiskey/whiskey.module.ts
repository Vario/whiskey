import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatCardModule, MatDialogModule, MatToolbarModule, MatIconModule } from '@angular/material'

import { WhiskeyBottleListComponent } from './whiskey-bottlelist/whiskey-bottlelist.component'
import { WhiskeyDetailComponent } from './whiskey-detail/whiskey-detail.component'
import { WhiskeyAddComponent } from './whiskey-add/whiskey-add.component'

import { WhiskeyService } from './whiskey.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  entryComponents: [WhiskeyAddComponent],
  declarations: [WhiskeyBottleListComponent, WhiskeyDetailComponent, WhiskeyAddComponent],
  providers: [WhiskeyService]
})
export class WhiskeyModule {}
