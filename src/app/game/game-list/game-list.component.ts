import { Component } from '@angular/core';
import { Game } from '../game.model';
import { GameService } from '../game.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent {
  games: Game[] = [];
  leagueYear?: number | null;
  teamId?: number | null;
  displayedColumns: string[] = ['matchday', 'hometeam', 'score', 'awayteam'];
  //paginationData: any;  

  currentPage: number = 0
  pageSize: number = 0;
  totalItemCount: number = 0;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {    
    this.route.paramMap.subscribe((params) => {
      const year = params.get('leagueYear');
      const id = params.get('teamId');
      if (year && id) {
        this.leagueYear = +year;
        this.teamId = +id;
        this.fetchGamesFromLeagueForTeam(this.leagueYear, this.teamId, 1, 15);        
      } else if (year) {
        this.leagueYear = +year;
        this.fetchGamesFromLeague(this.leagueYear, 1, 8);
      }
    });    
  }

  setPaginationData(data:any) {
    this.totalItemCount = data.TotalItemCount;
    this.pageSize = data.PageSize;
    this.currentPage = data.CurrentPage;
    //console.log(this.totalItemCount, this.pageSize, this.currentPage);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;    
    if (this.leagueYear && this.teamId) {
      this.fetchGamesFromLeagueForTeam(this.leagueYear, this.teamId, this.currentPage + 1, this.pageSize);
    }
    else if (this.leagueYear) {
      this.fetchGamesFromLeague(this.leagueYear, this.currentPage + 1, this.pageSize);
    }
  }

  fetchGamesFromLeagueForTeam(leagueYear: number, teamId: number, pageNumber: number, pageSize: number): void {
    this.gameService.getGamesFromLeagueForTeam(leagueYear, teamId, pageNumber, pageSize).subscribe((response) => {
      const paginationHeader = response.headers.get('X-Pagination');
      if (paginationHeader) {
        this.setPaginationData(JSON.parse(paginationHeader));
      }
      this.games = response.body ?? [];      
    });
  }

  fetchGamesFromLeague(leagueYear: number, pageNumber: number, pageSize: number): void {
    this.gameService.getGamesFromLeague(leagueYear, pageNumber, pageSize).subscribe((response) => {
      const paginationHeader = response.headers.get('X-Pagination');
      if (paginationHeader) {
        this.setPaginationData(JSON.parse(paginationHeader));
        //this.paginationData = JSON.parse(paginationHeader)
      }
      this.games = response.body ?? [];
    });
  }

}
