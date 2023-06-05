import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { NotificationService } from './services/notification.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'declarative-ts';

  load$=this.loaderService.loaderAction;
  successMessage$ = this.notificationService.successMessageAction$.pipe(
    tap((message) => {
      if (message) {
        setTimeout(() => {
          this.notificationService.clearAllMessages();
        }, 5000);
      }
    })
  );
  errorMessage$ = this.notificationService.errorMessageAction$.pipe(
    tap((message) => {
      if (message) {
      setTimeout(() => {
        this.notificationService.clearAllMessages();
      }, 5000);
    }
    })
  );
  constructor(private loaderService:LoaderService,
    private notificationService: NotificationService) {
    
  }
}
