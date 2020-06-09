import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Network } from '@ionic-native/network/ngx';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage, AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';
import { GoogleMaps } from '@ionic-native/google-maps';
import { LocationPopoverPageModule } from './pages/location-popover/location-popover.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
     AppRoutingModule,
     AngularFireModule.initializeApp(environment.firebase),
     LocationPopoverPageModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Network,
    AngularFireAuth,
    AngularFirestore,
    AngularFireStorage,
    GoogleMaps,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
