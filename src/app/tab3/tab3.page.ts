import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import {  ToastController,
  IonSpinner,
  Platform,
  LoadingController } from '@ionic/angular';

import { Locate, LocationService} from '../services/location.service'; 


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  locateData: Locate[];
  loading: any;

  constructor( 
    private locateService: LocationService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private platform: Platform,
    private firebaseStorage: AngularFireStorage
  ) {}

  async ngOnInit() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: "lines"
    });
    await this.loading.present();
    this.locateService.getLocates().subscribe( rslt => {
      this.locateData = rslt;
      this.loading.dismiss();
    });
  }

  remove(gdata) {

    this.firebaseStorage.storage.refFromURL(gdata.imgsrc).delete()
    .then( () => {
      this.locateService.removeLocate(gdata.id);
    })
    .catch(err => {
      alert("Failed to delete record");
    });
  }

}
