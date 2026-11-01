import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-real-estate-asset-management',
  imports: [RouterLink],
  templateUrl: './real-estate-asset-management.component.html',
  styleUrl: './real-estate-asset-management.component.css',
})
export class RealEstateAssetManagementComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
      title: 'إدارة وتشغيل الأصول العقارية والمنشآت التجارية والإدارية | التعمير لإدارة المرافق',
      description:
        'إدارة وتشغيل الأصول العقارية والمنشآت التجارية والإدارية مع التعمير لإدارة المرافق: تشغيل يومي، صيانة، نظافة، وأنظمة سلامة للمولات والمباني الإدارية في مصر.',
      keywords:
        'إدارة الأصول العقارية, تشغيل المنشآت التجارية, إدارة المنشآت الإدارية, Facility Management, تشغيل المولات, T Square Mall, التعمير لإدارة المرافق, Al Tameer, صيانة المنشآت التجارية, نظافة المباني الإدارية, أنظمة السلامة والحريق, وزارة الإسكان, المدن الجديدة',
      path: '/real_estate_asset_management',
      image: 'https://tameer-facility.com/images/TS1.jpeg',
      priority: '0.8',
      changefreq: 'weekly',
      crumb: 'إدارة وتشغيل الأصول العقارية والمنشآت التجارية والإدارية',
      serviceName: 'إدارة وتشغيل الأصول العقارية والمنشآت التجارية والإدارية',
      robots: 'index, follow, max-image-preview:large',
    });
  }
}
