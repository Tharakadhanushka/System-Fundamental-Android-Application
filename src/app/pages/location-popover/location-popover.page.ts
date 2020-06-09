import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, NavController } from '@ionic/angular';
import { LocationService, Locate } from 'src/app/services/location.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-location-popover',
  templateUrl: './location-popover.page.html',
  styleUrls: ['./location-popover.page.scss'],
})
export class LocationPopoverPage implements OnInit {

  userId: null;
  locationImg = null;
  locationId = null;
  locationData: any;
  imgs = null;
  trash: any;
  nodata = null;
  dataStatusNeg = null;
  resportStatus: string = null;
  testForData: Observable<any>;
  connectionSub: Subscription;
  userCollection: AngularFirestoreCollection<any>;
  userAccSub: Subscription;
  date: Date = new Date();
  constructor(
    private navParams: NavParams,
    private popoverCtrl: PopoverController,
    private firebaseStorage: AngularFireStorage,
    private locateService: LocationService,
    private navCtrl: NavController,
    private afs: AngularFirestore
  ) { }

   async ngOnInit() {
    try {
      
      const currentDate = 'Date:' + this.date.getDate() + '-' + this.date.getMonth();

      this.userId = this.navParams.get('userId');
      this.locationImg = this.navParams.get('location_img');
      this.locationId = this.navParams.get('location_id');
      this.userCollection = this.afs.collection(`users/${this.userId}/${currentDate}`);
  
      this.testForData = await this.locateService.getLocate(this.locationId);
      this.connectionSub = await this.testForData.subscribe((data) => {
        if ( data ) {
          this.dataStatusNeg = false;
          this.imgs = data.imgsrc;
          this.trash = {
            lat: data.glatitude,
            lng: data.glongitude
          };
          this.resportStatus = 'data positvie ';
        } else if (this.resportStatus == null) {
          this.dataStatusNeg = true;
          this.resportStatus = 'data neg';
        }
      });

    } catch (error) {
      alert('Error : ' + error);
    }
  }

  ionViewDidLeave() {
    this.connectionSub.unsubscribe();
    this.userAccSub.unsubscribe();
  }

  async cleanTrash() {
    try {
      await this.locateService.removeLocate(this.locationId)
      .then( async () => {
        await this.userCollection.add({
          lat: this.trash.lat,
          lng: this.trash.lng,
          status: 'green',
          tm: this.date.toString()
        });
        await this.firebaseStorage.storage.refFromURL(this.locationImg).delete();
        this.closePopOver();
      })
      .catch( (err) => {
        alert('Failed to Delete ');
        this.closePopOver();
      });
    } catch (error) {
      alert('Failed : '+ error );
      this.closePopOver();
    }
  }

  closePopOver() {
    this.popoverCtrl.dismiss();
  }
}
