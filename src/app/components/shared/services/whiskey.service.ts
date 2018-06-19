import { Injectable } from '@angular/core'

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { AuthService } from './auth.service'
import { WhiskeyBottle } from './../../whiskey/whiskeybottle.model'

@Injectable()
export class WhiskeyService {
  whiskeybottleCollection: AngularFirestoreCollection<any>
  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.whiskeybottleCollection = this.afs.collection('whiskeybottles', ref =>
      ref.orderBy('createdAt', 'desc').limit(5)
    )
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

  createWhiskey(name: string, brand: string, price: number, size: number) {
    console.log('new whiskey for: ' + this.authService.userID)
    const w = {
      name: name,
      brand: brand,
      hearts: 0,
      createdAt: new Date().getTime(),
      ownerid: this.authService.userID,
      price: price,
      size: size,
      imageUrl: "https://www.google.at/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiB6cjl4t3bAhXCZ1AKHYTwCk8QjRx6BAgBEAU&url=https%3A%2F%2Fwww.drinksupermarket.com%2Fjack-daniels-old-no-7-tennessee-bourbon-whiskey-miniature-5cl-40-abv&psig=AOvVaw2TVAJxvaQr6ev24u_idQOK&ust=1529428700337926",
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
