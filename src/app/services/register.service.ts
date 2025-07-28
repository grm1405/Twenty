import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  registerUser(data: any): Promise<string> {
    
    
    return new Promise((resolve, reject) => {
      if (data.email && data.password) {
        
        resolve('accept');
      } else {
        
        reject('Datos incompletos');
      }
    });
  }
}
