import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-project-dar',
  imports: [RouterLink],
  templateUrl: './project-dar.component.html',
})
export class ProjectDarComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "مشروع دار مصر | التعمير لإدارة المرافق",
  "description": "مشروع دار مصر - إدارة وصيانة المرافق بواسطة شركة التعمير لإدارة المرافق.",
  "keywords": "التعمير, إدارة المرافق, صيانة, المدن الجديدة, وزارة الإسكان, الإسكان الاجتماعي, دار مصر, إدارة مشاريع سكنية, تنظيف, حراسة, صيانة مصاعد, شبكات الصرف الصحي, المساحات الخضراء",
  "path": "/project_dar",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.8",
  "changefreq": "weekly",
  "crumb": "مشروع دار مصر",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
