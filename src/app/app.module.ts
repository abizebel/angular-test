import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TestComponent } from 'src/components/Users/Users.component';
import { UsersReducer } from 'src/store/reducers/users-reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    TableModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    SidebarModule,
    ToolbarModule,
    DropdownModule,
    CalendarModule,
    MultiSelectModule,
    DividerModule,
    StoreModule.forRoot({ users: UsersReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
