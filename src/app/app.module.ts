import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ServerService } from './server.service';
import { TreeComponent } from './tree/tree.component';


@NgModule({
  declarations: [AppComponent, TreeComponent],
  imports: [BrowserModule, HttpClientModule, MatTreeModule, MatIconModule],
  providers: [ServerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
