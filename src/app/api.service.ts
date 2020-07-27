import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = 'https://api-magic-versus.herokuapp.com';

  constructor(public http: HttpClient,) { 
  }

  getRanking(){
    return this.http.get(`${this.apiUrl}/summoner/ranking`, )
    .toPromise()
  }

  getChampions(){
    return this.http.get(`${this.apiUrl}/champion`, )
    .toPromise()
  }

  getMatch(){
    return this.http.get(`${this.apiUrl}/match`, )
    .toPromise()
  }

  getSummoners(){
    return this.http.get(`${this.apiUrl}/summoner`, )
    .toPromise()
  }

  postMatch(match){
    console.log('teste');
    return this.http.post(`${this.apiUrl}/match`,match)
    .toPromise()
  }

}
