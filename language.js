(() => {
  const queryLanguage = new URLSearchParams(location.search).get('lang');
  if (queryLanguage) localStorage.setItem('site-language', queryLanguage);
  const chinese = (queryLanguage || localStorage.getItem('site-language') || 'en') === 'zh';
  const replacements = [
    ['关于我', 'About'], ['关于', 'About'], ['此刻', 'Now'], ['项目', 'Projects'], ['笔记', 'Notes'], ['经历与教育', 'Experience & Education'], ['经历', 'Experience'], ['联系我', 'Contact'], ['联系', 'Contact'],
    ['我是一名大数据与人工智能方向的硕士研究生，研究兴趣包括物理信息神经网络（PINNs）、神经算子，以及科学机器学习。', 'I am a master’s student in Big Data and Artificial Intelligence. My interests include Physics-Informed Neural Networks (PINNs), Neural Operators, and scientific machine learning.'],
    ['我目前是成都信息工程大学（Chengdu University of Information Technology, CUIT）大数据与人工智能方向的硕士研究生。', 'I am a master’s student in Big Data and Artificial Intelligence at Chengdu University of Information Technology (CUIT).'],
    ['我的研究兴趣包括物理信息神经网络（Physics-Informed Neural Networks, PINNs）、神经算子（Neural Operators）与科学机器学习，希望探索深度学习方法在复杂物理系统建模与求解中的应用。', 'My research interests include Physics-Informed Neural Networks (PINNs), Neural Operators, and scientific machine learning. I explore deep-learning methods for modeling and solving complex physical systems.'],
    ['在这里放一段简洁的自我介绍。可以写教育背景、所在机构与目前关注的方向；用三到五句话，让第一次来到这里的人快速认识你。', 'Write a concise introduction here: your education, institution, and current interests. Three to five sentences are enough to help a first-time visitor get to know you.'],
    ['正在做', 'Working on'], ['正在学', 'Learning'], ['开放合作', 'Open to collaboration'], ['研究兴趣', 'Research interests'], ['所在地', 'Location'], ['目前', 'Current'],
    ['[项目、工作或研究主题]', '[Current project, work, or research topic]'], ['[书籍、课程、技术或领域]', '[Book, course, technology, or field]'], ['[你愿意合作的方向]', '[Areas open for collaboration]'],
    ['精选项目', 'Selected Projects'], ['一项正在进行的工作：它解决什么问题、你在其中做了什么。', 'An ongoing project: the problem it addresses and your contribution.'], ['一个有代表性的项目、开源工具或研究成果。', 'A representative project, open-source tool, or research outcome.'], ['另一个值得记录的协作经历或独立实验。', 'Another collaboration or independent experiment worth documenting.'],
    ['写作与笔记', 'Writing & Notes'], ['文章或笔记标题放在这里　→', 'Article or note title goes here →'], ['[公司 / 学校 / 实验室名称]', '[Company / University / Lab]'], ['[公司 / 学校 / 项目名称]', '[Company / University / Project]'], ['[职位、专业或研究角色] · 一句说明你在这里主要负责或学习的内容。', '[Position, major, or research role] · A short description of your work or learning here.'], ['[职位、专业或研究角色] · 一句简短说明。', '[Position, major, or research role] · A short description.'],
    ['欢迎通过 ', 'Feel free to reach me at '], [' 联系我。', '.'], ['也可以在 ', ' You can also find me on '], [' 上找到我。', '.'], ['个人网站', 'Website']
  ];
  if (!chinese) {
    let markup = document.body.innerHTML;
    replacements.sort((a, b) => b[0].length - a[0].length).forEach(([zh, en]) => { markup = markup.split(zh).join(en); });
    document.body.innerHTML = markup;
    document.documentElement.lang = 'en';
  }
  const nav = document.querySelector('nav');
  if (nav) {
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
  const affiliation = chinese
    ? '硕士研究生 · 成都信息工程大学应用数学学院'
    : 'Master’s Student · School of Applied Mathematics, Chengdu University of Information Technology';
  document.querySelectorAll('.role, .profile-role').forEach((item) => { item.textContent = affiliation; });
  if (location.pathname.endsWith('projects.html')) {
    const firstProject = document.querySelector('.page-section article');
    if (firstProject) {
      firstProject.innerHTML = `<time>2025</time><div><b><a href="https://doi.org/10.1016/j.neucom.2025.130167" target="_blank" rel="noopener noreferrer">Improved physics-informed neural network in mitigating gradient-related failures ↗</a></b><p><em>Neurocomputing</em>, 638, 130167 · 2025</p><p>${chinese ? '第一作者 · 提出 I-PINN，以缓解 PINN 中的梯度流刚性问题并提升预测精度。' : 'First author · Proposes I-PINN to mitigate gradient-flow stiffness in PINNs and improve predictive accuracy.'}　<a href="https://github.com/PanChengN/I-PINN" target="_blank" rel="noopener noreferrer">${chinese ? '代码 ↗' : 'Code ↗'}</a></p></div>`;
    }
  }
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
  const profileLinks = document.querySelector('.profile-links');
  if (profileLinks) {
    const profileEmail = profileLinks.querySelector('a[href^="mailto:"]');
    if (profileEmail) profileEmail.innerHTML = `<span class="email-icon">✉</span><span>${chinese ? '邮箱' : 'Email'}</span>`;
    const cv = document.createElement('span');
    cv.className = 'cv-placeholder';
    cv.textContent = chinese ? '↓　简历 · 即将上传' : '↓　CV · Coming soon';
    profileLinks.append(cv);
  }
})();
