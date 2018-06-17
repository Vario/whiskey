import { Injectable } from '@angular/core'

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { AuthService } from '../core/auth.service'

interface WhiskeyBottle {
  name: string
  brand: string
  ownerid: string
  price: number
  size: number
  usedtastes: number
  available: boolean
  hearts: number
  createdAt: number
}

@Injectable()
export class WhiskeyService {
  whiskeybottleCollection: AngularFirestoreCollection<any>
  whiskeyDocument: AngularFirestoreDocument<any>
  authService: AuthService
  constructor(private afs: AngularFirestore, authService: AuthService) {
    this.whiskeybottleCollection = this.afs.collection('whiskeybottles', ref =>
      ref.orderBy('createdAt', 'desc').limit(5)
    )
    this.authService = authService
  }

  getWhiskeyBottles(): Observable<any[]> {
    console.log('get whiskeybottles')
    return this.whiskeybottleCollection.snapshotChanges().pipe(
      map(actions => {
        let res = actions.map(a => {
          const data = a.payload.doc.data()
          console.log('whiskey: ' + a.payload.doc.id)
          return { id: a.payload.doc.id, ...data }
        })
        return res
      })
    )
  }

  getWhiskey(id: string) {
    return this.afs.doc<any>(`whiskeybottles/${id}`)
  }

  createWhiskey(name: string, brand: string) {
    console.log('new whiskey for: ' + this.authService.userID)
    const w: WhiskeyBottle = {
      name: name,
      brand: brand,
      hearts: 0,
      createdAt: new Date().getTime(),
      ownerid: this.authService.userID,
      price: 0,
      size: 0.7,
      usedtastes: 0,
      available: true
    }
    return this.whiskeybottleCollection.add(w)
  }

  updateWhiskey(id: string, data: WhiskeyBottle) {
    return this.getWhiskey(id).update(data)
  }

  tasteWhiskey(data: any) {
    console.log('taste whiskey:' + data.id)
  }
}
