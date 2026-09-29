import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-contracting',
  imports: [RouterLink],
  templateUrl: './contracting.component.html',
})
export class ContractingComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "أعمال المقاولات | التعمير لإدارة المرافق",
  "description": "أعمال المقاولات والإشراف على تنفيذ المشروعات - التعمير لإدارة المرافق.",
  "keywords": "",
  "path": "/contracting",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.8",
  "changefreq": "weekly",
  "crumb": "أعمال المقاولات",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
