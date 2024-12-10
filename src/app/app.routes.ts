import { provideRouter, Routes, withDebugTracing } from '@angular/router';
import { StandingsListComponent } from './standing/standings-list/standings-list.component';
import { ApplicationConfig } from '@angular/core';
import { PlayerListComponent } from './player/player-list/player-list.component';
import { CoachListComponent } from './coach/coach-list/coach-list.component';
import { TeamListComponent } from './team/team-list/team-list.component';
import { LeagueListComponent } from './league/league-list/league-list.component';
import { TeamDetailComponent } from './team/team-detail/team-detail.component';
import { GameListComponent } from './game/game-list/game-list.component';
import { GameTableComponent } from './game/game-table/game-table.component';

export const routes: Routes = [
    { path: '', redirectTo: '/standing/current', pathMatch: 'full' },
    { path: 'standing/current', component: StandingsListComponent },
    { path: 'standing/league/:year', component: StandingsListComponent },
    { path: 'leagues', component: LeagueListComponent },
    { path: 'players', component: PlayerListComponent },
    { path: 'coaches', component: CoachListComponent },
    { path: 'teams', component: TeamListComponent },
    { path: 'teams/league/:leagueYear', component: TeamListComponent },
    { path: 'teams/team/:teamId', component: TeamDetailComponent },
    { path: 'games/league/:leagueYear', component: GameListComponent },
    { path: 'games/league/:leagueYear/team/:teamId', component: GameListComponent },
    { path: 'games/leaguetable', component: GameTableComponent },
    { path: 'games/leaguetable/:leagueYear', component: GameTableComponent },
    /*
    [routerLink]="'games/league/' + league.year + '/team/' + team?.id">  
    { path: 'producten/list', component: ProductListComponent },
    { path: 'producten/product/:productId', component: ProductDetailComponent },
    { path: 'producten/create', component: ProductCreateComponent, canActivate: [AdminGuard]},
    { path: 'producten/edit/:productId', component: ProductCreateComponent, canActivate: [AdminGuard]},
    { path: 'bestellingen/list', component: BestellingListComponent, canActivate: [AdminGuard]},
    { path: 'bestellingen/bestelling/:bestellingId', component: BestellingDetailComponent, canActivate: [AdminGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'updateuserdata', component: UpdateUserdataComponent, canActivate: [AuthGuard]},
    { path: 'mandje', component: MandjeComponent},
    { path: 'checkout', component: CheckoutComponent, canActivate: [CheckoutGuard]},
     */
  ]
  export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes, withDebugTracing())]
}
