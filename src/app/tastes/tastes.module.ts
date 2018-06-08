import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { TastesListComponent } from './tastes-list/tastes-list.component'
import { TastesService } from './tastes.service'

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [TastesListComponent],
  providers: [TastesService]
})
export class TastesModule {}
