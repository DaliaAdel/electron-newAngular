import { environment } from 'src/enviroment/environment';
import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { ApiRegionService } from '../api-region.service';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatNativeDateModule } from '@angular/material/core';
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
import { Inject } from '@angular/core'; // Make sure this is imported
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { map } from 'rxjs/operators';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface PeriodicElement {
  id: string;
  name_ar: string;
  name_en: string;
  governorate_id: string;
  created_by: string;
}


@Component({
  selector: 'app-courts',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule,
    MatNativeDateModule,
    DatePipe,
    MatTableModule,
    HttpClientModule,
  ],
  templateUrl: './courts.component.html',
  styleUrl: './courts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourtsComponent {
  displayedColumns: string[] = ['#', 'name_ar', 'name_en', 'governorate_id', 'created_by', 'action'];
  dataSource = new MatTableDataSource<any>();

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.fetchData();
  }

  fetchData() {
    this.getElements().subscribe(
      (data) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getElements(): Observable<any[]> {

    const authToken = localStorage.getItem('authToken'); // Retrieve the token from localStorage

    console.log("authToken",authToken);
    // Set the headers including the Authorization token
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

  return this.http.get<{ data: any[] }>(`${environment.apiUrl}/courts`, { headers }).pipe(
    map((response) => response.data)
  );
  }

    // search
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Apply the filter to MatTableDataSource
  }
  // Open dialog for adding a new area
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      height: '62%',
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchData(); // Refresh data after dialog closes
      }
    });
  }

  // Open dialog for editing an existing area
  editArea(area: any): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      height: '62%',
      width: '40%',
      data: area, // Pass the area data to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchData(); // Refresh data after editing
      }
    });
  }

// delete
  deleteElement(element: PeriodicElement): void {

    
    const confirmDelete = confirm(`Are you sure you want to delete ${element.name_ar}?`); // Optional confirmation dialog
    if (confirmDelete) {
      const authToken = localStorage.getItem('authToken'); // Retrieve the token from localStorage

    console.log("authToken",authToken);
    // Set the headers including the Authorization token
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

      //  const url ="https://electronkw.net/new_laravel_API/api/regions";

        // If editing, send a PUT request to update the data
        this.http.delete<{ data: any[] }>( `${environment.apiUrl}/courts/${element.id}`,
           // formData as the request body
          { headers } // headers passed separately as the third argument
          ).subscribe(
        response => {
          console.log('Data deleted successfully:', response);
          this.fetchData(); // Refresh data after deletion
        },
        error => {
          console.error('Error deleting data:', error);
          alert('Failed to delete the item.');
        }
      );
    }
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatSelectModule,
  ],
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  form: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any // Use @Inject here
  ) {
    // Initialize the form
    this.form = this.fb.group({
      name_ar: ['', Validators.required],
      name_en: ['', Validators.required],
      governorate_id: ['', Validators.required],
    });

    // Check if we are in edit mode by checking if `data` exists
    if (data) {
      this.isEditMode = true;
      this.form.patchValue(data); // Populate the form with the area data
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      // console.log

      if (this.isEditMode) {

        const authToken = localStorage.getItem('authToken'); // Retrieve the token from localStorage

    console.log("authToken",authToken);
    // Set the headers including the Authorization token
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };


        // If editing, send a PUT request to update the data
        this.http.put<{ data: any[] }>(
          `${environment.apiUrl}/courts/${this.data.id}`,
          formData, // formData as the request body
          { headers } // headers passed separately as the third argument
        ).subscribe(
          (response) => {
            console.log('Data updated successfully:', response);
            this.dialogRef.close(formData); // Close the dialog and return the updated data
          },
          (error) => {
            console.error('Error updating data:', error);
          }
        );
      } else {

        const authToken = localStorage.getItem('authToken'); // Retrieve the token from localStorage

        console.log("authToken",authToken);
        // Set the headers including the Authorization token
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };
        // If adding a new area, send a POST request
        // this.http.post('https://electronkw.net/new_laravel_API/api/regions', formData)
        this.http.post<{ data: any[] }>(
          `${environment.apiUrl}/courts`,
          formData, // formData as the request body
          { headers } // headers passed separately as the third argument
        ).subscribe(
          (response) => {
            console.log('Data saved successfully:', response);
            this.dialogRef.close(formData); // Close the dialog and return the new data
          },
          (error) => {
            console.error('Error saving data:', error);
          }
        );
      }
    }
  }
}