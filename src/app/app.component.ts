import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { DolphinService } from './service/dolphin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dolphin';

  constructor(
    private dolphinService: DolphinService,
  ) {}

  prepare() {
    console.log('prepare');

    this.dolphinService.prepare().then((data) => {
      // console.log(data);
    }, (err) => {
      console.log('error');
      console.log(err);
    });
  }

  create() {
    console.log('create');
    this.dolphinService.putPortfolio().then((data) => {
      // console.log(data);
    }, (err) => {
      console.log('error');
      console.log(err);
    });
  }

  getP() {
    console.log('getPortfolio');
    this.dolphinService.getPortfolio().then((data) => {
      // console.log(data);
    }, (err) => {
      console.log('error');
      console.log(err);
    });
  }


  getSharpP() {
    console.log('sharpD');
    this.dolphinService.getSharpP().then((data) => {
      console.log(data);
    }, (err) => {
      console.log('error');
      console.log(err);
    });
  }


}
