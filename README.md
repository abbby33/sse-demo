# 🌐 SSE Demo - Server-Sent Events 实时通信

一个基于 **Next.js + React + TypeScript** 的Server-Sent Events (SSE) 实时通信演示项目。

## ✨ 功能特点

- 🔄 **实时通信**: 服务器每3秒向客户端推送数据
- 📝 **多媒体支持**: 支持文本、图片、音频、视频四种类型
- 🎨 **美观界面**: 使用Tailwind CSS，不同类型内容有不同的颜色主题
- 📊 **连接状态**: 实时显示连接状态指示器
- 🛡️ **错误处理**: 完善的错误处理和自动重连机制
- ⏰ **时间戳**: 显示每个事件的接收时间

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

## 📁 项目结构

```
sse/
├── components/
│   └── SSEClient.tsx      # SSE客户端组件
├── pages/
│   ├── api/
│   │   └── stream.ts      # SSE API端点
│   ├── _app.tsx           # Next.js App组件
│   └── index.tsx          # 主页面
├── styles/
│   └── globals.css        # 全局样式
├── public/
│   ├── sample.mp3         # 示例音频文件
│   └── sample.mp4         # 示例视频文件
├── package.json
├── tailwind.config.js     # Tailwind配置
└── postcss.config.js      # PostCSS配置
```

## 🔧 技术栈

- **框架**: Next.js 14
- **前端**: React 18 + TypeScript
- **样式**: Tailwind CSS
- **实时通信**: Server-Sent Events (SSE)

## 📊 数据流

1. 客户端连接到 `/api/stream` 端点
2. 服务器建立SSE连接，发送连接确认
3. 每3秒循环发送不同类型的数据：
   - 📝 文本消息
   - 🖼️ 随机图片
   - 🎵 音频文件
   - 🎬 视频文件
4. 客户端实时接收并渲染数据

## 🎯 学习要点

- **SSE基础**: 理解Server-Sent Events的工作原理
- **实时通信**: 学习服务器推送技术
- **React Hooks**: 使用useState和useEffect管理状态
- **TypeScript**: 类型安全的开发体验
- **Next.js API**: 了解Next.js的API路由功能

## 🌟 扩展功能

- 添加用户认证
- 支持多频道/房间
- 消息持久化
- WebSocket双向通信升级
- 性能优化

## �� 许可证

MIT License 