import { Component,OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsuarioCardComponent } from '../../components/usuario-card/usuario-card.component';
import { RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [UsuarioCardComponent, RouterLink, NgFor, CommonModule],
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.css'
})

export class UsuariosListComponent implements OnInit {
  arrUsuarios: IUsuario[] = [];
  paginaActual: number = 1;
  usuariosPorPagina: number = 8;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.getAll().subscribe(
      usuarios => {
        this.arrUsuarios = usuarios;
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
  }

  obtenerPaginas(): number[] {
    const totalPaginas = Math.ceil(this.arrUsuarios.length / this.usuariosPorPagina);
    return Array(totalPaginas).fill(0).map((x, i) => i + 1);
  }



}
