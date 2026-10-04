import { Component, DestroyRef, ElementRef, ViewEncapsulation, afterNextRender, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { initScrollFx } from '../../core/scroll-fx';

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ServicesComponent {
  private readonly seo = inject(SeoService);
  private readonly host = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly destroyRef = inject(DestroyRef);

  readonly pillars = [
    { icon: 'fa-cogs', title: 'تشغيل يومي', text: 'إدارة المجتمعات السكنية والمرافق والخدمات اليومية بفرق مقيمة داخل الموقع.' },
    { icon: 'fa-shield-alt', title: 'صيانة متكاملة', text: 'من الشبكات والمصاعد والطرق حتى النظافة والإنارة والزراعة، تحت تعاقد واحد.' },
    { icon: 'fa-map-marked-alt', title: 'تغطية واسعة', text: 'أعمال جارية في المدن الجديدة والمحافظات على مستوى الجمهورية.' },
  ];

  readonly services = [
    { path: '/project', img: '/images/Gemini_Generated_Image_7dmd5c7dmd5c7dmd.jpg', title: 'إدارة وتشغيل وصيانة المشروعات السكنية', text: 'تشغيل وصيانة المجتمعات السكنية ومتابعة المرافق والخدمات اليومية بكفاءة.' },
    { path: '/green_area_maintenance', img: '/images/image27-e1627925268524-768x901.jpg', title: 'إدارة الحدائق والنوادي', text: 'العناية بالحدائق والنوادي والمساحات الرياضية وتحسين البيئة المحيطة.' },
    { path: '/building_cleaning_work', img: '/images/road6.png', title: 'النظافة العامة ورفع المخلفات', text: 'تنظيف الطرق والمداخل والأجزاء المشتركة ورفع المخلفات بمنظومة مستمرة.' },
    { path: '/sewage_network_maintenance', img: '/images/Drainageandwatersupplynetworks.png', title: 'شبكات المياه والصرف والمرافق', text: 'صيانة شبكات التغذية والصرف والإنارة والمرافق الأساسية داخل المجتمعات.' },
    { path: '/green_area_maintenance', img: '/images/GSM-MCTOPBWFEHBG.png', title: 'المساحات الخضراء والأشجار', text: 'صيانة المسطحات الخضراء والنجيل والأشجار والري لتحسين جودة المكان.' },
    { path: '/security_and_guarding_work', img: '/images/SecurityandGuarding.png', title: 'الأمن والحراسة', text: 'تأمين المداخل والمواقع والمرافق مع خدمات الحماية والمرور والرقابة.' },
    { path: '/building_facilities_maintenance', img: '/images/Roadandstreetmaintenance.png', title: 'مرافق العمارات والمباني', text: 'متابعة مرافق العمارات والممرات والبوابات ومعالجة الأعطال الطارئة.' },
    { path: '/maintenance_of_electric_elevators', img: '/images/Elevatorandfacilitymaintenance.png', title: 'المصاعد والمعدات الحيوية', text: 'صيانة المصاعد الكهربائية والمعدات الحيوية وضمان جاهزيتها للتشغيل.' },
    { path: '/road_maintenance', img: '/images/road1.png', title: 'أعمال صيانة ونظافة الطرق', text: 'صيانة وإصلاح الطرق والأرصفة، مع النظافة ورفع المخلفات والتطهير.' },
    { path: '/administrative_building_cleaning', img: '/images/ABCW-FOC.png', title: 'نظافة المباني الإدارية', text: 'تنظيف احترافي للمنشآت الإدارية والتجارية.' },
    { path: '/garden_lighting_maintenance', img: '/images/GAFLM-MOGFLPRECIERDPBWSTS1.png', title: 'صيانة إنارة الحدائق والأسوار', text: 'صيانة منظومة الإنارة للفضاءات الخارجية.' },
    { path: '/real_estate_development', img: '/images/tatweerAqary1.png', title: 'التطوير العقاري', text: 'إدارة الأصول العقارية وتطوير المشاريع التجارية والسكنية.' },
    { path: '/contracting', img: '/images/images2.png', title: 'أعمال المقاولات', text: 'الإشراف على تنفيذ المنشآت والمشروعات والتجهيزات وفق الجودة والمعايير الفنية.' },
    { path: '/equipment', img: '/images/road4.png', title: 'تأجير المعدات المملوكة', text: 'توفير معدات الشركة لدعم أعمال التنفيذ والتشغيل في المشروعات المختلفة.' },
    { path: '/contracting_transport', img: '/images/imagesTameer.png', title: 'إدارة وتشغيل أسطول النقل', text: 'إدارة وتشغيل أتوبيسات النقل وخدمات نقل الركاب والبضائع والمهمات.' },
  ].map((s, i) => ({ ...s, no: String(i + 1).padStart(2, '0') }));

  constructor() {
    this.seo.apply({
      title: 'الخدمات - إدارة المرافق والصيانة | التعمير لإدارة المرافق',
      description: 'خدمات التعمير لإدارة المرافق: صيانة الطرق، النظافة، الحراسة، شبكات الصرف، المساحات الخضراء، المصاعد الكهربائية وصيانة مرافق المباني.',
      keywords: 'التعمير, إدارة المرافق, صيانة, المدن الجديدة, وزارة الإسكان, الإسكان الاجتماعي, دار مصر, إدارة مشاريع سكنية, تنظيف, حراسة, صيانة مصاعد, شبكات الصرف الصحي, المساحات الخضراء',
      path: '/services',
      image: 'https://tameer-facility.com/images/socialhousing_high.jpg',
      priority: '0.9',
      changefreq: 'weekly',
      crumb: 'خدماتنا المتخصصة',
      robots: 'index, follow, max-image-preview:large',
    });
    afterNextRender(() => {
      this.destroyRef.onDestroy(initScrollFx(this.host));
    });
  }
}
