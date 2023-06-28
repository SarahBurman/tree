import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Directory } from '../utils';
import { Observable, Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'tree-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit, OnDestroy {

  rootDirectory$: Observable<Directory> | undefined;
  private destroy$: Subject<void> = new Subject<void>();


  constructor(private serverService:ServerService){}

  ngOnInit() {
    this.rootDirectory$ = this.serverService.getData().pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
