# MCPHub 文档

MCPHub 的官方中文文档仓库，基于 Mintlify 构建。MCPHub 是一个强大的 Model Context Protocol (MCP) 服务器管理平台。

## 功能特点

- **完整的中文文档** - 包含安装、配置、使用指南
- **API 参考文档** - 详细的 API 接口文档
- **开发指南** - 适合开发者的技术文档
- **多种部署方式** - Docker、npm、本地开发等

## 本地开发

安装 [Mintlify CLI](https://www.npmjs.com/package/mintlify) 来本地预览文档变更：

```bash
npm i -g mintlify
```

在文档根目录（包含 docs.json 的位置）运行以下命令：

```bash
mintlify dev
```

## 发布更新

文档会在推送到主分支后自动部署。

## 相关链接

- **MCPHub 主项目**: [GitHub](https://github.com/samanhappy/mcphub)
- **Docker 镜像**: [Docker Hub](https://hub.docker.com/r/samanhappy/mcphub)
- **社区支持**: [Discord](https://discord.gg/qMKNsn5Q)
- **赞助项目**: [Ko-fi](https://ko-fi.com/samanhappy)

## 故障排查

- **Mintlify 开发服务器无法启动** - 运行 `mintlify install` 重新安装依赖
- **页面显示 404** - 确保在包含 `docs.json` 的目录中运行命令
