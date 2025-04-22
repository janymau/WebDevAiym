import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Импорт RouterModule для маршрутизации
import { appRoutes } from './app.routes';  // Импорт настроенных маршрутов
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component'; // Компонент для продуктов

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,  // Компонент продуктов
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),  // Использование маршрутов
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
