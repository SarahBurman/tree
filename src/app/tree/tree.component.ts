import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { debounceTime, distinctUntilChanged, iif, startWith, switchMap } from 'rxjs';
import { ServerService } from '../server.service';
import { Directory } from '../types';

@Component({
  selector: 'tree-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent {  
  dataSource = new MatTreeNestedDataSource<Directory>();
  nestedTree = new NestedTreeControl<Directory>(node => node.directories);

  searchControl = new FormControl<string>('');

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
    .subscribe(tree =>{ 
      this.dataSource.data = tree;
      this.nestedTree.dataNodes = tree;
      this.expandAllNodesOnSearch();
    });
  }

  expandAllNodesOnSearch(){    
    if(this.searchControl.value){
      this.nestedTree.expandAll();
    }
  }

  hasNestedChild(_:number, node:Directory): boolean {
    return this.isFileNode(node) || node.directories?.length > 0;
  }

  isFileNode(node: Directory): boolean {
    return node.files?.length > 0;
  }
}
