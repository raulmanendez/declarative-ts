import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'declarative-ts';

  load$=this.loaderService.loaderAction;
  constructor(private loaderService:LoaderService) {
    
  }
}
