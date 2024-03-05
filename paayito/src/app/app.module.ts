import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './_helpers/token.interceptor';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { TabsModule} from 'ngx-bootstrap/tabs';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { ReportPaymentsContaComponent } from './pages/report-payments-conta/report-payments-conta.component';
import { CashboxComponent } from './pages/cashbox/cashbox.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    AddclientComponent,
    EditclientComponent,
    AddcreditComponent,
    EditcreditComponent,
    ReportCreditsComponent,
    ReportPaidComponent,
    FinalizedComponent,
    SearchComponent,
    AddpaymentComponent,
    ApproveComponent,
    DisperseComponent,
    ReportPaymentsComponent,
    ReportPaymentsContaComponent,
    CashboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SelectDropDownModule,
    TabsModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
