import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainHeaderComponent } from './header/main-header.component';
import { MainFooterComponent } from './footer/main-footer.component';
import { MainLayoutComponent } from './main-layout.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MainHeaderComponent,
    MainFooterComponent,
    MainLayoutComponent
  ],
  exports: [
    MainLayoutComponent
  ]
})
export class MainLayoutModule { }
