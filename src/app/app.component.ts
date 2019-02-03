import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { GlobalService } from "./global.service";
import { HermesProvider } from "./hermes";
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Detail',
      url: '/detail',
      icon: 'car'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public storage: Storage,
    public global: GlobalService,
    public hermes: HermesProvider,
    private theme: ThemeService

  ) 
  {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //test prohlizece pro jistotu;
       if (typeof (window as any).DOMParser != "undefined") {
         console.log("initializeAPP: OK DOMParser neni undefined !!!!!");
         }
      //Test pristupu k internetu ?? 

      // nacteni zapamatovanych dat , globalu, pristup na Herma 
      this.storage.ready().then(() => {
        this.global.readGlobals(); //??? az po nacteni globalsu ??
        this.hermes.loadXML();     // uvnitr je i selectNode() 
        this.hermes.loadXSL();     //  

        this.storage.get('theme').then(cssText => {
                this.theme.setGlobalCSS(cssText);
              });

        this.hermes.readStatus();
      });

    });
  }
}
