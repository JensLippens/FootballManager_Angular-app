import { Component, ViewChild } from '@angular/core';
import { TeamService } from '../team.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Team } from '../team.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Player } from '../../player/player.model';
import { MatPaginator } from '@angular/material/paginator';
import { Position } from '../../player/position.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatSortModule,
    RouterModule
  ],
  templateUrl: './team-detail.component.html',
  styleUrl: './team-detail.component.css'
})
export class TeamDetailComponent {
  team: Team | undefined;
  players: Player[] = [];
  positionEnum = Position;

  dataSource: MatTableDataSource<Player> = new MatTableDataSource<Player>();
  displayedColumns: string[] = ['fullName', 'position', 'age', 'shirtNumber', 'isLeftFooted'];

  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private teamService: TeamService,  
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {    
    this.route.paramMap.subscribe((params) => {
      const teamId = params.get('teamId')
      if (teamId) {        
        this.fetchTeam(+teamId);
      }
    });    
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;       // Assign MatSort to data source
  }

  fetchTeam(teamId: number): void {
    this.teamService.getSpecificTeam(teamId).subscribe((data) => {
      this.team = data;
      this.players = data.players;
      this.dataSource.data = this.players;
      //console.log(this.team);      
    })
  }
  
}
