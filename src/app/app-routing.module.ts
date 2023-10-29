import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewJournalsComponent } from './journal/components/view-journals/view-journals.component';
import { EditJournalComponent } from './journal/components/edit-journal/edit-journal.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './authentication/components/login/login.component';
import { AddJournalComponent } from './journal/components/add-journal/add-journal.component';
import { AuthGuardService } from './authentication/services/auth-guard.service';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'homeAdmin',component:AddJournalComponent,canActivate:[AuthGuardService]},
  {path:'edit-journal',component:EditJournalComponent,canActivate:[AuthGuardService]},
  {path:'login',component:LoginComponent},
  {path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
