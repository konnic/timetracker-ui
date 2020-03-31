// Angular modules
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
// Project components
import {AppComponent} from './app.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {EnterHoursComponent} from './enter-hours/enter-hours.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SettingsComponent} from './settings/settings.component';
import {TimeInputComponent} from './shared/time-input/time-input.component';
import {DropdownComponent} from './shared/dropdown/dropdown.component';
import {DatePickerComponent} from './enter-hours/date-picker/date-picker.component';
import {TextareaComponent} from './shared/textarea/textarea.component';
// Other third party components
import {CalendarModule} from 'primeng/calendar';

const appRoutes: Routes = [
  {path: 'enter-hours', component: EnterHoursComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'settings', component: SettingsComponent},
  // Default redirect path
  {path: '', redirectTo: '/enter-hours', pathMatch: 'full'},
  // Wildcard route for any incorrectly typed URL
  {path: '**', component: EnterHoursComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EnterHoursComponent,
    DashboardComponent,
    SettingsComponent,
    TimeInputComponent,
    DropdownComponent,
    DatePickerComponent,
    TextareaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} /** for debugging only */
    ),
    CalendarModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
