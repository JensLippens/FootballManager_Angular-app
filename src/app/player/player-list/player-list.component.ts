import { Component } from '@angular/core';
import { Player } from '../player.model';
import { PlayerService } from '../player.service';
import { ActivatedRoute } from '@angular/router';
import { Position } from '../position.model';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { MatSelect, MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSelectModule, MatSelect, MatInputModule],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.css'
})
export class PlayerListComponent {
  players: Player[] = [];
  displayedColumns: string[] = ['fullName', 'position', 'age', 'shirtNumber', 'isLeftFooted', 'team'];
  positionEnum = Position;

  positions = Object.values(Position).filter(value => typeof value === 'string') as string[];
  position?: Position;
  searchQuery?: string = '';
  currentPage: number = 1;
  pageSize: number = 25;
  totalItemCount: number = 0;

  private inputSubject = new Subject<string>();

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
  ) {
    this.inputSubject.pipe(
      debounceTime(250)  
    ).subscribe(value => {
      this.handleInputChange(value);
    });
  }

  ngOnInit(): void {    
    this.route.paramMap.subscribe((params) => {
      this.fetchPlayers(this.currentPage,this.pageSize,this.searchQuery, this.position);
      //console.log(this.positions);
    });    
  }

  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.inputSubject.next(inputValue);
  }

  handleInputChange(searchQuery: string) {
    this.pageSize = 25;
    this.currentPage = 0;  
    this.searchQuery = searchQuery;
    this.fetchPlayers(this.currentPage + 1, this.pageSize, this.searchQuery, this.position);
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
    this.fetchPlayers(this.currentPage + 1, this.pageSize, this.searchQuery, this.position);
  }
  
  onPositionChange(event: MatSelectChange) {
    this.pageSize = 25;
    this.currentPage = 0;  
    this.position = event.value;
    this.fetchPlayers(this.currentPage + 1, this.pageSize, this.searchQuery, this.position);
    //console.log('Selected Position:', this.position);
  }

  fetchPlayers(currentPage: number, pageSize: number, searchQuery?: string, position?: Position): void {
    this.playerService.getAllPlayers(currentPage, pageSize, searchQuery,position).subscribe((response) => {
      const paginationHeader = response.headers.get('X-Pagination');
      if (paginationHeader) {
        this.setPaginationData(JSON.parse(paginationHeader));
      }
      this.players = response.body ?? []; 
      //console.log(this.players);     
    });
  }
}
