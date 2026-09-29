import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MotionService } from './core/motion.service';
import { FooterComponent } from './layout/footer.component';
import { HeaderComponent } from './layout/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
})
export class App {
  constructor() {
    inject(MotionService);
  }
}
