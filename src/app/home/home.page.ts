import { Component, OnInit } from '@angular/core'; 
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  colorClaro = 'var(--color-claro)';
  colorOscuro = 'var(--color-oscuro)';
  colorActual = this.colorOscuro;

  modoClaro = false; 

  genres = [
    {
      title: "Musica clasica",
      image: "https://wallpapers.com/images/featured/musica-clasica-a58kbdl0oe9y9hxf.jpg",
      description: "La música clásica es la corriente musical que se basa principalmente en la música producida o basada en las tradiciones de la música litúrgica y secular de Occidente, principalmente Europa Occidental.",
    },
    {
      title: "Rock",
      image: "https://www.ifema.es/img/xl/grupo-rock-roll/grupo-rock-and-roll.jpeg",
      description: "El rock es un género musical que se originó en Estados Unidos en la década de 1950, con raíces en el rhythm and blues y el country.",
    },
    {
      title: "Musica alternativa",
      image: "https://i.iheart.com/v3/re/new_assets/5dd82ab12e9c6515bf8078c9?ops=contain(1480,0)",
      description: "La música alternativa es un término amplio que se refiere a un tipo de música que se aparta de los estilos musicales más populares y comerciales.",
    },
    {
      title: "reaggueton",
      image: "https://panoramacultural.com.co/media/images/articulos/2021/09/15051334.jpg",
      description: "La música reggaeton es un género musical que se originó en Puerto Rico en la década de 1990. Combina influencias de reggae, hip hop, y música caribeña.",
    },
    {
      title: "Pop",
      image: "https://i8.amplience.net/i/naras/RA_2022_In_Review_Pop_HeroCollage_1644x925-",
      description: "La música pop,es un género musical caracterizado por melodías pegadizas, ritmos bailables y estructuras simples, a menudo con letras sobre temas cotidianos como el amor y las relaciones.",
    },
  ];

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadStorageData();

    const introVisto = await this.storageService.get('vistoIntro');
    if (!introVisto) {
      console.log("Redirigiendo a Intro...");
      this.router.navigateByUrl('/intro');
    }
  }

  async CambiarColor() {
    this.colorActual = this.colorActual === this.colorOscuro ? this.colorClaro : this.colorOscuro;
    await this.storageService.set('theme', this.colorActual);
    console.log('Tema guardado:', this.colorActual);
  }

  async loadStorageData() {
    const savedTheme = await this.storageService.get('theme');
    if (savedTheme) {
      this.colorActual = savedTheme;
    }
  }

  cambiarEstiloSlide() {
    this.modoClaro = !this.modoClaro;
  }

  verIntro() {
    this.router.navigateByUrl('/intro');
  }
}
