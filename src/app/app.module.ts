import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ServerService } from './server.service';
import { TreeComponent } from './tree/tree.component';


@NgModule({
  declarations: [AppComponent, TreeComponent],
  imports: [BrowserModule, HttpClientModule, MatTreeModule, MatIconModule, ReactiveFormsModule],
  providers: [ServerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
