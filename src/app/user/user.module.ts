import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { UserDetailComponent } from './user-detail/user-detail.component'
import { UserService } from './user.service'

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [UserDetailComponent],
  providers: [UserService]
})
export class UserModule {}
