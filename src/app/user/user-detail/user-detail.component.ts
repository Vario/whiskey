import { Component, Input } from '@angular/core'

import { UserService } from '../user.service'

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  @Input() user: any

  constructor(private userService: UserService) {}

  /*methodXY(id: string) {
    this.userService.methodXY(id)
  }*/
}
