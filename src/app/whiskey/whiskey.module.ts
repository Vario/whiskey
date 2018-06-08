import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { WhiskeyDetailComponent } from './whiskey-detail/whiskey-detail.component'
import { WhiskeyListComponent } from './whiskey-list/whiskey-list.component'
import { WhiskeyService } from './whiskey.service'

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [WhiskeyListComponent, WhiskeyDetailComponent],
  providers: [WhiskeyService]
})
export class WhiskeyModule {}
