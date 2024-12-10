import { Component } from '@angular/core';
import { Team } from '../team.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TeamService } from '../team.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LeagueService } from '../../league/league.service';
import { League } from '../../league/league.model';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [
    RouterModule, 
    CommonModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.css'
})
export class TeamListComponent {
  teams: Team[] = [];
  leagues: League[]= [];
  leagueYear?: number | null;
  cardWidth: string = '0px';

  constructor(
    private teamService: TeamService,
    private leagueService: LeagueService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {    
    this.route.paramMap.subscribe((params) => {
      const year = params.get('leagueYear');
      if (year) {
        this.leagueYear = +year; // Convert string to number
        this.fetchTeamsForLeague(this.leagueYear);
      } else {
        this.fetchAllTeams();
      }
      this.fetchAllLeagues();
    });    
  }
  
  setCardWidth(): void {
    // Find the longest name
    const longestName = this.teams.reduce((prev, curr) =>
      prev.name.length > curr.name.length ? prev : curr
    ).name;

    // Calculate card width based on the longest name
    const baseFontSize = 16; // Assume base font size is 16px
    const extraPadding = 40; // Add padding (e.g., left/right padding for card content)
    const approxCharWidth = 8; // Approximate width of one character in pixels
    const width = longestName.length * approxCharWidth + extraPadding;

    this.cardWidth = `${width}px`;
    //console.log(this.cardWidth);
  }

  fetchAllTeams(): void {
    this.teamService.getAllTeams().subscribe((data) => {
      this.teams = data;
      //console.log(this.teams);
      this.setCardWidth();
    });
  }

  fetchTeamsForLeague(year: number): void {
    this.teamService.getAllTeamsForSpecificLeague(year).subscribe((data) => {
      this.teams = data;
      //console.log(this.teams);
      this.setCardWidth();
    });
  }
  fetchAllLeagues(): void {
    this.leagueService.getAllLeagues().subscribe((data) => {
      this.leagues = data;
    });
  }
}
