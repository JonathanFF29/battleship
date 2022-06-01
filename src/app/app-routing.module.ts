import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './views/board/board.component';
import { ConfigComponent } from './views/config/config.component';
import { HistoryComponent } from './views/history/history.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'config',
    pathMatch: 'full'
  },
  {
    path: 'config',
    component: ConfigComponent
  },
  {
    path: 'board',
    component: BoardComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
