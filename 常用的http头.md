> 缓存相关

200 304

优先强缓存(expires cache-control) 命中成功，200
不命中 协商缓存(Last-Modified ETag) 命中成功 304
不命中 200 重新下载并缓存

> httpRange 断点续传

206 416 412

- 1.判断服务器支不支持 Range 头
- 2.发送 Range: bytes=0-0，判断数据大小，如果为 0，则支持。并储存 etag http 头。
- 3.设置 content-type 类型 ArrayBuffer，bytes 大小，和 If-Match：etag，判断文件是否更新，分割下载。
- 4.用多段 ArrayBuffer 合并 Blob。
- 5.用 URL.createObjectURL 创建链接下载

```
 var a = document.createElement('a');
        var url = window.URL.createObjectURL(blob);
        var filename = 'dd_3.4.8.exe';
        a.href = url;
        a.download = filename;
        a.click();
```

> 更新丢失问题

412 [If-Match](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/If-Match)
