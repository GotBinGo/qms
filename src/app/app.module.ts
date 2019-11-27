import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatDialogModule, MatSnackBarModule, MatProgressSpinnerModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NewNumberComponent } from './new-number/new-number.component';
import { ServeComponent } from './serve/serve.component';
import { HistoryComponent } from './history/history.component';
import { Interceptor } from './login/interceptor';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { TextInputModalComponent } from './text-input-modal/text-input-modal.component';
import { RouterModule, Routes } from '@angular/router';
import { RoleModalComponent } from './role-modal/role-modal.component';
import { CasePickerModalComponent } from './case-picker-modal/case-picker-modal.component';

const appRoutes: Routes = [
  { path: '**', component: NewNumberComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewNumberComponent,
    ServeComponent,
    HistoryComponent,
    ConfirmModalComponent,
    TextInputModalComponent,
    RoleModalComponent,
    CasePickerModalComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // NoopAnimationsModule,
    MatStepperModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ZXingScannerModule,
  ],
  entryComponents: [ConfirmModalComponent, TextInputModalComponent, RoleModalComponent, CasePickerModalComponent],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
