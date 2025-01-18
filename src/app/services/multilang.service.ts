import { TranslateService } from '@ngx-translate/core';
import { effect, inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MultilangService {

  translateService = inject(TranslateService);

  languageSignal = signal<string>(
    JSON.parse(window.localStorage.getItem('languageSignal')?? '"en"')
  );

  updateLanguage(language: string):void{
    this.languageSignal.update( () =>{
      switch(language){
        case "en":
          return "en";
        case "fr":
          return "fr";
        case "es":
        return "es";
        case "ru":
          return "ru";
        case "ch":
          return "ch";
        default:
          return "fr"
      }
    });
  }


  constructor() {
    effect(()=>{
      window.localStorage.setItem('languageSignal', JSON.stringify(this.languageSignal()));
      this.translateService.use(this.languageSignal());
      console.log(this.languageSignal);

    });
   }
}
