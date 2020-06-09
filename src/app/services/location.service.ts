import { Injectable } from '@angular/core';
import { Observable, fromEventPattern } from 'rxjs';
import { map } from 'rxjs/operators';
//  importing angular fire2
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from 'angularfire2/firestore';

export interface Locate {
  id: any;
  glatitude: number;
  glongitude: number;
  imgsrc: string;
  description: string;
}


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private locateCollection: AngularFirestoreCollection<Locate>;
  private locates: Observable<Locate[]>;

  constructor( db: AngularFirestore) {

    this.locateCollection = db.collection<Locate>('locates');
    this.locates = this.locateCollection.snapshotChanges()
    .pipe(map(actions => {
      return actions.map(a => {
        const gdata = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...gdata };
      });
    }));

  }

  getLocates()  {
    return this.locates;
  }

  getLocate(id) {
    return this.locateCollection.doc(id).valueChanges();
  }

  updateLocate(locateData: Locate, id: string) {
    return this.locateCollection.doc(id).update(locateData);
  }

  addLocate(locateData: Locate) {
    return this.locateCollection.add(locateData);
  }

  removeLocate(id){
    return this.locateCollection.doc(id).delete();
  }

}
