// @ts-nocheck
const VISIBLE = 58;
const HEAD_W = 136;
const DEPT_W = 142;
const DEPT_H = 36;
const DEPT_GAP = 6;
const ARM = 36;
const GROUP_GAP = 10;
const LEFT_BLOCK = Math.max(54, DEPT_H * 2 + DEPT_GAP);
const BAND = LEFT_BLOCK * 2 + GROUP_GAP + 8;
const CHAIR_W = (ARM + HEAD_W + ARM + DEPT_W) * 2 + 24;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const found = document.querySelector('script[src="' + src + '"]');
    if (found && found.dataset.loaded === '1') { resolve(); return; }
    const script = found || document.createElement('script');
    script.src = src;
    script.onload = () => { script.dataset.loaded = '1'; resolve(); };
    script.onerror = () => reject(new Error(src));
    if (!found) document.head.appendChild(script);
  });
}

function node(id, parentId, name, tone, items, itemTone) {
  return { id, parentId, name, tone, items: items || null, itemTone: itemTone || '' };
}

function chartNodes() {
  return [
    node('board', null, 'مجلس إدارة شركة التعمير لإدارة المرافق', 'board'),
    node('chair', 'board', 'رئيس مجلس الإدارة', 'chair'),

    node('md-ops', 'chair', 'العضو المنتدب لشؤون التنفيذ والتشغيل', 'md'),
    node('md-fin', 'chair', 'العضو المنتدب للشؤون المالية والإدارية', 'md'),

    node('exec', 'md-ops', 'رئيس قطاع تنفيذ المشروعات الاقتصادية', 'head', [
      'الإدارة العامة للمقاولات المتكاملة',
      'الإدارة العامة للتشغيل والصيانة',
      'الإدارة العامة لخدمات استعلامات الإسكان الاجتماعي',
      'الإدارة العامة لإدارة وتشغيل الأصول الرأسمالية',
    ], 'dept'),
    node('plan', 'md-ops', 'رئيس قطاع التخطيط والدراسات الاقتصادية', 'head', [
      'الدراسات والبحوث التحليلية',
      'التخطيط التنفيذي والتكلفة',
      'العطاءات والعقود',
    ], 'dept'),

    node('admin', 'md-fin', 'رئيس القطاع الإداري والموارد البشرية', 'head', [
      'الإدارة العامة للشؤون الإدارية',
      'الإدارة العامة للموارد البشرية',
      'الإدارة العامة للصيانة والحركة',
      'الإدارة العامة للاحتياجات والمخازن',
    ], 'dept-green'),
    node('fin', 'md-fin', 'رئيس القطاع المالي والاستثماري والتجاري', 'head', [
      'الإدارة العامة المالية',
      'الإدارة العامة للاستثمار',
      'الإدارة العامة للتسويق العقاري',
      'الإدارة العامة للخدمات المالية والتجارية',
    ], 'dept-green'),
  ];
}

function nodeWidth(d) {
  if (d.data.tone === 'board') return 280;
  if (d.data.tone === 'chair') return CHAIR_W;
  if (d.data.tone === 'md') return 220;
  if (d.data.tone === 'head') return 210;
  return 160;
}

function nodeHeight(d) {
  const items = (d.data.items || []).length;
  if (d.data.tone === 'board') return 52;
  if (d.data.tone === 'chair') return VISIBLE + BAND;
  if (d.data.tone === 'md') return 52;
  if (d.data.tone === 'head') return 58 + (items ? 8 + items * 34 : 0);
  return 44;
}

function drawStaff(chart) {
  const state = chart.getChartState();
  const chair = (state.allNodes || []).find((item) => item.data && item.data.id === 'chair');
  const layer = state.svg && state.svg.select('.center-group');
  if (!chair || !layer || chair.x == null) return;

  layer.selectAll('.org-staff').remove();
  const g = layer.append('g').attr('class', 'org-staff');
  const stemX = chair.x;
  const top = chair.y + VISIBLE;
  const bottom = chair.y + chair.height;

  const line = (x1, y1, x2, y2, dashed) => {
    g.append('path')
      .attr('d', 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2)
      .attr('fill', 'none')
      .attr('stroke', '#3d4f46')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', dashed ? '5 4' : null);
  };

  const box = (x, y, w, h, label, tone) => {
    const holder = g.append('g').attr('transform', 'translate(' + x + ',' + y + ')');
    holder.append('foreignObject')
      .attr('width', w)
      .attr('height', h)
      .append('xhtml:div')
      .attr('class', 'org-node org-node--' + tone)
      .style('width', w + 'px')
      .style('height', h + 'px')
      .html('<span class="org-node__title">' + label + '</span>');
  };

  line(stemX, top, stemX, bottom);

  const headW = HEAD_W;
  const headH = 54;
  const deptW = DEPT_W;
  const deptH = DEPT_H;
  const deptGap = DEPT_GAP;
  const arm = ARM;

  const leftGroups = [
    {
      title: 'رئيس القطاع الفني وتكنولوجيا المعلومات',
      items: ['علاقات عامة وإعلام', 'نظم المعلومات والتحول الرقمي'],
    },
    {
      title: 'رئيس القطاع الأمني والمتابعة الاستراتيجية',
      items: ['الإدارة العامة للأمن والسلامة والصحة المهنية', 'إدارة التخطيط الاستراتيجي والمتابعة'],
    },
  ];

  const groupGap = GROUP_GAP;
  const groupHeights = leftGroups.map((group) => Math.max(headH, group.items.length * deptH + (group.items.length - 1) * deptGap));
  const leftHeight = groupHeights.reduce((sum, height) => sum + height, 0) + groupGap;
  let cursor = top + Math.max(0, (BAND - leftHeight) / 2);

  leftGroups.forEach((group, index) => {
    const blockH = groupHeights[index];
    const stackH = group.items.length * deptH + (group.items.length - 1) * deptGap;
    const headX = stemX - arm - headW;
    const headY = cursor + (blockH - headH) / 2;
    const deptX = headX - arm - deptW;
    const deptY = cursor + (blockH - stackH) / 2;
    group.items.forEach((label, item) => {
      const y = deptY + item * (deptH + deptGap);
      const mid = y + deptH / 2;
      line(deptX + deptW, mid, headX, mid);
      box(deptX, y, deptW, deptH, label, 'dept-green');
    });
    line(headX + headW, headY + headH / 2, stemX, headY + headH / 2);
    box(headX, headY, headW, headH, group.title, 'side');
    cursor += blockH + groupGap;
  });

  const right = [
    { label: 'المستشار القانوني للشركة', tone: 'side', dashed: true },
    { label: 'الإدارة العامة للشؤون القانونية', tone: 'dept-green', dashed: false },
    { label: 'الإدارة العامة للمراجعة والحوكمة', tone: 'dept-green', dashed: false },
  ];
  const rightH = right.length * deptH + (right.length - 1) * deptGap;
  let rightY = top + Math.max(0, (BAND - rightH) / 2);
  right.forEach((item) => {
    const mid = rightY + deptH / 2;
    line(stemX, mid, stemX + arm, mid, item.dashed);
    box(stemX + arm, rightY, 156, deptH, item.label, item.tone);
    rightY += deptH + deptGap;
  });
}

