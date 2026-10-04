// @ts-nocheck
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

export async function mountOrgChart() {
  await loadScript('https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js');
  await loadScript('https://cdn.jsdelivr.net/npm/d3-flextree@2.1.2/build/d3-flextree.js');
  await loadScript('https://cdn.jsdelivr.net/npm/d3-org-chart@3/build/d3-org-chart.min.js');
  return initOrgChart();
}

function initOrgChart() {
  'use strict';

  var root = document.getElementById('orgChart');
  if (!root || !window.d3 || !d3.OrgChart) return;

  var nodes = [
    { id: 'board', parentId: null, name: 'مجلس إدارة شركة التعمير لإدارة المرافق', tone: 'board' },

    { id: 'md-ops', parentId: 'board', name: 'العضو المنتدب لشؤون التنفيذ والتشغيل', tone: 'md' },
    { id: 'chair', parentId: 'board', name: 'رئيس مجلس الإدارة', note: '', tone: 'chair' },
    { id: 'md-fin', parentId: 'board', name: 'العضو المنتدب للشؤون المالية والإدارية', tone: 'md' },

    {
      id: 'plan', parentId: 'md-ops', name: 'رئيس قطاع التخطيط والدراسات الاقتصادية', tone: 'head', itemTone: 'dept',
      items: ['الدراسات والبحوث الفنية', 'التخطيط التنفيذي والتكلفة', 'المتابعات والعقود']
    },
    {
      id: 'exec', parentId: 'md-ops', name: 'رئيس قطاع تنفيذ وتشغيل المشروعات الاقتصادية', tone: 'head', itemTone: 'dept',
      items: ['الإدارة العامة للتوريدات المتكاملة', 'الإدارة العامة للتشغيل والصيانة', 'الإدارة العامة لخدمات استعلامات الإسكان الاجتماعي', 'الإدارة العامة لإدارة وتشغيل الأصول الرأسمالية']
    },
    {
      id: 'sec', parentId: 'chair', name: 'رئيس القطاع الأمني والحماية الاستراتيجية', tone: 'head', itemTone: 'dept',
      items: ['الإدارة العامة للأمن والسلامة والصحة المهنية', 'إدارة التخطيط الاستراتيجي والمتابعة']
    },
    {
      id: 'tech', parentId: 'chair', name: 'رئيس القطاع الفني وتكنولوجيا المعلومات', tone: 'head', itemTone: 'dept',
      items: ['نظم المعلومات والتحول الرقمي', 'علاقات عامة وإعلام']
    },
    {
      id: 'legal', parentId: 'chair', name: 'المستشار القانوني للشركة', tone: 'head', itemTone: 'dept',
      items: ['الإدارة العامة للشؤون القانونية', 'الإدارة العامة للمراجعة والحوكمة']
    },
    {
      id: 'admin', parentId: 'md-fin', name: 'رئيس القطاع الإداري والموارد البشرية', tone: 'head', itemTone: 'dept-green',
      items: ['الإدارة العامة للشؤون الإدارية', 'الإدارة العامة للموارد البشرية', 'الإدارة العامة للصيانة والحركة', 'الإدارة العامة للاحتياجات والمخازن']
    },
    {
      id: 'fin', parentId: 'md-fin', name: 'رئيس القطاع المالي والاستثماري والتجاري', tone: 'head', itemTone: 'dept-green',
      items: ['الإدارة العامة المالية', 'الإدارة العامة للاستثمار', 'الإدارة العامة للتسويق العقاري', 'الإدارة العامة للخدمات المالية والتجارية']
    }
  ];

  function nodeWidth(d) {
    if (d.data.tone === 'board') return 280;
    if (d.data.tone === 'md' || d.data.tone === 'chair') return 230;
    return 210;
  }

  function nodeHeight(d) {
    var width = nodeWidth(d) - 24;
    var chars = Math.max(8, Math.floor(width / 7.4));
    var lines = Math.max(1, Math.ceil(d.data.name.length / chars));
    var note = d.data.note ? 16 : 0;
    var items = (d.data.items || []).length;
    return 16 + lines * 20 + note + (items ? 10 + items * 42 : 8);
  }

  function showEntireChart() {
    var svg = root.querySelector('svg');
    var center = svg && svg.querySelector('.center-group');
    if (!svg || !center) return;
    var minX = Infinity;
    var minY = Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;
    center.querySelectorAll('.node').forEach(function (node) {
      var match = (node.getAttribute('transform') || '').match(/translate\(\s*(-?[\d.]+)[,\s]+(-?[\d.]+)\s*\)/);
      var box = node.querySelector('foreignObject');
      if (!match || !box) return;
      var x = parseFloat(match[1]);
      var y = parseFloat(match[2]);
      var w = parseFloat(box.getAttribute('width')) || 0;
      var h = parseFloat(box.getAttribute('height')) || 0;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + w);
      maxY = Math.max(maxY, y + h);
    });
    if (!isFinite(minX)) return;
    var pad = 18;
    center.setAttribute('transform', 'translate(' + (pad - minX) + ',' + (pad - minY) + ')');
    var width = Math.ceil(maxX - minX + pad * 2);
    var height = Math.ceil(maxY - minY + pad * 2);
    svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
    var mobile = window.matchMedia('(max-width: 991px)').matches;
    root.classList.toggle('is-pannable', mobile);
    if (mobile) {
      svg.setAttribute('width', width);
      svg.setAttribute('height', height);
      svg.style.width = width + 'px';
      svg.style.maxWidth = 'none';
      svg.style.height = height + 'px';
      root.scrollLeft = Math.max(0, (width - root.clientWidth) / 2);
      return;
    }
    svg.setAttribute('width', '100%');
    svg.style.width = '100%';
    svg.style.maxWidth = '100%';
    svg.style.height = 'auto';
    svg.removeAttribute('height');
    root.scrollLeft = 0;
  }

  new d3.OrgChart()
    .container('#orgChart')
    .data(nodes)
    .nodeId(function (d) { return d.id; })
    .parentNodeId(function (d) { return d.parentId; })
    .layout('top')
    .compact(false)
    .duration(0)
    .initialExpandLevel(4)
    .setActiveNodeCentered(false)
    .nodeWidth(nodeWidth)
    .nodeHeight(nodeHeight)
    .childrenMargin(function () { return 64; })
    .siblingsMargin(function () { return 18; })
    .neighbourMargin(function () { return 36; })
    .buttonContent(function () { return ''; })
    .nodeContent(function (d) {
      var note = d.data.note ? '<small>' + d.data.note + '</small>' : '';
      var items = (d.data.items || []).map(function (item) {
        return '<li class="org-node__item org-node__item--' + d.data.itemTone + '">' + item + '</li>';
      }).join('');
      var list = items ? '<ul class="org-node__list">' + items + '</ul>' : '';
      return '<div class="org-node org-node--' + d.data.tone + '" style="width:' + d.width + 'px;height:' + d.height + 'px"><span class="org-node__title">' + d.data.name + '</span>' + note + list + '</div>';
    })
    .linkUpdate(function () {
      d3.select(this).attr('stroke', '#5f7368').attr('stroke-width', 1.5).attr('fill', 'none');
    })
    .render();

  window.setTimeout(showEntireChart, 80);
  window.addEventListener('load', showEntireChart);
  window.addEventListener('resize', showEntireChart);
  return function () {
    window.removeEventListener('resize', showEntireChart);
    window.removeEventListener('load', showEntireChart);
  };
}
