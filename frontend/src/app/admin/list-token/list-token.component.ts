import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { TokenUserResponse, UsedToken, UserTokenResponse } from '../../shared/models/auth';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-token',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, RouterLink,MatFormFieldModule, MatButtonModule],
  templateUrl: './list-token.component.html',
  styleUrl: './list-token.component.css'
})
export class ListTokenComponent implements OnInit{
  tokensUser: UsedToken[] = [{"token_creation":"651656tz","token_number":"123512","transaction_url":"xdd.com"}]
  displayedColumns = ["token_number","transaction_url","token_creation"]

  ngOnInit(): void {
  }

  @ViewChild(MatTable) table!: MatTable<UserTokenResponse>;

}
