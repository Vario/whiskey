import { Component, OnInit } from '@angular/core'
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage'
import { Observable } from 'rxjs'
import { AngularFirestore } from 'angularfire2/firestore'
@Component({
  selector: 'file-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class FileUploadComponent {
  // Main task
  task: AngularFireUploadTask

  // Progress monitoring
  percentage: Observable<number>

  snapshot: Observable<any>

  // Download URL
  downloadURL: Observable<string>

  // State for dropzone CSS toggling
  isHovering: boolean

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) {}

  toggleHover(event: boolean) {
    this.isHovering = event
  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return
    }

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`

    // The main task
    this.task = this.storage.upload(path, file, {})

    // Progress monitoring
    this.percentage = this.task.percentageChanges()
    this.snapshot = this.task.snapshotChanges()

    // The file's download URL
    //this.downloadURL = this.task.task.snapshot.downloadURL
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }
}
