const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function loadConfig(configPath) {
  if (fs.existsSync(configPath)) {
    try {
      return yaml.load(fs.readFileSync(configPath, 'utf8')) || {};
    } catch (e) {
      console.warn(`Warning: Failed to parse ${configPath}`);
      return {};
    }
  }
  return {};
}

function generateNavigation() {
  const docsPath = path.join(__dirname, '../docs');
  const docsJsonPath = path.join(__dirname, '../docs.json');
  
  if (!fs.existsSync(docsPath)) {
    console.error('docs directory not found');
    return;
  }

  const tabConfig = loadConfig(path.join(docsPath, 'tabs.yml'));
  const tabs = [];

  const directories = fs.readdirSync(docsPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  directories.forEach(dir => {
    const dirPath = path.join(docsPath, dir);
    const groupConfig = loadConfig(path.join(dirPath, 'groups.yml'));
    const groups = [];

    const subDirs = fs.readdirSync(dirPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    const rootFiles = fs.readdirSync(dirPath)
      .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
      .map(file => `docs/${dir}/${file.replace(/\.(md|mdx)$/, '')}`);

    if (rootFiles.length > 0) {
      groups.push({
        group: groupConfig.root || '概览',
        pages: rootFiles
      });
    }

    subDirs.forEach(subDir => {
      const subDirPath = path.join(dirPath, subDir);
      const subGroupConfig = loadConfig(path.join(subDirPath, 'groups.yml'));
      
      const files = fs.readdirSync(subDirPath)
        .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
        .map(file => `docs/${dir}/${subDir}/${file.replace(/\.(md|mdx)$/, '')}`);

      if (files.length > 0) {
        groups.push({
          group: groupConfig[subDir] || subGroupConfig[subDir] || subDir,
          pages: files
        });
      }

      // 处理子目录的子目录（如 endpoint）
      const nestedDirs = fs.readdirSync(subDirPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      nestedDirs.forEach(nestedDir => {
        const nestedDirPath = path.join(subDirPath, nestedDir);
        const nestedFiles = fs.readdirSync(nestedDirPath)
          .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
          .map(file => `docs/${dir}/${subDir}/${nestedDir}/${file.replace(/\.(md|mdx)$/, '')}`);

        if (nestedFiles.length > 0) {
          groups.push({
            group: groupConfig[nestedDir] || subGroupConfig[nestedDir] || nestedDir,
            pages: nestedFiles
          });
        }
      });
    });

    if (groups.length > 0) {
      tabs.push({
        tab: tabConfig[dir] || dir,
        groups: groups
      });
    }
  });

  const docsJson = JSON.parse(fs.readFileSync(docsJsonPath, 'utf8'));
  docsJson.navigation.tabs = tabs;

  fs.writeFileSync(docsJsonPath, JSON.stringify(docsJson, null, 2));
  console.log('Navigation updated successfully');
}

generateNavigation();