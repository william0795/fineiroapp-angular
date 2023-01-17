import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

    currentLanguage :string;

  constructor() {
    this.setLanguage();
   }


  getLanguage() {
	return this.currentLanguage;
  }

  setLanguage(){
      let data = JSON.parse( localStorage.getItem('dataPOrg') );
      let lng = data && data.acceptLanguage ? data.acceptLanguage : 'es_EC';
      if( lng === 'es_EC' ){
        this.currentLanguage = 'es';
      }else{
        this.currentLanguage = lng;
      }
  }
}
