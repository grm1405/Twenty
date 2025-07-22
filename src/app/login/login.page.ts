import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  // ✅ Mensajes de validación para email y password
  validation_messages = {
    email: [
      {
        type: 'required', message: 'El Email es obligatorio.'
      },
      {
        type: 'email', message: 'Verifica tu Email.'
      }
    ],
    password: [
      {
        type: 'required', message: 'La contraseña es obligatoria.'
      },
      {
        type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres.'
      }
    ]
  };

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ])
      )
    });
  }

  ngOnInit() {}

  loginUser(credentials: any) {
    console.log('Credenciales enviadas:', credentials);
    // Aquí podrías agregar lógica de autenticación real o navegación
  }
}

