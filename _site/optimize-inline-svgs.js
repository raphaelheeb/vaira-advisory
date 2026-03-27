import fs from 'fs';
import { optimize } from 'svgo';

const filePath = './contact/index.html'; // Nur diese Datei wird optimiert

// Datei einlesen
let content = fs.readFileSync(filePath, 'utf8');

// Regex für Inline-SVGs
const svgRegex = /<svg[\s\S]*?<\/svg>/g;

// Alle SVGs finden
const matches = content.match(svgRegex);

if (!matches) {
  console.log('Keine Inline-SVGs in contact/index.html gefunden.');
  process.exit(0);
}

let updatedContent = content;

// Jede SVG einzeln optimieren
matches.forEach((svg) => {
  const optimized = optimize(svg, {
    path: filePath,
    multipass: true,
    configFile: '.svgo.yml'
  });

  updatedContent = updatedContent.replace(svg, optimized.data);
});

// Datei überschreiben
fs.writeFileSync(filePath, updatedContent, 'utf8');

console.log('Inline-SVGs in contact/index.html wurden optimiert.');
