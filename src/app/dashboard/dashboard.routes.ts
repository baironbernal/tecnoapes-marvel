import { Routes } from "@angular/router";
import { ComicComponent } from "../comics/comic.component";
import { FavsComponent } from '../favs/favs.component';


export const dashboardRoutes: Routes = [
      { path: '', component: ComicComponent },
      { path: 'favoritos', component: FavsComponent },
];