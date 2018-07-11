import {Injectable} from '@angular/core';
import {Links} from '../model/links';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  readonly collection: string = 'links';


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

  save(links: Links) {
    return this.db.collection(this.collection).add(
      {
        youtube: links.youtube,
        instagram: links.instagram,
        soundcloud: links.soundcloud,
        facebookL: links.facebook
      }
    ).catch(err => {
      console.log(err);
    });
  }

  update(links: Links) {
    return this.db.doc(`${this.collection}/${links.id}`).update(
      {
        youtube: links.youtube,
        instagram: links.instagram,
        soundcloud: links.soundcloud,
        facebookL: links.facebook
      }).catch(err => {
      console.log(err);
    });
  }


}
