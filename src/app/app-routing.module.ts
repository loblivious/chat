import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivateAuthenticated } from './shared/guards/auth.guard';
import { canActivateLogin } from './shared/guards/login.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [canActivateAuthenticated()],
    loadChildren: () =>
      import('./home/home.component').then((m) => m.HomeComponentModule),
  },
  {
    path: 'login',
    canActivate: [canActivateLogin()],
    loadChildren: () =>
      import('./login/login.component').then((m) => m.LoginComponentModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
