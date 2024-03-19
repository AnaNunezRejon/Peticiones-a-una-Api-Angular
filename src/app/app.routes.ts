import { Routes } from '@angular/router';
import { UsuariosListComponent } from './pages/usuarios-list/usuarios-list.component';
import { UsuarioViewComponent } from './pages/usuario-view/usuario-view.component';
import { FormComponent } from './pages/form/form.component';

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "usuarios" },
  { path: "usuarios", component: UsuariosListComponent },
  { path: "usuario/:idusuario", component: UsuarioViewComponent},
  { path: "new/usuario", component: FormComponent },
  { path: "update/usuario/:id", component: FormComponent }
];
