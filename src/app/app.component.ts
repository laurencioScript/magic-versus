import { Component } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs/tab-group';
import { MatTab } from '@angular/material/tabs/tab';
import { ApiService } from './api.service';
import { MatFormField } from '@angular/material/form-field/form-field'
import { MatInput } from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import { FormControl } from '@angular/forms';
import {MatRadioButton} from '@angular/material/radio';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatButton} from '@angular/material/button';
import {MatList} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatGridList} from '@angular/material/grid-list';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  rankingSummoner : any = [];
  champions : any = [];
  summoners : any = [];
  matchs : any = [];
  championSelect : any = new FormControl();
  summonerSelect : any = new FormControl();
  teamBlue : any = [{},{},{},{},{}];
  teamRed : any = [{},{},{},{},{}];
  wins : any = 'blue';
  loadingRanking : boolean = true;
  loadingMatch : boolean = true;

  constructor(private apiService: ApiService){    
    this.load()
  }

  async load(){
    this.champions = await this.apiService.getChampions();
    this.summoners = await this.apiService.getSummoners();
    this.updateMatch();
    this.updateRanking();
    
  }

  changedTab(value){
    if(value == 0){
      this.updateRanking();
    }
    else if(value == 1){
      this.updateMatch();
    }
  }

  async updateRanking(){
    this.loadingRanking = true;
    this.rankingSummoner = await this.apiService.getRanking();
    this.loadingRanking = false;
  }

  async updateMatch(){
    this.loadingMatch = true;
    this.matchs = await this.apiService.getMatch();
    this.loadingMatch = false;
  }



  async createMatch(){
    let summoners = [];

    for (const summonerBlue of this.teamBlue) {
      if(summonerBlue && summonerBlue.summonerId){
        summoners.push({
          ...summonerBlue,
          "team": "blue",
          "wins": this.wins == "blue" ? 'true' : 'false',
          kill : summonerBlue.kill+'',
          death : summonerBlue.death+'',
          assist :summonerBlue.assist+'',

        });
      }
    }

    for (const summonerRed of this.teamRed) {
      if(summonerRed && summonerRed.summonerId){
        summoners.push({
          ...summonerRed,
          "team": "red",
          "wins": this.wins == "red" ? 'true' : 'false',
          kill : summonerRed.kill+'',
          death : summonerRed.death+'',
          assist :summonerRed.assist+'',
        });
      }
    }
    
    await this.apiService.postMatch({summoners, createAt : new Date()})
    this.teamBlue  = [{},{},{},{},{}];
    this.teamRed  = [{},{},{},{},{}];
  }


  filterTeam(summoners,team){
    return summoners.filter(summoner=>summoner.team == team);
  }

}
