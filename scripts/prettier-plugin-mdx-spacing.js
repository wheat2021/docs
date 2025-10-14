/**
 * prettier-plugin-mdx-spacing.js
 * 策略：先删除所有多余空行，再在JSX标签周围精确添加空行
 */

const { parsers: markdownParsers } = require('prettier/parser-markdown');

const JSX_TAGS = ['Tab', 'Card', 'Step', 'Accordion'];

function normalizeAndAddSpacing(text) {
  // 删除所有多余空行（保留单个换行符）
  let result = text.replace(/\n{3,}/g, '\n\n'); // 多个空行折叠为一个
  result = result.replace(/\n\n/g, '\n'); // 删除所有双换行

  // 第二步：为JSX标签前面添加空行
  JSX_TAGS.forEach((tag) => {
    const openPattern = new RegExp(`(<${tag}(?:[^>]|(?!/>))*?>)`, 'gi');
    result = result.replace(openPattern, '\n$1');
  });

  // 在markdown标题前添加空行
  result = result.replace(/^(#{1,6} .+)/gm, '\n$1');

  // 清理开头和结尾的多余空行
  result = result.trim() + '\n';
  return result;
}

module.exports = {
  parsers: {
    mdx: {
      ...markdownParsers.mdx,
      preprocess(text, options) {
        return normalizeAndAddSpacing(text);
      },
    },
    // 同时支持markdown解析器（向后兼容）
    markdown: {
      ...markdownParsers.markdown,
      preprocess(text, options) {
        return normalizeAndAddSpacing(text);
      },
    },
  },
};
