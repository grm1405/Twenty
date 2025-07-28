// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  loginUser(credentials: any): Promise<string> {
    return new Promise(async (resolve, reject) => {
      if (
        credentials.email === 'grmrodri@gmail.com' &&
        credentials.password === '12345678'
      ) {
        await this.storage.set('login', true); // ✅ Guardar login exitoso
        resolve('login correcto');
      } else {
        reject('login incorrecto');
      }
    });
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.storage.get('login') === true;
  }
}



