# 在线文件下载并压缩

```js
const files = [{ url: '', filename: '' }];

fetchAndZipFiles({
  files, // 文件
  zipName: ``,
  onProgress: (progress) => {
    // 下载进度
  },
  onError: (error) => {
    // 下载失败
  },
  onSuccess: () => {
    // 下载成功
  },
});
```

```js
import { zipSync } from 'fflate';
import { saveAs } from 'file-saver';

/**
 * 压缩文件并下载
 * @param opts
 * @param {string} opts.zipName - 压缩包名称
 * @param {Array<{ url: string; filename: string }>} opts.files - 文件列表
 * @param {() => void} [opts.onSuccess] - 下载成功的回调
 * @param {(v: number) => void} [opts.onProgress] - 下载进度的回调
 * @param {(error: Error) => void} [opts.onError] - 下载出错的回调
 */
export const fetchAndZipFiles = async (opts: {
  zipName: string,
  files: Array<{ url: string, filename: string }>,
  onSuccess?: () => void,
  onProgress?: (v: number) => void,
  onError?: (error: Error) => void,
}) => {
  const { zipName, files, onProgress, onError, onSuccess } = opts;
  onProgress?.(5);

  const zipFiles: Record<string, Uint8Array> = {};
  const totalFiles = files.length;

  let downloadedFiles = 0;

  try {
    for (const file of files) {
      if (!file.filename) {
        throw new Error('File name is missing');
      }

      const response = await fetch(file.url);

      if (!response.ok) {
        throw new Error(`Failed to fetch ${file.url}: ${response.statusText}`);
      }

      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();
      zipFiles[file.filename] = new Uint8Array(arrayBuffer);

      downloadedFiles += 1;
      // -- 更新进度以反映基于文件数量的总进度的90%
      onProgress?.(5 + Math.round((downloadedFiles / totalFiles) * 90));
    }

    setTimeout(() => {
      const zipData = zipSync(zipFiles);
      const zipBlob = new Blob([zipData], { type: 'application/zip' });

      saveAs(zipBlob, `${zipName}.zip`);

      // -- 保存文件后，将进度设置为100%
      onProgress?.(100);
      onSuccess?.();
    }, 500);
  } catch (error) {
    onError?.(error);
  }
};
```
