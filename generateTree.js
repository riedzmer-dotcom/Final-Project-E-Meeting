// ======================================================
// 📁 generateTree.js — Minimal Clean Project Tree (PowerShell Safe)
// ======================================================

import { exec } from "child_process";
import { writeFileSync, readdirSync, statSync } from "fs";
import path from "path";

// ======================================================
// 🚫 Folder & File yang diabaikan
// ======================================================
const ignoreList = [
  "node_modules",
  "dist",
  "backupdoc",
  ".git",
  "vite",
  "vite-temp",
  "@babel",
  "@tailwindcss",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "bun.lockb",
  "vite.config.js",
  ".env",
  ".env.local",
  "src-structure.txt",
  "struktur.txt",
  "folder-structure.txt"
];

// ======================================================
// 🧠 Fungsi untuk generate tree manual (tanpa 'tree' command)
// ======================================================
function generateTree(dir, prefix = "", level = 0, maxDepth = 2) {
  if (level > maxDepth) return "";

  const items = readdirSync(dir).filter(
    (item) => !ignoreList.some((ignore) => item.includes(ignore))
  );

  let tree = "";
  items.forEach((item, i) => {
    const fullPath = path.join(dir, item);
    const stats = statSync(fullPath);
    const isLast = i === items.length - 1;
    const connector = isLast ? "└── " : "├── ";
    tree += `${prefix}${connector}${item}\n`;

    if (stats.isDirectory()) {
      const nextPrefix = prefix + (isLast ? "    " : "│   ");
      tree += generateTree(fullPath, nextPrefix, level + 1, maxDepth);
    }
  });

  return tree;
}

// ======================================================
// 🚀 Jalankan dan simpan hasil
// ======================================================
console.log("📂 Membuat struktur folder (Minimal Clean Mode)...");

const projectRoot = process.cwd();
const now = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });

const header = `
===============================================
📦 Struktur Folder Project (Minimal Clean)
🕒 Diperbarui: ${now}
===============================================

`;

const output = header + path.basename(projectRoot) + "\n" + generateTree(projectRoot);
writeFileSync("folder-structure.txt", output);

console.log("✅ Struktur folder berhasil disimpan ke folder-structure.txt");
