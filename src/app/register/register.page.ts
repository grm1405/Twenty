import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { RegisterService } from '../services/register.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  validation_messages = {
    nombre: [
      { type: 'required', message: 'El nombre es obligatorio.' }
    ],
    apellido: [
      { type: 'required', message: 'El apellido es obligatorio.' }
    ],
    email: [
      { type: 'required', message: 'El email es obligatorio.' },
      { type: 'email', message: 'Debes ingresar un email válido.' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres.' }
    ]
  };

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private navCtrl: NavController,
    private storage: Storage,
    private toastController: ToastController
  ) {
    this.registerForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  async ngOnInit() {
    await this.storage.create();
  }

  async registerUser() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      try {
        const result = await this.registerService.registerUser(formData);

        if (result === 'accept') {
          await this.storage.set('registro', formData);

          const toast = await this.toastController.create({
            message: '✅ Registro exitoso, redirigiendo al login...',
            duration: 2000,
            color: 'success'
          });
          await toast.present();

          this.navCtrl.navigateRoot('/login');
        } else {
          this.showErrorToast('❌ El registro no fue exitoso');
        }
      } catch (error) {
        this.showErrorToast('❌ Error al registrar: ' + error);
      }
    }
  }

  async showErrorToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500,
      color: 'danger'
    });
    await toast.present();
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }

  
}
