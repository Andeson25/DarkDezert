import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import {Phone} from '../model/phone';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  readonly collection: string = 'phone';


  constructor(private  db: AngularFirestore) {

  }

  findAll(): Observable<any[]> {
    return this.db.collection(this.collection).snapshotChanges()
      .map(docArr => {
        return docArr.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          };
        });
      });
  }

  findOne(id: string): Observable<any> {
    return this.db.doc(`${this.collection}/${id}`).snapshotChanges().map(doc => {
      return {
        id: doc.payload.id,
        ...doc.payload.data()
      };
    });
  }

  delete(id: string) {
    return this.db.doc(`${this.collection}/${id}`).delete().catch(err => {
      console.log(err);
    });
  }

  save(phone: Phone) {
    return this.db.collection(this.collection).add(
      {
        phone: phone.phone
      })
      .catch(err => {
        console.log(err);
      });
  }

  update(phone: Phone) {
    return this.db.doc(`${this.collection}/${phone.id}`).update(
      {
        phone: phone.phone
      })
      .catch(err => {
        console.log(err);
      });
  }


}
