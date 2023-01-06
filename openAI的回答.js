// 在这个代码中，你使用了一个名为 request() 的函数来发送一个 GET 请求到指定的 URL，并尝试解析返回的响应为 JSON。

// 然而，这个代码并没有正确地获取请求的响应。这是因为你使用了异步的 getXmlHttpRequest() 函数来发送请求，但是没有等待响应返回就立即返回了 request() 函数的结果。

// 为了正确地获取请求的响应，你可以使用 Promise 或 async/await 语法来处理异步操作。例如，你可以使用 async/await 语法来改写 request() 函数：

// Copy code
async function request(url) {
  const resp = await getXmlHttpRequest()({
    method: "GET",
    url,
    headers: {
      Accept: "text/xml",
      "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:67.0)"
    }
  });
  if (resp.readyState === 4 && resp.status === 200) {
    let json = JSON.parse(resp.responseText);
    return json;
  } else if (resp.readyState === 4 && resp.status === 404) {
    return console.error("error");
  }
}

let url = "www.google.com";

let result = await request(url);

console.log(result);


// 您可以使用 Node.js 来调用本地视频文件封面的一些库，如 ffmpeg。

// 在这个示例中，我们使用 screenshots 方法生成视频的截图，并指定了图像大小和保存的文件夹。

// 请注意，在使用 ffmpeg 之前，您需要安装它。您可以使用以下命令安装 ffmpeg：

// npm install fluent-ffmpeg

// 这是一个使用 ffmpeg 获取本地视频文件封面的示例：


const FfmpegCommand = require('fluent-ffmpeg');

const command = new FfmpegCommand(videoFilePath)
  .on('error', (err) => {
    console.log('An error occurred: ' + err.message);
  })
  .on('end', () => {
    console.log('Processing finished !');
  })
  .screenshots({
    // Will take screens at 20%, 40%, 60% and 80% of the video
    count: 4,
    filename: 'thumbnail-%b.png',
    folder: '/path/to/save/',
    size: '320x240'
  });

// 这是一个使用 async/await 和 node.js 获取文件夹大小的函数，文件夹可能包含多个文件或多个目录：
// 这个函数使用 fs.promises.readdir 读取目录中的文件列表，然后遍历这个列表。对于每个文件，它使用 fs.promises.lstat 获取文件的状态信息，并判断它是否是一个目录。如果是，则递归调用 getDirectorySize 来获取目录的大小。否则，它将文件的大小添加到总大小中。

// 注意：这个函数使用 async/await 语法，因此它必须在 async 函数中调用，或者使用 .then() 方法处理返回的 Promise。

const fs = require('fs');
const path = require('path');

async function getDirectorySize(dir) {
  let totalSize = 0;

  const files = await fs.promises.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = await fs.promises.lstat(filePath);

    if (stats.isDirectory()) {
      totalSize += await getDirectorySize(filePath);
    } else {
      totalSize += stats.size;
    }
  }

  return totalSize;
}

(async () => {
  const dir = '/path/to/directory';
  const size = await getDirectorySize(dir);
  console.log(`Total size of '${dir}': ${size} bytes`);
})();



