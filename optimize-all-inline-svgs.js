import fs from 'fs';
import path from 'path';
import { optimize } from 'svgo';

const rootDir = './';

// Alle HTML-Dateien rekursiv finden
function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules' && file !== '_site') {
        results = results.concat(getHtmlFiles(filePath));
      }
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });

  return results;
}

// Inline-SVGs optimieren
function optimizeInlineSVGs(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  const svgRegex = /<svg[\s\S]*?<\/svg>/g;
  const matches = content.match(svgRegex);

  if (!matches) {
    console.log(`Keine Inline-SVGs in: ${filePath}`);
    return;
  }

  // Backup erstellen
  const backupPath = filePath + '.bak';
  fs.writeFileSync(backupPath, content, 'utf8');

  let updatedContent = content;

  matches.forEach((svg) => {
    const optimized = optimize(svg, {
      path: filePath,
      multipass: true,
      configFile: '.svgo.yml'
    });

    updatedContent = updatedContent.replace(svg, optimized.data);
  });

  fs.writeFileSync(filePath, updatedContent, 'utf8');
  console.log(`Optimiert: ${filePath} (${matches.length} SVGs)`);
}

// Ausführen
const htmlFiles = getHtmlFiles(rootDir);
htmlFiles.forEach(optimizeInlineSVGs);

console.log('Alle Inline-SVGs wurden optimiert.');
