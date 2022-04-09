import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityForecastDetailsComponent } from './_components/city-forecast-details/city-forecast-details.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'city/:id', component: CityForecastDetailsComponent },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