export function mountOrgChart() {
  const root = document.getElementById('orgChart');
  if (!root || !window.d3 || !d3.OrgChart) return;

  root.classList.add('is-zoom');
  const host = root.parentElement;
  host.querySelectorAll('.org-zoom').forEach((el) => el.remove());
  const controls = document.createElement('div');
  controls.className = 'org-zoom';
  controls.innerHTML = '<button type="button" class="org-zoom__btn" data-zoom="in" aria-label="تكبير">+</button><button type="button" class="org-zoom__btn" data-zoom="out" aria-label="تصغير">−</button>';
  host.appendChild(controls);

  const chart = new d3.OrgChart();
  const bindings = chart.layoutBindings();
  bindings.top.diagonal = (child, parent) => {
    const mid = (parent.y + child.y) / 2;
    return 'M ' + parent.x + ' ' + parent.y + ' L ' + parent.x + ' ' + mid + ' L ' + child.x + ' ' + mid + ' L ' + child.x + ' ' + child.y;
  };
  chart.layoutBindings(bindings);

  const onZoomClick = (event) => {
    const button = event.target.closest('[data-zoom]');
    if (!button) return;
    if (button.dataset.zoom === 'in') chart.zoomIn();
    else chart.zoomOut();
  };
  controls.addEventListener('click', onZoomClick);

  chart
    .container('#orgChart')
    .svgHeight(root.clientHeight || 640)
    .svgWidth(root.clientWidth || 360)
    .data(chartNodes())
    .nodeId((d) => d.id)
    .parentNodeId((d) => d.parentId)
    .layout('top')
    .compact(false)
    .duration(0)
    .initialExpandLevel(6)
    .setActiveNodeCentered(false)
    .nodeWidth(nodeWidth)
    .nodeHeight(nodeHeight)
    .childrenMargin(() => 32)
    .siblingsMargin(() => 10)
    .neighbourMargin(() => 16)
    .buttonContent(() => '')
    .nodeContent((d) => {
      if (d.data.tone === 'chair') {
        return '<div class="org-node org-node--chairgap" style="width:' + d.width + 'px;height:' + d.height + 'px"><span class="org-node__title">رئيس مجلس الإدارة</span></div>';
      }
      const items = (d.data.items || []).map((item) => '<li class="org-node__item org-node__item--' + d.data.itemTone + '">' + item + '</li>').join('');
      const list = items ? '<ul class="org-node__list">' + items + '</ul>' : '';
      return '<div class="org-node org-node--' + d.data.tone + '" style="width:' + d.width + 'px;height:' + d.height + 'px"><span class="org-node__title">' + d.data.name + '</span>' + list + '</div>';
    })
    .linkUpdate(function () {
      d3.select(this).attr('stroke', '#3d4f46').attr('stroke-width', 1.5).attr('fill', 'none');
    })
    .render();

  const fitChart = () => {
    const svg = root.querySelector('svg');
    if (svg) {
      svg.setAttribute('width', String(root.clientWidth || 360));
      svg.setAttribute('height', String(root.clientHeight || 640));
    }
    chart.fit({ animate: false });
  };

  drawStaff(chart);
  window.setTimeout(fitChart, 40);
  window.addEventListener('resize', fitChart);

  return () => {
    window.removeEventListener('resize', fitChart);
    controls.removeEventListener('click', onZoomClick);
    controls.remove();
  };
}

export function loadOrgChart() {
  return loadScript('https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js')
    .then(() => loadScript('https://cdn.jsdelivr.net/npm/d3-flextree@2.1.2/build/d3-flextree.js'))
    .then(() => loadScript('https://cdn.jsdelivr.net/npm/d3-org-chart@3/build/d3-org-chart.min.js'))
    .then(() => mountOrgChart());
}
