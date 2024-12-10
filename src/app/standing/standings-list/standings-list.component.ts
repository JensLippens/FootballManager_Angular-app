import { Component } from '@angular/core';
import { Standing } from '../standing.model';
import { StandingService } from '../standing.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-standings-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule ],
  templateUrl: './standings-list.component.html',
  styleUrl: './standings-list.component.css'
})
export class StandingsListComponent {
  standings: Standing[] = [];
  leagueYear?: number;
  displayedColumns: string[] = ['position', 'team', 'gamesPlayed', 'points', 'wins', 'losses', 'draws', 'goalsFor', 'goalsAgainst', 'goalDifference'];

  constructor(
    private standingService: StandingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const year = params.get('year');
      if (year) {
        this.leagueYear = +year; // Convert string to number
        this.fetchStandingsByYear(this.leagueYear);
      } else {
        this.fetchCurrentStandings();
      }
    });
  }

  fetchCurrentStandings(): void {
    this.standingService.getCurrentLeagueStandings().subscribe((data) => {
      this.standings = data;
      //console.log(this.standings);
    });
  }

  fetchStandingsByYear(year: number): void {
    this.standingService.getLeagueStandingsByYear(year).subscribe((data) => {
      this.standings = data;
      //console.log(this.standings);
    });
  }
}
