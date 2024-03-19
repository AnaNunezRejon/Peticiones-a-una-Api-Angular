import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-botonera',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './botonera.component.html',
  styleUrl: './botonera.component.css'
})
export class BotoneraComponent {
  @Input() parent: string = "";
  @Input() idUsuario: string | undefined = "";
  usuariosService = inject(UsuariosService)

  async borrarUsuario(id: string | undefined) {
    if (id !== undefined) {
      const usuario = await this.usuariosService.getById(id);
      const result = await Swal.fire({
        icon: 'warning',
        title: '¿Está seguro?',
        text: `¿Seguro que desea borrar el usuario ${usuario.username} ?`,
        background: '#333',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, borrarlo',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        const response = await this.usuariosService.delete(id);

        if (response._id) {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: `Se ha borrado correctamente el usuario ${usuario.username}`,
            background: '#333',
            confirmButtonColor: 'rgb(255, 217, 0)',
            confirmButtonText: 'Aceptar',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Ha ocurrido un error al intentar borrar el usuario.',
            background: '#333', // Color de fondo del cuadro de diálogo
            confirmButtonColor: 'rgb(255, 217, 0)', // Color del botón OK
            confirmButtonText: 'Aceptar',
          });
        }
      }
    }
  }
}
