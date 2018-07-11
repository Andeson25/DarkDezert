import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import {Email} from '../model/email';


@Injectable({
  providedIn: 'root'
})
export class EmailService {
  readonly collection: string = 'email';


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
    this.db.doc(`${this.collection}/${id}`).delete().catch(err => {
      console.log(err);
    });
  }

  save(email: Email) {
    this.db.collection(this.collection).add({email: email.email}).catch(err => {
      console.log(err);
    });
  }

  update(email: Email) {
    this.db.doc(`${this.collection}/${email.id}`).update({email: email.email}).catch(err => {
      console.log(err);
    });
  }


}
