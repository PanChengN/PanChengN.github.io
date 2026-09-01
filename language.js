(() => {
  const queryLanguage = new URLSearchParams(location.search).get('lang');
  if (queryLanguage) localStorage.setItem('site-language', queryLanguage);
  const chinese = (queryLanguage || localStorage.getItem('site-language') || 'en') === 'zh';
  document.querySelectorAll('a[href="contact.html"]').forEach((link) => link.remove());
  document.querySelectorAll('a[href="about.html"]').forEach((link) => link.remove());
  const replacements = [
    ['关于我', 'About'], ['关于', 'About'], ['此刻', 'Now'], ['项目', 'Publications'], ['笔记', 'Notes'], ['经历与教育', 'Experience & Education'], ['经历', 'Experience'], ['教育', 'Education'], ['联系我', 'Contact'], ['联系', 'Contact'],
    ['我是一名大数据与人工智能方向的硕士研究生，研究兴趣包括物理信息神经网络（PINNs）、神经算子，以及科学机器学习。', 'I am a master’s student in Big Data and Artificial Intelligence. My interests include Physics-Informed Neural Networks (PINNs), Neural Operators, and scientific machine learning.'],
    ['我目前是成都信息工程大学（Chengdu University of Information Technology, CUIT）大数据与人工智能方向的硕士研究生。', 'I am a master’s student in Big Data and Artificial Intelligence at Chengdu University of Information Technology (CUIT).'],
    ['我的研究兴趣包括物理信息神经网络（Physics-Informed Neural Networks, PINNs）、神经算子（Neural Operators）与科学机器学习，希望探索深度学习方法在复杂物理系统建模与求解中的应用。', 'My research interests include Physics-Informed Neural Networks (PINNs), Neural Operators, and scientific machine learning. I explore deep-learning methods for modeling and solving complex physical systems.'],
    ['在这里放一段简洁的自我介绍。可以写教育背景、所在机构与目前关注的方向；用三到五句话，让第一次来到这里的人快速认识你。', 'Write a concise introduction here: your education, institution, and current interests. Three to five sentences are enough to help a first-time visitor get to know you.'],
    ['正在做', 'Working on'], ['正在学', 'Learning'], ['开放合作', 'Open to collaboration'], ['研究兴趣', 'Research interests'], ['所在地', 'Location'], ['目前', 'Current'],
    ['[项目、工作或研究主题]', '[Current project, work, or research topic]'], ['[书籍、课程、技术或领域]', '[Book, course, technology, or field]'], ['[你愿意合作的方向]', '[Areas open for collaboration]'],
    ['精选项目', 'Selected Projects'], ['一项正在进行的工作：它解决什么问题、你在其中做了什么。', 'An ongoing project: the problem it addresses and your contribution.'], ['一个有代表性的项目、开源工具或研究成果。', 'A representative project, open-source tool, or research outcome.'], ['另一个值得记录的协作经历或独立实验。', 'Another collaboration or independent experiment worth documenting.'],
    ['写作与笔记', 'Writing & Notes'], ['文章或笔记标题放在这里　→', 'Article or note title goes here →'], ['[公司 / 学校 / 实验室名称]', '[Company / University / Lab]'], ['[公司 / 学校 / 项目名称]', '[Company / University / Project]'], ['[职位、专业或研究角色] · 一句说明你在这里主要负责或学习的内容。', '[Position, major, or research role] · A short description of your work or learning here.'], ['[职位、专业或研究角色] · 一句简短说明。', '[Position, major, or research role] · A short description.'],
    ['欢迎通过 ', 'Feel free to reach me at '], [' 联系我。', '.'], ['也可以在 ', ' You can also find me on '], [' 上找到我。', '.'], ['或其他社交平台上找到我。', 'or other social platforms.'], ['个人网站', 'Website']
  ];
  if (!chinese) {
    let markup = document.body.innerHTML;
    replacements.sort((a, b) => b[0].length - a[0].length).forEach(([zh, en]) => { markup = markup.split(zh).join(en); });
    document.body.innerHTML = markup;
    document.documentElement.lang = 'en';
  }
  if (chinese && location.pathname.endsWith('index.html')) {
    const homeTranslations = [
      ['Homepage', '主页'], ['About', '关于'], ['Now', '此刻'], ['Projects', '项目'], ['Notes', '笔记'], ['Experience', '经历'], ['Contact', '联系'],
      ['WELCOME / 2026', '欢迎 / 2026'], ['Master’s Student · School of Applied Mathematics, Chengdu University of Information Technology', '硕士研究生 · 成都信息工程大学应用数学学院'],
      ['I am a master’s student working at the intersection of applied mathematics and artificial intelligence. My research focuses on Physics-Informed Neural Networks, Neural Operators, and scientific machine learning for solving complex physical systems.', '我是一名应用数学与人工智能交叉方向的硕士研究生，研究聚焦物理信息神经网络、神经算子以及用于复杂物理系统求解的科学机器学习。'],
      ['I am interested in building more accurate, stable, and efficient learning-based PDE solvers through architecture and optimization design.', '我关注通过网络架构与优化方法设计，构建更准确、稳定且高效的学习型偏微分方程求解器。'],
      ['Selected Publications', '代表论文'], ['News', '动态'], ['View all projects →', '查看全部项目 →'], ['Our ACR-PINN work is available on arXiv.', 'ACR-PINN 工作已发布于 arXiv。'], ['I-PINN was published in ', 'I-PINN 已发表于 '], ['CV · Coming soon', '简历 · 即将上传']
    ];
    let markup = document.body.innerHTML;
    homeTranslations.sort((a, b) => b[0].length - a[0].length).forEach(([en, zh]) => { markup = markup.split(en).join(zh); });
    document.body.innerHTML = markup;
    document.documentElement.lang = 'zh-CN';
  }
  if (location.pathname.endsWith('index.html')) {
    const outputHeading = document.querySelector('.home-section h2');
    if (outputHeading && (outputHeading.textContent.includes('Selected Publications') || outputHeading.textContent.includes('代表论文'))) {
      outputHeading.textContent = chinese ? '研究成果' : 'Research Outputs';
    }
  }
  if (location.pathname.endsWith('now.html')) {
    const nowGrid = document.querySelector('.now-grid');
    if (nowGrid) nowGrid.innerHTML = chinese
      ? '<p><time class="now-date">2026.09</time><span>正在研究</span><span class="now-text">托卡马克装置中核聚变反应的弹丸注入–磁流体力学（MHD）耦合模型。</span></p>'
      : '<p><time class="now-date">2026.09</time><span>Researching</span><span class="now-text">A coupled pellet-injection–magnetohydrodynamic (MHD) model for nuclear fusion reactions in tokamak devices.</span></p>';
  }
  const nav = document.querySelector('nav');
  if (nav) {
    if (!nav.querySelector('a[href="index.html"]')) {
      const home = document.createElement('a');
      home.href = 'index.html';
      home.textContent = chinese ? '主页' : 'Homepage';
      nav.prepend(home);
    }
    const button = document.createElement('button');
    button.className = 'lang-toggle';
    button.textContent = chinese ? 'EN' : '中文';
    button.addEventListener('click', () => {
      localStorage.setItem('site-language', chinese ? 'en' : 'zh');
      const url = new URL(location.href);
      url.searchParams.delete('lang');
      location.href = url.toString();
    });
    nav.append(button);
  }
  if (location.pathname.endsWith('index.html') || location.pathname.endsWith('/')) {
    const main = document.querySelector('main');
    const intro = document.querySelector('.home-intro');
    if (main && intro && !main.querySelector('.home-now-preview')) {
      const now = document.createElement('section');
      now.className = 'home-section home-preview home-now-preview';
      now.innerHTML = `<h2>${chinese ? '此刻' : 'Now'}</h2><p><time>2026.09</time>　${chinese ? '正在研究托卡马克装置中核聚变反应的弹丸注入–磁流体力学（MHD）耦合模型。' : 'Investigating a coupled pellet-injection–magnetohydrodynamic (MHD) model for nuclear fusion reactions in tokamak devices.'}</p><a class="home-more" href="now.html">${chinese ? '查看当前状态 →' : 'View current focus →'}</a>`;
      intro.insertAdjacentElement('afterend', now);
    }
    document.querySelectorAll('.home-section').forEach((section) => section.classList.add('home-preview'));
  }
  const affiliation = chinese
    ? '硕士研究生 · 成都信息工程大学应用数学学院'
    : 'Master’s Student · School of Applied Mathematics, Chengdu University of Information Technology';
  document.querySelectorAll('.role, .profile-role').forEach((item) => { item.textContent = affiliation; });
  document.querySelectorAll('a').forEach((link) => {
    if (link.textContent.includes('GitHub')) {
      link.href = 'https://github.com/PanChengN';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });
  document.querySelectorAll('a').forEach((link) => {
    if (link.textContent.includes('LinkedIn')) link.remove();
  });
  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.href = 'mailto:niupancheng@163.com';
    link.textContent = chinese ? '✉　邮箱' : '✉　Email';
    link.title = 'niupancheng@163.com';
    link.setAttribute('aria-label', 'Email: niupancheng@163.com');
  });
  const homeAside = document.querySelector('.home-intro>aside');
  if (homeAside && !homeAside.querySelector('.home-sidebar-info')) {
    const info = document.createElement('div');
    info.className = 'home-sidebar-info';
    info.innerHTML = `<strong>Pancheng Niu</strong><span>${chinese ? '硕士研究生' : 'Master’s Student'}</span><span>${chinese ? '成都信息工程大学应用数学学院' : 'School of Applied Mathematics<br>Chengdu University of Information Technology'}</span>`;
    const avatar = homeAside.querySelector('.home-avatar');
    if (avatar) avatar.insertAdjacentElement('afterend', info);
  }
  const profileLinks = document.querySelector('.profile-links');
  if (profileLinks) {
    const profileEmail = profileLinks.querySelector('a[href^="mailto:"]');
    if (profileEmail) profileEmail.innerHTML = `<span class="email-icon">✉</span><span>${chinese ? '邮箱' : 'Email'}</span>`;
    if (!profileLinks.querySelector('.cv-placeholder')) {
      const cv = document.createElement('span');
      cv.className = 'cv-placeholder';
      cv.textContent = chinese ? '↓　简历 · 即将上传' : '↓　CV · Coming soon';
      profileLinks.append(cv);
    }
  }
  document.querySelectorAll('.home-news>p').forEach((item) => {
    if (item.querySelector('.news-text')) return;
    const text = document.createElement('span');
    text.className = 'news-text';
    Array.from(item.childNodes).forEach((node) => {
      if (!(node.nodeType === Node.ELEMENT_NODE && node.tagName === 'TIME')) text.append(node);
    });
    item.append(text);
  });
})();
