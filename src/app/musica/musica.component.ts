import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MusicaService } from '../model/service/musica.service';
import { Imusica } from '../model/service/imusica';
import { DataFormaPipe } from '../data-forma.pipe';

@Component({
  selector: 'app-musica',
  standalone: true,
  imports: [CommonModule, HttpClientModule, DataFormaPipe],
  providers:[MusicaService],
  templateUrl: './musica.component.html',
  styleUrl: './musica.component.scss'
})
export class MusicaComponent {

  musicas: Imusica[] = [];

  constructor(private musicaService: MusicaService) { }

  ngOnInit(): void {
    this.musicaService.getMusicas().subscribe((musica) => {
      this.musicas = musica;
    });
  }
  musica= [
    { nome: 'Song 1', imageUrl: 'url-to-image1' },
    { nome: 'Song 2', imageUrl: 'url-to-image2' },
    { nome: 'Song 3', imageUrl: 'url-to-image3' },
    { nome: 'Song 4', imageUrl: 'url-to-image4' }
  ];

  currentIndex = 0;

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
    this.updateCarousel();
  }

  nextSlide() {
    if (this.currentIndex < this.musicas.length - 1) {
      this.currentIndex++;
    }
    this.updateCarousel();
  }

  updateCarousel() {
    const carousel = document.querySelector('.carousel') as HTMLElement;
    const slideWidth = carousel.offsetWidth / this.musicas.length;
    carousel.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;
  }
}



