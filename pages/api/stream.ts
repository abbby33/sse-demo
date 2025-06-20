import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 设置SSE响应头
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Cache-Control");

  // 发送数据的辅助函数
  const send = (data: any) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // 发送初始连接确认
  res.write(`data: ${JSON.stringify({ type: "connection", content: "Connected to SSE stream" })}\n\n`);

  let count = 0;
  const interval = setInterval(() => {
    const types = ["text", "image", "audio", "video"];
    const type = types[count % types.length];
    
    let content = "";
    switch (type) {
      case "text":
        content = `📝 Dynamic text message #${count + 1} - ${new Date().toLocaleTimeString()}`;
        break;
      case "image":
        content = `https://picsum.photos/200/200?random=${count}`;
        break;
      case "audio":
        content = "/sample.mp3";
        break;
      case "video":
        content = "/sample.mp4";
        break;
    }

    const payload = {
      type,
      content,
      timestamp: new Date().toISOString()
    };
    
    send(payload);
    count++;
  }, 3000);

  // 处理客户端断开连接
  req.on("close", () => {
    clearInterval(interval);
    res.end();
  });

  req.on("error", () => {
    clearInterval(interval);
    res.end();
  });
}
