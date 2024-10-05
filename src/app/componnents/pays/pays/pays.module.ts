import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({ // Configuration du module Toastr
      positionClass: 'toast-top-right', // Position des notifications
      preventDuplicates: true, // Empêcher les notifications en double
    })
  ],
  exports: [ToastrModule] // Exporter le module pour qu'il soit utilisé ailleurs
})
export class PaysModule { }
