import { Injectable } from '@angular/core'

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class TastesService {
  tastesCollection: AngularFirestoreCollection<any>

  constructor(private afs: AngularFirestore) {
    this.tastesCollection = this.afs.collection('tastes', ref => ref.orderBy('time', 'desc').limit(5))
  }

  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.tastesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data()
          return { id: a.payload.doc.id, ...data }
        })
      })
    )
  }

  getTaste(id: string) {
    return this.afs.doc<any>(`tastes/${id}`)
  }

  createTaste(content: string) {
    const taste = {
      content,
      hearts: 0,
      time: new Date().getTime()
    }
    return this.tastesCollection.add(taste)
  }

  updateTaste(id: string, data: any) {
    return this.getTaste(id).update(data)
  }

  deleteTaste(id: string) {
    return this.getTaste(id).delete()
  }
}
