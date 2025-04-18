/*
 * @Author: along
 * @Description:
 * @Date: 2023-06-05 20:05:04
 * @LastEditors: along
 * @LastEditTime: 2025-04-18 09:21:56
 * @FilePath: /TextNook/vite.config.js
 */

import { defineConfig } from 'vite';
// import Vue from '@vitejs/plugin-vue'
// import Markdown from 'vite-plugin-vue-markdown'
// import MarkdownPreview from 'vite-plugin-markdown-preview'

const config = defineConfig({
  server: {
    hmr: {
      overlay: false,
    },
  },
  server: {
    host: 8889,
    open: true,
  },
});

export default config;
