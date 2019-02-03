import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from "../global.service";
import { HermesProvider } from '../hermes';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public autoNod: any;
  public auto: any;
 
  constructor(  private route: ActivatedRoute, 
                public global: GlobalService,
                public hermes: HermesProvider
  	)
    {
     console.log("** constructor na detail.page.ts **")
    }
 
  ionViewWillEnter(){
    let todoId = this.route.snapshot.queryParamMap.get('id');
    console.log("!!! ionViewWillEnter na detail.page.ts " + todoId);
    console.dir(this.route.snapshot);
    this.autoNod = this.hermes.getAuto(todoId);
    this.auto = 
        {
        	spz: this.autoNod.getElementsByTagName("SPZ")[0].innerHTML,
        	dz:  this.autoNod.getElementsByTagName("DZ")[0].attributes['n'].value
        }
    
    // this.hermes.showData(this.auto.spz);
    let Card = document.getElementById("card");
    // Card.appendChild(this.hermes.resultDocument);   
    Card.appendChild(this.hermes.showData(this.auto.spz));
  }
 

  ngOnInit() {


  }

}
