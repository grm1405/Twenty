import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule , NavController} from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  // (Tarea) crear un nuevo guard para cuando intente entrar al home validar si estoy logueado si no redirigir al login 

  loginForm: FormGroup;
  errorMessage: string =" ";

  validation_messages = {
    email: [
      { type: 'required', message: 'El Email es obligatorio.' },
      { type: 'email', message: 'Verifica tu Email.' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres.' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  ngOnInit() {}

  loginUser() {
  const credentials = this.loginForm.value;

  this.authService.loginUser(credentials).then((res: string) => {
  this.errorMessage ="";
  this.navCtrl.navigateForward('/home');
  


    console.log('✅ Login correcto:', res);

    
    console.log('📧 Email:', credentials.email);
    console.log('🔐 Contraseña:', credentials.password);

    
  }).catch((err: string) => {
  this.errorMessage = err; 
});

}

}



