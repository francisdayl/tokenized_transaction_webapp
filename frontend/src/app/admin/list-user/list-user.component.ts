import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { UserTokenResponse } from '../../shared/models/auth';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, RouterLink,MatFormFieldModule, MatButtonModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit{
  userTokens: UserTokenResponse[] = [{"username":"Juanito","email":"xdd@xdd.com","tokens":20,"id":1}]
  displayedColumns = ["username","email","tokens","actions"]

  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe(({ data })=>{this.dataSource = data})
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  
  @ViewChild(MatTable) table!: MatTable<UserTokenResponse>;

}
