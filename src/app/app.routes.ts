import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProjectComponent } from './features/project/project.component';
import { CertificateComponent } from './features/certificate/certificate.component';
import { ExperienceComponent } from './features/experience/experience.component';

export const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'project',
    component: ProjectComponent
  },
  {
    path: 'experience',
    component: ExperienceComponent
  },
  {
    path:'certificate',
    component: CertificateComponent
  }

];
