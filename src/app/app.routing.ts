import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AuthGuard } from './guards/auth.guard';
import {HomePageComponent} from '../app/views/home-page/home-page.component'
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { P401Component } from './views/error/401.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { SubjectComponent } from './views/subject/subject.component';
export const routes: Routes = [
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: 'subjects',
    component: SubjectComponent,
    data: {
      title: 'Subjects'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: '401',
    component: P401Component,
    data: {
      title: 'Page 401'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
    {
      path: 'homePage',
      component: HomePageComponent,
      data: {
        title: 'Home Page'
      }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Acceuil'
    },
    children: [

      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'subjectForm',
        loadChildren: () => import('./views/subjectform/subjectform.module').then(m => m.SubjectFormModule)
      },
      {
        path: 'userProfile',
        loadChildren: () => import('./views/userProfile/userprofile.module').then(m => m.UserProfileModule)
      },
      {
        path: 'listusers',
        loadChildren: () => import('./views/listusers/listusers.module').then(m => m.ListUsersModule)
      },
      {
        path: 'applicationForm/:id/:title',
        loadChildren: () => import('./views/applicationform/applicationform.module').then(m => m.ApplicationFormModule)
      },
      {
        path: 'collabdashboard',
        loadChildren: () => import('./views/collabdashboard/collabdashboard.module').then(m => m.CollabDashboardModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
