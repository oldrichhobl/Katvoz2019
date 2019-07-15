import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Events } from '@ionic/angular';

import { GlobalService } from "./global.service";

/*
  Generated class for the HermesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root'
})
export class HermesProvider {
  public version = '15.7.19';
  public loaded: any = false; 
  public XMLdata: any;
  public XSLdata: any;
  XMLstring: string;
  XSLstring: string;
  
  public items: any;

  public resultDocument: any;

  Parser : any;
  
  locDefExpKatvoz:string = './assets/hermes/defExpKatvoz.xml';
  locKatvozList:string   = './assets/hermes/katvozlist.xml';
  locXSL:string          = './assets/hermes/convert.xsl';

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
  constructor(public http: HttpClient, public events: Events,
              public global: GlobalService) 
  {
    console.log('** HermesProvider CONSTRUCTOR **');
  }
  
  // Nacteni XML ze serveru Hermes
  loadXML() {
    console.log("hermes.ts loadXML " + this.locDefExpKatvoz);
    this.http.get(this.locKatvozList, {responseType: 'text'}).subscribe((res) => {
       console.log("NACTENO " + this.locDefExpKatvoz);
       // console.dir(res);
       this.XMLstring = res;
       // domparser
       this.Parser = new (window as any).DOMParser();
       this.XMLdata = this.Parser.parseFromString(this.XMLstring, "text/xml");
       //  console.dir(this.XMLdata);
       this.loaded = true;   // mame nacteno
       //
       this.selectNode('//RECS/REC');
       //
       this.events.publish('data:loaded', 'Data', Date.now());
       });
  }
  
// Nacteni XSL 
  loadXSL() {
    console.log("hermes.ts loadXSL " + this.locXSL);
    this.http.get(this.locXSL, {responseType: 'text'}).subscribe((res) => {
       console.log("NACTENO " + this.locXSL);
       // console.dir(res);
       this.XSLstring = res;
       // domparser
       this.Parser = new (window as any).DOMParser();
       this.XSLdata = this.Parser.parseFromString(this.XSLstring, "text/xml");
       //  console.dir(this.XMLdata);
       //  this.loaded = true;   // mame nacteno
       //
       //  this.selectNode('//RECS/REC');
       //
       //  this.events.publish('data:loaded', 'Data', Date.now());
       });
  }


  public showData(spz)
  {
    var xsltProcessor=new (window as any).XSLTProcessor();
    console.log("XSLdata + xsltProcessor ::");
    console.dir(this.XSLdata);
    console.dir(xsltProcessor);
    
        xsltProcessor.importStylesheet(this.XSLdata);   
        xsltProcessor.setParameter(null, "param1", spz);
        // xsltProcessor.setParameter(null, "param2", p2);
        // this.resultDocument = xsltProcessor.transformToFragment(this.XMLdata,document); 
        // console.dir(this.resultDocument);
    return xsltProcessor.transformToFragment(this.XMLdata,document);



  }

  readStatus()
  {
    console.log('HermesProvider> global.server: '+ this.global.server);  
    console.log('HermesProvider> this.items: '+ this.items);  
    console.log('HermesProvider> global.version: '+ this.global.version);  
  }
  getAuto(id)
  {
    id++;
    console.log('HermesProvider getAuto server: '+ this.global.server);  
    var nod = this.XMLdata.evaluate('//RECS/REC['+id+']', this.XMLdata, null, XPathResult.ANY_TYPE,null); 
    console.log("ResultType = " + nod.resultType);
    console.dir(nod);
    var actualSpan = nod.iterateNext ();
    //let auto = {
    //  spz: actualSpan.getElementsByTagName("SPZ")[0].innerHTML
    // }
    return actualSpan;
  }

  selectNode(ss)
  {
    console.log("selectNode : " + ss);
    // var nod = this.myData.XMLdata.selectElements("//RECS/R");
    var nod = this.XMLdata.evaluate(ss, this.XMLdata, null, XPathResult.ANY_TYPE,null); 
    console.log("ResultType = " + nod.resultType);
    console.dir(nod);
    this.items = [];
    let i = 0;
    var actualSpan = nod.iterateNext ();
    console.dir(actualSpan);
    console.log(actualSpan.getElementsByTagName("SPZ")[0].innerHTML);
    while (actualSpan) {
      this.items.push({
        id: i,
        title: actualSpan.getElementsByTagName("SPZ")[0].innerHTML,
        spz: actualSpan.getElementsByTagName("SPZ")[0].innerHTML,
         //spz: 'PM-' + actualSpan.evaluate('SPZ', this.hermes.XMLdata, null, XPathResult.ANY_TYPE,null).value;,
        note: actualSpan.getElementsByTagName("DZ")[0].attributes['k'].value,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
      i++;
      actualSpan = nod.iterateNext ()
    }

  }

    filterItems(searchTerm){
 
        return this.items.filter((item) => {
            return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });    
 
    }
 

}
