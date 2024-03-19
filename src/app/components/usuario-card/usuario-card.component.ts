import { Component, Input } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { RouterLink } from '@angular/router';
import { BotoneraComponent } from '../botonera/botonera.component';

@Component({
  selector: 'app-usuario-card',
  standalone: true,
  imports: [RouterLink, BotoneraComponent],
  templateUrl: './usuario-card.component.html',
  styleUrl: './usuario-card.component.css'
})
export class UsuarioCardComponent {
  @Input() miUsuario!: IUsuario;
}
