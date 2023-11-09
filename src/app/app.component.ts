import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'fyle-frontend-challenge';
  username: string = ''; 
  user:any;
  repositories: any[] = [];
  pageSize: number = 10; 
  currentPage: number = 1; 

  hasLanguages(languages: any): boolean {
    return languages && Object.keys(languages).length > 0;
  }

  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.apiService.getUser('Adityagupta1625').subscribe(
      (data: any) => {
        console.log(data); 
        this.user = data; 
      },
      error => {
        console.error('Error fetching user data', error);
      }
    );
    
    this.apiService.getRepos('Adityagupta1625').subscribe(
      (data: any) => {
        console.log(data); 
        this.repositories = data; 
      },
      error => {
        console.error('Error fetching user data', error);
      }
    );
  }
  getPaginatedRepositories(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    console.log('Start index:', startIndex, 'End index:', endIndex, 'Total repositories:', this.repositories.length);
    console.log(this.repositories.slice(startIndex, endIndex));
    return this.repositories.slice(startIndex, endIndex);
      }

  nextPage() {
    // logic for displaying the next page of repositories
    const totalPages = Math.ceil(this.repositories.length / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  getLanguageKeys(languageObject: any): string[] {
    if (languageObject && typeof languageObject === 'object') {
      return Object.keys(languageObject);
    }
    return [];
  }

  
}

  

  