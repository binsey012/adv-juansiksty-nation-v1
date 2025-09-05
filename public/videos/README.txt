# Put your hero videos here

- Recommended: MP4 (H.264 + AAC) for broad compatibility.
- Filename example: intro.mp4
- Keep size reasonable (<10–15MB) for faster loads.

How to enable in site.json:
{
  "hero": {
    "image": "/images/hero/herobgadv.jpg",
    "video": { "src": "/videos/hero/intro.mp4" }
  }
}

Notes:
- Browsers block autoplay with sound. This hero uses a Play with sound button to start audio.
- On mobile, the video plays inline (no full-screen) using playsInline.
- The hero text tile uses the hero image as its background for readability.
