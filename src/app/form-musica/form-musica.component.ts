import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Imusica } from '../model/service/imusica';
import { MusicaService } from '../model/service/musica.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-musica',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers:[MusicaService],
  templateUrl: './form-musica.component.html',
  styleUrl: './form-musica.component.scss'
})
export class FormMusicaComponent {

  post: Imusica = {
    nome: '',
    data_lancamento:'',
    genero: '',
    imageUrl: '',
  };

  constructor(private musicaService: MusicaService, private router: Router) {}

  // Método para enviar o formulário
  onSubmit(): void {
    // Enviar o produto ao serviço PostService
    this.musicaService.addMusica(this.post).subscribe(
      (response) => {
        Swal.fire({
          title: "Item Cadastrado!",
          text: "success",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/']);
          }
        });
      },
      (error) => {
        console.error('Erro ao adicionar o produto:', error);
      }
    );
  }
}



