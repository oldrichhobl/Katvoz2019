import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,Events } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { GlobalService } from "../global.service";
import { HermesProvider } from '../hermes';
import { ListPage } from './list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListPage
      }
    ])
  ],
  providers: [

  ],

  declarations: [ListPage]
})
export class ListPageModule {}
