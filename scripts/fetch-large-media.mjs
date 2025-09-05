import fs from 'fs'
import { mkdir, stat } from 'fs/promises'
import path from 'path'
import { pipeline } from 'stream/promises'

const FILE_PATH = path.resolve('public/videos/hero/hero-video.mp4')
const RAW_URL = 'https://raw.githubusercontent.com/binsey012/adv-juansiksty-nation-v1/main/public/videos/hero/hero-video.mp4'
const MIN_BYTES = 1_000_000 // 1MB threshold to consider the file present

async function existsAndLarge(p) {
  try {
    const s = await stat(p)
    return s.isFile() && s.size >= MIN_BYTES
  } catch {
    return false
  }
}

async function ensureDirFor(filePath) {
  await mkdir(path.dirname(filePath), { recursive: true })
}

async function download(url, dest) {
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok || !res.body) throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`)
  await ensureDirFor(dest)
  await pipeline(res.body, fs.createWriteStream(dest))
}

;(async () => {
  const present = await existsAndLarge(FILE_PATH)
  if (present) {
    console.log('[prebuild] hero video present, skipping download')
    return
  }
  console.log('[prebuild] fetching hero video from GitHub Raw...')
  await download(RAW_URL, FILE_PATH)
  console.log('[prebuild] hero video downloaded')
})().catch(err => {
  console.warn('[prebuild] warning: could not fetch hero video:', err.message)
  // Do not fail the build; site can still deploy with image fallback
})
