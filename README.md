# 个人主页

这是一个无需构建工具的静态个人主页，可直接部署到 GitHub Pages。

## 个性化

打开 `index.html`，替换以下内容：

- `你的名字` / `YOUR NAME`
- 职业方向与自我介绍
- 三个项目的名称、类别和链接
- `hello@example.com` 与各社交平台链接

## 发布到 GitHub Pages

1. 在 GitHub 新建仓库（例如 `yourname.github.io`）。
2. 将此文件夹的内容推送到仓库默认分支。
3. 在仓库的 **Settings → Pages**，将发布来源设为 **Deploy from a branch**，并选择默认分支与 `/ (root)`。
4. 等待几分钟后，在 Pages 页面打开生成的网址。

若仓库名是 `yourname.github.io`，网址就是 `https://yourname.github.io`；其他仓库通常是 `https://yourname.github.io/仓库名/`。

## 用 Obsidian 更新 Notes

`notes/` 文件夹可以作为 Obsidian 的笔记目录。每篇笔记使用 Markdown，并在开头写上标题和日期：

```markdown
---
title: A note title
date: 2026.09.01
summary: A short summary shown on the Notes page.
---
```

写完后，双击项目根目录中的 `sync-notes.command`。脚本会生成 Notes 列表和文章页面，然后自动提交并推送到 GitHub。GitHub Pages 通常会在几分钟内更新。
