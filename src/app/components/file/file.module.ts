// Modules 3rd party
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'

// Components
import { FileUploadComponent } from './upload/upload.component'

// Services
//import { MessageService } from './message.service';

@NgModule({
  declarations: [FileUploadComponent],
  imports: [CommonModule, BrowserModule],
  providers: [
    //MessageService
  ],
  exports: [FileUploadComponent]
})
export class FileModule {}
