import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-sewage-network-maintenance',
  imports: [RouterLink],
  templateUrl: './sewage-network-maintenance.component.html',
})
export class SewageNetworkMaintenanceComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "صيانة شبكات الصرف الصحي | التعمير لإدارة المرافق",
  "description": "خدمة صيانة شبكات الصرف الصحي والتغذية - التعمير لإدارة المرافق.",
  "keywords": "التعمير, إدارة المرافق, صيانة, المدن الجديدة, وزارة الإسكان, الإسكان الاجتماعي, دار مصر, إدارة مشاريع سكنية, تنظيف, حراسة, صيانة مصاعد, شبكات الصرف الصحي, المساحات الخضراء",
  "path": "/sewage_network_maintenance",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.7",
  "changefreq": "weekly",
  "crumb": "شبكات الصرف والتغذية",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
