import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { ServerService } from '../server.service';
import { DirectoryNode, convertToTree } from '../utils';
@Component({
  selector: 'tree-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  dataSource = new MatTreeNestedDataSource<DirectoryNode>();
  nestedTree = new NestedTreeControl<DirectoryNode>(node => node.children);

  searchControl = new FormControl<string>('');

  constructor(private serverService:ServerService){
    this.searchControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(
        (prefix) => {
          if(prefix){
            return this.serverService.getDirectoriesByPrefix(prefix)
          }
          else {
            return this.serverService.getDirectories()
          }
        })
      )
      .subscribe(tree => 
        this.dataSource.data = convertToTree(tree)
      );
  }

  ngOnInit() {
    this.serverService.getDirectories()
    .pipe(takeUntil(this.destroy$))
    .subscribe(tree => {
      this.dataSource.data = convertToTree(tree)
    });
  }

  hasNestedChild(_:number, node:DirectoryNode): boolean{
    return (!!node.files && node.files.length > 0) || (!!node.children && node.children.length > 0);
  }

  isFileNode(node: DirectoryNode): boolean {
    return !!node.files && node.files.length > 0;
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
