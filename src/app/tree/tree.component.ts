import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Subject, takeUntil } from 'rxjs';
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

  constructor(private serverService:ServerService){
  }

  ngOnInit() {
    this.serverService.getData().pipe(takeUntil(this.destroy$)).subscribe(tree => this.dataSource.data = convertToTree(tree));
  }

  hasNestedChild(index:number, node:DirectoryNode): boolean{
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
