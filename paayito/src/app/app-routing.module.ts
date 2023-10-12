import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddclientComponent } from './pages/addclient/addclient.component';
import { EditclientComponent } from './pages/editclient/editclient.component';
import { AddcreditComponent } from './pages/addcredit/addcredit.component';
import { EditcreditComponent } from './pages/editcredit/editcredit.component';
import { ReportCreditsComponent } from './pages/report-credits/report-credits.component';
import { ReportPaidComponent } from './pages/report-paid/report-paid.component';
import { FinalizedComponent } from './pages/finalized/finalized.component';
import { SearchComponent } from './pages/search/search.component';
import { AddpaymentComponent } from './pages/addpayment/addpayment.component';
import { ApproveComponent } from './pages/approve/approve.component';
import { DisperseComponent } from './pages/disperse/disperse.component';
import { ReportPaymentsComponent } from './pages/report-payments/report-payments.component';

const routes: Routes = [
  { path: '', component: HomeComponent,canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard] },
  { path: 'addclient', component: AddclientComponent,canActivate: [AuthGuard] },
  { path: 'editclient', component: EditclientComponent,canActivate: [AuthGuard] },
  { path: 'addcredit', component: AddcreditComponent,canActivate: [AuthGuard] },
  { path: 'editcredit', component: EditcreditComponent,canActivate: [AuthGuard] },
  { path: 'report_credits', component: ReportCreditsComponent,canActivate: [AuthGuard] },
  { path: 'report_paid', component: ReportPaidComponent,canActivate: [AuthGuard] },
  { path: 'finalized', component: FinalizedComponent,canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent,canActivate: [AuthGuard] },
  { path: 'addpayment', component: AddpaymentComponent,canActivate: [AuthGuard] },
  { path: 'approve', component: ApproveComponent,canActivate: [AuthGuard] },
  { path: 'disperse', component: DisperseComponent,canActivate: [AuthGuard] },
  { path: 'report_payments', component: ReportPaymentsComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path:'**', pathMatch:'full', redirectTo:'' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
