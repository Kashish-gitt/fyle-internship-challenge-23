import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.github.com'; 
  constructor(
    private httpClient: HttpClient,
    
  ) { }

  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }
  getRepos(githubUsername: string){
    return this.httpClient.get<any[]>(`https://api.github.com/users/${githubUsername}/repos`).pipe(
      mergeMap((repos: any) => { // Change the type to any
        const repoDetails = repos.map((repo: any) => { // Change the type to any
          return this.httpClient.get<any>(repo.languages_url).pipe(
            map((languages: any) => ({
              ...repo,
              languages,
              description: repo.description
            }))
          );
        });
        return forkJoin(repoDetails);

      })
    );
  }
  
  
  
}
