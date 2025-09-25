# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

项目概览
- 本仓库为 Mintlify 文档站点（docs.json 存在且配置完整）。文档内容以 MDX 为主，示例包含 Guides 与 API Reference 两大分区。
- 站点配置入口为 docs.json：定义主题、配色、Logo、导航（含 tabs/groups/pages）、Navbar、Footer 等；内容页面通过 slug 与对应的 MDX 文件映射。
- 示例内容组织（非穷举）：
  - essentials/*：基础用法与写作规范
  - api-reference/*：API 参考与端点示例（endpoint/get|create|delete|webhook）
  - snippets/*：可复用片段示例

关键文件与目录（重点）
- docs.json：站点唯一配置源（theme/colors/logo/navbar/footer/navigation）。
- 内容文件：位于子目录（如 essentials/、api-reference/endpoint/ 等）中的 .mdx。

常用命令（Mintlify CLI）
- 先在全局安装 CLI（需要 Node/npm）：

```powershell path=null start=null
npm i -g mintlify
```

- 在仓库根目录（docs.json 所在处）本地预览文档：

```powershell path=null start=null
mintlify dev
```

- 开发环境故障排查（依赖缺失时重装）：

```powershell path=null start=null
mintlify install
```

说明
- 本仓库未检测到测试或 Lint 配置文件与脚本；常规开发流程是通过 mintlify dev 本地预览与迭代内容。
- 发布流程参考 README：安装 Mintlify GitHub App 后，默认分支合并即会自动部署至生产。

高层架构与工作流（大图景）
- 配置驱动：docs.json 作为单一真相源（SSOT）控制主题与导航信息；新增/调整页面时，需确保 pages 列表与实际 MDX 文件路径/slug 一致。
- 内容分层：
  - Guides（如 essentials/*）面向使用与写作规范；
  - API Reference（api-reference/*）面向接口说明与端点示例。
- 资源与品牌：logo/* 与 favicon 等静态资源由 docs.json 引用，用于品牌与导航展示。
- 预览与发布：本地通过 mintlify dev 快速迭代，远端通过 GitHub App 监听默认分支变更自动构建发布。

来自 README 的要点
- 安装与预览：npm i -g mintlify 后在根目录运行 mintlify dev。
- 故障排查：
  - 开发服务器无法启动 → 运行 mintlify install 以重新安装依赖；
  - 404 页面 → 确保在包含 docs.json 的目录内运行。
