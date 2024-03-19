import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { BotoneraComponent } from '../../components/botonera/botonera.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-usuario-view',
  standalone: true,
  imports: [RouterLink, BotoneraComponent, NgIf],
  templateUrl: './usuario-view.component.html',
  styleUrl: './usuario-view.component.css'
})
export class UsuarioViewComponent {
  activatedRoute = inject(ActivatedRoute)
  usuariosService = inject(UsuariosService)
  unUsuario!: IUsuario;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      const id = params.idusuario;
      try {
        this.unUsuario = await this.usuariosService.getById(id);
      } catch (error) {
        console.log(error);
      }
    });
  }
}
