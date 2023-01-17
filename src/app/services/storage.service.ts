import { Injectable } from '@angular/core';
import * as SecureLS from 'secure-ls';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

    private _ls = new SecureLS({ encodingType: 'aes'});
  constructor(private jwtHelper: JwtHelperService) { }

  set(key: string, value: any, expired: number = 0) {
    /*let secretKey =  this.jwtHelper.decodeToken(localStorage.getItem('token')).userSigningKey
    console.log( 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx', secretKey )*/
      //this._ls = new SecureLS({ encodingType: 'aes'  });
    this._ls.set(key, value);
  }

  remove(key: string) {
    //this._ls = new SecureLS({ encodingType: 'aes'  });
    this._ls.remove(key);
  }

  get(key: string) {
    //this._ls = new SecureLS({ encodingType: 'aes'  });
    return this._ls.get(key);
  }

  clear() {
    //this._ls = new SecureLS({ encodingType: 'aes'  });
    this._ls.removeAll();
  }
}
