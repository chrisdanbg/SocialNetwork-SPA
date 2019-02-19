import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from './../alertify.service';
import { AuthService } from './../auth.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likesParam: string;

  constructor(private authService: AuthService, private userService:
    UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.likesParam = 'Likers';
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
                .subscribe((res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
    }, errorList => {
      this.alertify.error(errorList);
    });
    }

    pageChanged(event: any): void {
      this.pagination.currentPage = event.page;
      this.loadUsers();
    }
}
