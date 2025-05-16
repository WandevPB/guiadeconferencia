import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtém o diretório atual do módulo ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lê o arquivo index.html
const indexPath = path.resolve(__dirname, 'dist/index.html');
let htmlContent = fs.readFileSync(indexPath, 'utf8');

// Substitui caminhos absolutos por caminhos relativos
htmlContent = htmlContent.replace(/src="\/assets\//g, 'src="./assets/');
htmlContent = htmlContent.replace(/href="\/assets\//g, 'href="./assets/');

// Escreve o arquivo modificado
fs.writeFileSync(indexPath, htmlContent);

console.log('Caminhos de assets corrigidos com sucesso no index.html!'); 