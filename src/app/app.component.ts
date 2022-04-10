import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _pageTitle: string = '';
  constructor(){}

  public get pageTitle() { return this._pageTitle; }

  public onRouterActivate(component: any) {
    this._pageTitle = component?.pageTitle;
  }
}
