import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Subject, debounceTime, distinctUntilChanged, iif, startWith, switchMap, takeUntil } from 'rxjs';
import { ServerService } from '../server.service';
import { Directory } from '../types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tree-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnDestroy {
  dataSource = new MatTreeNestedDataSource<Directory>();
  nestedTree = new NestedTreeControl<Directory>(node => node.directories);

  searchControl = new FormControl<string>('');

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private serverService:ServerService){
    this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((prefix) =>
        iif(()=> prefix === null || prefix === '',
          this.serverService.getDirectories(),
          this.serverService.getDirectoriesByPrefix(prefix)
        )
      ),
      takeUntilDestroyed()
    )
    .subscribe(tree => this.dataSource.data = tree);
  }

  hasNestedChild(_:number, node:Directory): boolean {
    return this.isFileNode(node) || node.directories?.length > 0;
  }

  isFileNode(node: Directory): boolean {
    return node.files?.length > 0;
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
