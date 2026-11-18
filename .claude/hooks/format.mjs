// Hook Claude Code : formate avec Prettier chaque fichier modifié par un agent,
// pour que tous les modèles produisent exactement le même style de code.
import { execFileSync } from 'node:child_process'

let input = ''
for await (const chunk of process.stdin) input += chunk

const file = JSON.parse(input || '{}').tool_input?.file_path
if (file && /\.(jsx?|css|html|json|md)$/.test(file) && !file.includes('node_modules')) {
  try {
    execFileSync('npx', ['prettier', '--write', '--ignore-unknown', file], { stdio: 'ignore' })
  } catch {
    // Fichier non formatable (erreur de syntaxe…) : le lint le signalera.
  }
}
