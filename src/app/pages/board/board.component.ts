import { Component, DestroyRef, ElementRef, ViewEncapsulation, afterNextRender, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { initScrollFx } from '../../core/scroll-fx';

@Component({
  selector: 'app-board',
  imports: [RouterLink],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class BoardComponent {
  private readonly seo = inject(SeoService);
  private readonly host = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly destroyRef = inject(DestroyRef);

  readonly members = [
    {
      name: 'المحاسب عبدالله رشدي عبدالله',
      post: 'العضو المنتدب للشؤون المالية والإدارية',
      text: 'يتولى المسؤولية التنفيذية عن الشؤون المالية والإدارية، وإدارة موارد الشركة وأعمالها المؤسسية.',
    },
    {
      name: 'م. صلاح حسن السيد مرسي',
      post: 'العضو المنتدب لشؤون التنفيذ والتشغيل',
      text: 'مسؤول تنفيذي عن التنفيذ والتشغيل بالشركة، ومتابعة إدارة وتشغيل المرافق ورفع كفاءة المشروعات.',
    },
    {
      name: 'م. كمال الدين أحمد بهجات',
      post: 'نائب الرئيس التنفيذي لصندوق الإسكان الاجتماعي للشؤون الهندسية والاستثمار العقاري',
      text: 'شارك في الإشراف على مشروعات الإسكان والتنمية العمرانية، ومن بينها مدينة العلمين الجديدة و«دار مصر»، ويتابع التنفيذ والتنسيق مع الجهات الاستشارية والتنفيذية.',
    },
    {
      name: 'م. أحمد علي محمد حسن',
      post: 'نائب رئيس هيئة المجتمعات العمرانية الجديدة لقطاع المرافق',
      text: 'قيادي هندسي بالهيئة، متخصص في المرافق والبنية التحتية والشبكات والمحطات، ويتابع مشروعات المدن الجديدة وأعمال التواصل مع مجلسي النواب والشيوخ.',
    },
    {
      name: 'أ. هالة غازي أحمد الهلالي',
      post: 'نائب الرئيس التنفيذي لصندوق الإسكان الاجتماعي ودعم التمويل العقاري',
      text: 'قيادية في منظومة الإسكان الاجتماعي ودعم التمويل العقاري، وترتبط مهامها بالإدارة التنفيذية للصندوق.',
    },
    {
      name: 'م. محمد عبد المقصود رمضان',
      post: 'رئيس جهاز تنمية مدينة أكتوبر الجديدة',
      text: 'تولى رئاسة أجهزة مدن جديدة، من بينها العاصمة الإدارية الجديدة، ويدير جهاز أكتوبر الجديدة ومتابعة مشروعات الإسكان والمرافق والبنية الأساسية.',
    },
    {
      name: 'م. أحمد عباس إبراهيم جاد الله',
      post: 'العضو المنتدب لشركة المقاولون العرب لإدارة المرافق',
      text: 'قيادي بشركة المقاولون العرب في مجالات إدارة المرافق والتشغيل والصيانة والخدمات.',
    },
    {
      name: 'د. صلاح الدين محمد علي بيومي',
      post: 'نائب رئيس الشركة القابضة لمياه الشرب والصرف الصحي',
      text: 'قيادي في قطاع مياه الشرب والصرف الصحي، وشارك في ملفات فنية مرتبطة بإعادة استخدام المياه المعالجة.',
    },
    {
      name: 'أ. عامر السيد مصطفى',
      post: 'رئيس الإدارة المركزية للمراجعة الداخلية والحوكمة بوزارة الإسكان',
      text: 'قيادي إداري متخصص في المراجعة الداخلية والحوكمة والرقابة المؤسسية داخل قطاع الإسكان.',
    },
  ];

  constructor() {
    this.seo.apply({
      title: 'مجلس الإدارة | التعمير لإدارة المرافق',
      description: 'مجلس إدارة شركة التعمير لإدارة المرافق: رئيس المجلس والأعضاء، وموجز عن دور كل منهم في الإسكان والمرافق والتشغيل.',
      keywords: 'مجلس إدارة التعمير, حسن الشوربجي, التعمير لإدارة المرافق, Al Tameer',
      path: '/board',
      image: 'https://tameer-facility.com/images/socialhousing_high.jpg',
      priority: '0.8',
      changefreq: 'monthly',
      crumb: 'مجلس الإدارة',
      robots: 'index, follow, max-image-preview:large',
    });
    afterNextRender(() => {
      this.destroyRef.onDestroy(initScrollFx(this.host));
    });
  }
}
