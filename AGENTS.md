<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Workflow

## Development
- Trabajar en `/home/javier/colombia-rentals` (ext4, symlinks funciona)
- `npm run dev` / `npm run build` desde ahí

## Sync + Git Push
El disco USB está en vfat (no soporta symlinks). Para sincronizar:
```bash
# Sincroniza código fuente al USB (excluye node_modules, .next, .git)
./sync-to-usb.sh

# Luego en el USB:
cd "/media/javier/BACKUP MACB/Desarrollos/OpenCode/colombia-rentals"
git add -A && git commit -m "mensaje" && git push
```

## Notas
- Vercel conectado vía `.vercel/project.json` (org: team_tOn7kIFRpop7iSU6DspzgHmC)
- GitHub: git@github.com:Jasvisual/colombia-rentals.git
- Remote ya configurado como SSH en ambos repos
