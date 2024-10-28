import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserTokenData, UserTokenResponse } from '../../shared/models/auth';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, RouterLink,MatFormFieldModule, MatButtonModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit{
  userTokens: UserTokenData[] = []
  displayedColumns = ["username","email","tokens","actions"]

  private _snackBar = inject(MatSnackBar);
  constructor(private activatedRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ data })=>{this.userTokens = data.result})
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  
  @ViewChild(MatTable) table!: MatTable<UserTokenResponse>;

}
