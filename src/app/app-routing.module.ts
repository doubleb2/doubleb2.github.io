import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AuthComponent }   from '../app/components/auth/auth.component';
import { DashboardComponent}     from '../app/components/dashboard/dashboard.component';
import { PagenotfoundComponent } from '../app/components/pagenotfound/pagenotfound.component';



const appRoutes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full'},
  { path: 'auth', component: AuthComponent},
 /* { path: 'registration', component: RegistrationComponent}, */
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: PagenotfoundComponent },

];


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      /*{ enableTracing: true } // <-- debugging purposes only */
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
