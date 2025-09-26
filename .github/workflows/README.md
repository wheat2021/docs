# 工作流说明

本仓库使用三个工作流来管理文档聚合和导航生成：

## 1. main-to-docs.yml
- **触发条件**: main分支有新提交
- **功能**: 将main分支的新提交cherry-pick到docs分支
- **目的**: 保持docs分支与main分支同步

## 2. docs-navigation.yml  
- **触发条件**: docs分支有新提交 或 接收到repository_dispatch
- **功能**: 执行scripts/generate-navigation.js生成导航
- **目的**: 自动更新docs.json中的导航结构

## 3. aggregate-docs.yml
- **触发条件**: 接收到repository_dispatch (subdocs-updated)
- **功能**: 聚合外部仓库文档到docs分支
- **目的**: 将其他仓库的文档整合到统一站点

## 工作流程

1. **本仓库更新**: main分支提交 → main-to-docs.yml → docs分支更新 → docs-navigation.yml → 导航更新
2. **外部仓库更新**: 外部仓库推送 → repository_dispatch → aggregate-docs.yml → docs分支更新 → docs-navigation.yml → 导航更新

这样确保无论是本仓库还是外部仓库的文档更新，都会自动触发导航重新生成。