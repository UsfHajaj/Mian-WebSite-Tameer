import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-inner-layout',
  imports: [RouterOutlet],
  template: '<router-outlet />',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../styles/inner-pages.css'],
})
export class InnerLayoutComponent {}
