import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
// import { ChatbotComponent } from './pages/chatbot/chatbot.component';


const routes: Routes = [
  { path: '', component: BienvenidoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'movimientos', component: BienvenidoComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'bienvenido' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
