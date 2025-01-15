import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './components/add-project/add-project.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { AdminGuard } from './guards/admin-guard.guard';
import { LoginComponent } from './components/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ProjectService } from './services/project-service.service';
import { ProjectInterceptor } from './interceptors/project-interceptor.interceptor';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },  // Rotta di default (root)
  { path: 'dashboard', component: DashboardComponent }, // Rotta per la dashboard
  { path: 'add-project', component: ProjectsComponent },  // Rotta per la creazione di un progetto
  { path: 'add-task', component: AddTaskComponent },  // Rotta per aggiungere un task
  { path: 'tasks/:projectId', component: AddTaskComponent },  // Rotta per visualizzare i task di un progetto
 // { path: 'login', component: LoginComponent },  // La pagina di login è pubblica
 // { path: '**', redirectTo: '/login' },  // Gestisce le rotte non trovate
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProjectInterceptor,  // Classe dell'interceptor
      multi: true,  // Permette la registrazione di più interceptors
    }
  ]
})
export class AppModule {}
