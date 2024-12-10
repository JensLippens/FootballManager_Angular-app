import { Component, OnInit } from '@angular/core';
import { Game } from '../game.model';
import { GameService } from '../game.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LeagueService } from '../../league/league.service';
import { League } from '../../league/league.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game-table',
  standalone: true,
  imports: [MatButtonModule, CommonModule, RouterModule],
  templateUrl: './game-table.component.html',
  styleUrl: './game-table.component.css'
})

export class GameTableComponent implements OnInit {
  games: Game[] = [];
  teams: string[] = [];
  leagues: League[] = [];
  matrix: Cell[][] = [];
  leagueYear: number = 0;

  constructor(
    private gameService: GameService,
    private leagueService: LeagueService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllLeagues();
    this.route.paramMap.subscribe((params) => {
      const year = params.get('leagueYear');
      if (year) {
        this.leagueYear = +year; // Convert string to number
        this.fetchGamesFromLeague(this.leagueYear, 1, 8);(this.leagueYear);
      } 
    });
  }

  fetchGamesFromLeague(leagueYear: number, pageNumber: number, pageSize: number): void {
    this.gameService.getAllGamesFromLeague(leagueYear).subscribe((data) => {
      this.games = data ?? [];
      this.generateMatrix();
    });
  }

  getAllLeagues():void {
    this.leagueService.getAllLeagues().subscribe((data) => {
      this.leagues = data;
    })
  }

  generateMatrix(): void {
    // Step 1: Extract unique team names
    this.teams = Array.from(
      new Set([
        ...this.games.map(game => game.homeTeamName),
        ...this.games.map(game => game.awayTeamName)
      ])
    )
    .map(team => team.toUpperCase().slice(0, 3)) // Convert to uppercase and limit to 3 letters
    .sort();

    // Step 2: Initialize matrix with empty cells
    const size = this.teams.length;
    this.matrix = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({ score: '', backgroundColor: '' }))
    );

    // Step 3: Populate matrix with game results
    for (const game of this.games) {
      const homeIndex = this.teams.indexOf(game.homeTeamName.toUpperCase().slice(0, 3));
      const awayIndex = this.teams.indexOf(game.awayTeamName.toUpperCase().slice(0, 3));

      let backgroundColor = '';

      if (game.homeTeamScore == null || game.awayTeamScore == null) {
        backgroundColor = 'white';
      } else if (game.homeTeamScore > game.awayTeamScore) {
        backgroundColor = 'lightgreen'; 
      } else if (game.homeTeamScore < game.awayTeamScore) {
        backgroundColor = 'lightcoral'; 
      } else if (game.homeTeamScore === game.awayTeamScore) {
        backgroundColor = 'lightgray';
      }

      this.matrix[homeIndex][awayIndex] = {
        score: game.score,
        backgroundColor
      };

      for (let i = 0; i < size; i++) {
        this.matrix[i][i] = {
          score: '',
          backgroundColor: 'black'
        };
      }
    }
  }
}

interface Cell {
  score: string; 
  backgroundColor: string;
}
