import { Component, OnInit } from '@angular/core';
import { IonicModule,Events } from '@ionic/angular';
import { GlobalService } from "../global.service";
import { HermesProvider } from '../hermes';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  searchTerm: string = '';
  public items: Array<{ title: string; note: string; id:number; icon: string }> = [];

  constructor( public events: Events,
                public global: GlobalService,
                public hermes: HermesProvider) {
    console.log("** constructor na list.page.ts **" );
  /*
    for (let i = 1; i < hermes.items.length; i++) {
      this.items.push({
        title: hermes.items[i].spz,
        note: ' >' + hermes.items[i].note,
        id: i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
    */
  }

  ngOnInit() {
    console.log(" ngOnInit na list.page.ts");
    console.log("Global.v " + this.global.version);  
    console.log("Hermes.v " + this.hermes.version);  
    // data nactem az po udalosti  data:loaded
    // second page (listen for the user created event)
    this.events.subscribe('data:loaded', (user, time) => {
      // user and time are the same arguments passed in events.publish(user, time)`
      console.log('!!! DATA LOADED event', user, 'at', time);
      // ted konecne nactem
      ///this.selectNode('//RECS[1]/R');
         console.log(this.hermes.items.length);
    this.items = this.hermes.items;

      });   
 
 
  }

  setFilteredItems() {
        
        this.items = this.hermes.filterItems(this.searchTerm);
        console.log(" setFilteredItems na list.page.ts" + this.items);
        console.dir(this.items[0]);
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
