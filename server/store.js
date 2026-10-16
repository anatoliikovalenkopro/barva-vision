import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dir = process.env.DATA_DIR || path.join(here, "data");
const file = path.join(dir, "enquiries.json");

function load() {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return [];
  }
}

function save(list) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, JSON.stringify(list, null, 2));
}

export function addEnquiry(data, source) {
  const list = load();
  const record = {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    source,
    ...data,
    analysis: null,
  };
  list.unshift(record);
  save(list);
  return record;
}

export function updateEnquiry(id, patch) {
  const list = load();
  const i = list.findIndex((e) => e.id === id);
  if (i === -1) return null;
  list[i] = { ...list[i], ...patch };
  save(list);
  return list[i];
}

export function listEnquiries() {
  return load();
}
