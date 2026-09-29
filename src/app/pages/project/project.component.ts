import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-project',
  imports: [RouterLink],
  templateUrl: './project.component.html',
})
export class ProjectComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "مشروعاتنا | التعمير لإدارة المرافق",
  "description": "محفظة مشروعات التعمير لإدارة المرافق: الإسكان الاجتماعي، سكن مصر، دار مصر، جنة والمشروعات التجارية.",
  "keywords": "التعمير, إدارة المرافق, صيانة, المدن الجديدة, وزارة الإسكان, الإسكان الاجتماعي, دار مصر, إدارة مشاريع سكنية, تنظيف, حراسة, صيانة مصاعد, شبكات الصرف الصحي, المساحات الخضراء",
  "path": "/project",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.8",
  "changefreq": "weekly",
  "crumb": "مشروعاتنا",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
