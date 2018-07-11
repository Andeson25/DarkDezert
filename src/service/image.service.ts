import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {Image} from '../model/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private db: AngularFirestore, private  fs: AngularFirestore) {

  }

  uploadPhoto(event: any) {
    const file: File = event.target.files[0];
    const metaData = {'contentType': file.type};
    const storageRef = firebase.storage().ref(`/photos/${file.name}`);
    const uploadTask = storageRef.put(file, metaData);
    uploadTask.then(() => {
      firebase.storage().ref(`/photos/${file.name}`).getDownloadURL().then(url => {
        this.db.collection('/images').add({path: url, name: file.name}).catch(err => {
          console.log(err);
        });
      });
    });
  }

  findAll(): Observable<any[]> {
    return this.db.collection('images').snapshotChanges()
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
    return this.db.doc(`images/${id}`).snapshotChanges().map(doc => {
      return {
        id: doc.payload.id,
        ...doc.payload.data()
      };
    });
  }

  delete(image: Image) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`/photos/${image.name}`).delete().then(() => {
      this.db.doc(`images/${image.id}`).delete().catch(err => {
        console.log(err);
      });
    }, err => {
      console.log(err);
    });

  }
}
