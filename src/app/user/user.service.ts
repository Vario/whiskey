import { Injectable } from '@angular/core'

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class UserService {
  //user: AngularFirestoreCollection<any>

  constructor(private afs: AngularFirestore) {
    // this.tastesCollection = this.afs.collection('tastes', ref => ref.orderBy('time', 'desc').limit(5))
  }

  /*getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.tastesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data()
          return { id: a.payload.doc.id, ...data }
        })
      })
    )
  }*/

  getUser(id: string) {
    return this.afs.doc<any>(`users/${id}`)
  }
}
