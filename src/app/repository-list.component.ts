// app.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../app/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fyle-frontend-challenge';
  username: string = ''; // Define the username property
  repositories: any[] = []; // Define the repositories property

  constructor(private githubService: ApiService) {}

  ngOnInit() {
    // Initialize any required data or function calls
    this.username = 'your_github_username'; 
    this.loadRepositories(); 
  }

  loadRepositories() {
    this.githubService.getRepos(this.username).subscribe(
      (data: any) => {
        this.repositories = data;
      },
      error => {
        console.error('Error fetching repositories', error);
      }
    );
  }
}
