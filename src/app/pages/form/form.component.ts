import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2'
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  tipo: string = 'NUEVO';
  usuariosForm: FormGroup;
  usuariosServices = inject(UsuariosService);
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)

  imageSrc: string | undefined;

  previewImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageSrc = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  constructor() {
    this.usuariosForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required])
    }, [])
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params.id) {
        const response = await this.usuariosServices.getById(params.id);
        const imageUrl = response.image;

        this.usuariosForm = new FormGroup({
          _id: new FormControl(response._id),
          first_name: new FormControl(response.first_name, []),
          last_name: new FormControl(response.last_name, []),
          username: new FormControl(response.username, []),
          email: new FormControl(response.email, []),
          image: new FormControl(imageUrl, [])
        });
      }
    });
  }

  async getDataForm() {
    if (this.usuariosForm.valid) {
      if (this.usuariosForm.value._id) {
        const response = await this.usuariosServices.update(this.usuariosForm.value);
        if (response.id) {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: `El usuario ${response.username} se ha actualizado correctamente.`,
            background: '#333',
            confirmButtonColor: 'rgb(255, 217, 0)',
            confirmButtonText: 'Aceptar',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cerrar',
            customClass: {
              title: 'text-white',
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger',
            }
          });
          this.router.navigate(['/usuarios']);
        }
      } else {
        const response = await this.usuariosServices.insert(this.usuariosForm.value)
        if (response.id) {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: `El usuario ${response.username} se ha añadido correctamente.`,
            background: '#333',
            confirmButtonColor: 'rgb(255, 217, 0)',
            confirmButtonText: 'Aceptar',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cerrar',
            customClass: {
              title: 'text-white',
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger',
            }
          });
          this.router.navigate(['/usuarios']);
        }
      }
    }
  }
}
