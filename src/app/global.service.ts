import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public version = '15.07A.2019';
  public server: string = "SERVER PUVODNI";
  public name: string;
  public password: string;

  constructor(public storage: Storage) {
    console.log('** HELLO GlobalService SERVICE');
 

  }

  public readGlobals()
  {
       // Or to get a key/value pair
    this.storage.get('server').then((val) => {
       this.server = val;
    });
    this.storage.get('name').then((val) => {
       this.name = val;
    });
    this.storage.get('password').then((val) => {
       this.password = val;
    });
   
  }
  public storeGlobals()
  {
  	this.logGlobals();
  	this.storage.set('server',this.server);
  	this.storage.set('name',this.name);
  	this.storage.set('password',this.password);
  }
  public logGlobals()
  {
  	console.log("*server = " + this.server);
  	console.log("*name = " + this.name);
  	console.log("*password = " + this.password);
  }

}
