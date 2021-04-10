import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PgroundComponent } from './component/pground/pground.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailService } from './service/detail.service';
import { HomeComponent } from './component/home/home.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FilterService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {ToastModule} from 'primeng/toast';
import {ScrollTopModule} from 'primeng/scrolltop';
import { ScrollPanelModule } from "primeng/scrollpanel";
import { DialogModule } from "primeng/dialog";
import {RadioButtonModule, RadioControlRegistry} from 'primeng/radiobutton';
import {PaginatorModule} from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PgroundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    CardModule,
    CarouselModule,
    ToastModule,
    ScrollTopModule,
    ScrollPanelModule,
    DialogModule,
    RadioButtonModule,
    DropdownModule,
    GalleriaModule,
    PaginatorModule,
    NgxPaginationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [DetailService, FilterService, MessageService, RadioControlRegistry, PaginatorModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
