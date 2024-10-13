import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeModule,
} from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { environment } from 'src/enviroment/environment';
import { map } from 'rxjs/operators';

export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}
// Define the structure for your tree node
// interface PermissionNode {
//   name: string;
//   children?: PermissionNode[];
// }
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

export interface PeriodicElement {
  id: string;
  title_ar: string;
  title_en: string;
  // governorate_id: string;
 children: Array<any>;
}
// Sample tree data
// const TREE_DATA: PermissionNode[] = [
//   {
//     name: 'Main Permission 1',
//     children: [{ name: 'Sub Permission 1' }, { name: 'Sub Permission 2' }],
//   },
//   {
//     name: 'Main Permission 2',
//     children: [{ name: 'Sub Permission 3' }],
//   },
// ];

@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] {
    return this.dataChange.value;
  }

  constructor(private http: HttpClient) {
    this.fetchData();
  }

  fetchData() {
    this.getPermissions().subscribe(
      (permissions) => {
        const treeData = this.buildPermissionTree(permissions);
        this.dataChange.next(treeData);
      },
      (error) => {
        console.error('Error fetching permissions:', error);
      }
    );
  }

   // Insert a new item under the given parent node
   insertItem(parent: TodoItemNode, newItem: string) {
    if (!parent.children) {
      parent.children = [];  // Initialize if children is undefined
    }
    const newNode = new TodoItemNode(); // Create a new node
    newNode.item = newItem;  // Set the item value
    newNode.children = [];  // Initialize the children array

    parent.children.push(newNode);  // Add the new node to the parent
    this.dataChange.next(this.data);  // Notify the tree data change
  }

  getPermissions(): Observable<any[]> {
    const authToken = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${authToken}` };

    return this.http.get<{ data: any[] }>(`${environment.apiUrl}/permissions`, { headers }).pipe(
      map((response) => response.data)
    );
  }

  buildPermissionTree(permissions: any[]): TodoItemNode[] {
    const buildTree = (items: any[]): TodoItemNode[] => {
      return items.map(item => {
        const node = new TodoItemNode();
        node.item = item.title_ar;  // or title_en, depending on the language
        if (item.children && item.children.length > 0) {
          node.children = buildTree(item.children);
        }
        return node;
      });
    };
    return buildTree(permissions);
  }
}

@Component({
  selector: 'app-add-permission-dialog',
  standalone: true,
  templateUrl: './add-permission-dialog.component.html',
  imports: [MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatTreeModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,],
  styleUrls: ['./add-permission-dialog.component.scss'],
  providers: [ChecklistDatabase],
})
export class AddPermissionDialogComponent  {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

/** Map from nested node to flattened node. This helps us to keep the same object for selection */
nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

/** A selected parent node to be inserted */
// selectedParent: TodoItemFlatNode | null = null;

/** The new item's name */
// newItemName = '';

treeControl: FlatTreeControl<TodoItemFlatNode>;

treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

/** The selection for checklist */
checklistSelection = new SelectionModel<TodoItemFlatNode>(
  true /* multiple */
);

constructor(
  private _database: ChecklistDatabase,private http: HttpClient,
  public dialogRef: MatDialogRef<AddPermissionDialogComponent> // Inject dialogRef
) {
  this.treeFlattener = new MatTreeFlattener(
    this.transformer,
    this.getLevel,
    this.isExpandable,
    this.getChildren
  );


  // 
  this.treeControl = new FlatTreeControl<TodoItemFlatNode>(
    this.getLevel,
    this.isExpandable
  );
  this.dataSource = new MatTreeFlatDataSource(
    this.treeControl,
    this.treeFlattener
  );

  _database.dataChange.subscribe((data) => {
    this.dataSource.data = data;
  });
}

getLevel = (node: TodoItemFlatNode) => node.level;

isExpandable = (node: TodoItemFlatNode) => node.expandable;

getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

hasNoContent = (_: number, _nodeData: TodoItemFlatNode) =>
  _nodeData.item === '';

onNoClick(): void {
  this.dialogRef.close();
}

/**
 * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
 */
transformer = (node: TodoItemNode, level: number) => {
  
  const existingNode = this.nestedNodeMap.get(node);
  const flatNode =
    existingNode && existingNode.item === node.item
      ? existingNode
      : new TodoItemFlatNode();
  flatNode.item = node.item;
  flatNode.level = level;
  flatNode.expandable = !!node.children?.length;
  this.flatNodeMap.set(flatNode, node);
  this.nestedNodeMap.set(node, flatNode);
  return flatNode;
};

/** Whether all the descendants of the node are selected. */
descendantsAllSelected(node: TodoItemFlatNode): boolean {
  const descendants = this.treeControl.getDescendants(node);
  const descAllSelected =
    descendants.length > 0 &&
    descendants.every((child) => {
      return this.checklistSelection.isSelected(child);
    });
  return descAllSelected;
}

/** Whether part of the descendants are selected */
descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
  const descendants = this.treeControl.getDescendants(node);
  const result = descendants.some((child) =>
    this.checklistSelection.isSelected(child)
  );
  return result && !this.descendantsAllSelected(node);
}

/** Toggle the to-do item selection. Select/deselect all the descendants node */
todoItemSelectionToggle(node: TodoItemFlatNode): void {
  this.checklistSelection.toggle(node);
  const descendants = this.treeControl.getDescendants(node);
  this.checklistSelection.isSelected(node)
    ? this.checklistSelection.select(...descendants)
    : this.checklistSelection.deselect(...descendants);

  // Force update for the parent
  descendants.forEach((child) => this.checklistSelection.isSelected(child));
  this.checkAllParentsSelection(node);
}

/** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
  this.checklistSelection.toggle(node);
  this.checkAllParentsSelection(node);
}

/* Checks all the parents when a leaf node is selected/unselected */
checkAllParentsSelection(node: TodoItemFlatNode): void {
  let parent: TodoItemFlatNode | null = this.getParentNode(node);
  while (parent) {
    this.checkRootNodeSelection(parent);
    parent = this.getParentNode(parent);
  }
}

/** Check root node checked state and change it accordingly */
checkRootNodeSelection(node: TodoItemFlatNode): void {
  const nodeSelected = this.checklistSelection.isSelected(node);
  const descendants = this.treeControl.getDescendants(node);
  const descAllSelected =
    descendants.length > 0 &&
    descendants.every((child) => {
      return this.checklistSelection.isSelected(child);
    });
  if (nodeSelected && !descAllSelected) {
    this.checklistSelection.deselect(node);
  } else if (!nodeSelected && descAllSelected) {
    this.checklistSelection.select(node);
  }
}

/* Get the parent node of a node */
getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
  const currentLevel = this.getLevel(node);

  if (currentLevel < 1) {
    return null;
  }

  const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

  for (let i = startIndex; i >= 0; i--) {
    const currentNode = this.treeControl.dataNodes[i];

    if (this.getLevel(currentNode) < currentLevel) {
      return currentNode;
    }
  }
  return null;
}

/** Select the category so we can insert the new item. */
addNewItem(node: TodoItemFlatNode, newItemName: string) {
  const parentNode = this.flatNodeMap.get(node);  // Get the nested node
  if (parentNode) {
    this._database.insertItem(parentNode, newItemName);  // Add the new item with the specified name
    this.treeControl.expand(node);  // Expand the parent node to show the new child
  }
}

/** Save the node to database */
saveNode(node: TodoItemFlatNode, itemValue: string) {
  const nestedNode = this.flatNodeMap.get(node);
  if (nestedNode) {
    nestedNode.item = itemValue;  // Update the item value
    this._database.dataChange.next(this._database.data);  // Trigger a tree update

    // Optionally, you can also send this updated node to the backend here
    // this.permissionService.saveNodeToDatabase(nestedNode).subscribe(...);
  }
}

}