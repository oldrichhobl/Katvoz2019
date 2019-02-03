import { Component } from '@angular/core';
import { GlobalService } from "../global.service";
import { HermesProvider } from '../hermes';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

   constructor( public global: GlobalService,
   	            public hermes: HermesProvider)
   	{
   	console.log("** Constructor HomePage");
   	console.log("Global.v " + global.version);	
   	console.log("Hermes.v " + hermes.version);	
   	}

   openLocalSpz() {
     console.log("openLocalSpz")  
   }


}
