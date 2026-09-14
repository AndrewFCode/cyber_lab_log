---
title: FFmpeg
description: Commands I always forget
tags: [ffmpeg, video, cli]
updated: 2026-09-05
category: media
---

FFmpeg's flag order matters: options before `-i` apply to the input, options after apply to the
output. Most of my mistakes with it come from forgetting that.

## Trimming and cutting

```bash
# copy streams, no re-encode — fast but cuts on the nearest keyframe
ffmpeg -ss 00:01:30 -to 00:02:00 -i in.mp4 -c copy out.mp4

# re-encode for a frame-accurate cut
ffmpeg -ss 00:01:30 -to 00:02:00 -i in.mp4 -c:v libx264 -crf 18 out.mp4
```

Putting `-ss` before `-i` makes FFmpeg seek instead of decoding everything up to that point.
It is dramatically faster and worth the keyframe imprecision when combined with `-c copy`.

## Converting

```bash
ffmpeg -i in.mov -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k out.mp4
ffmpeg -i in.mp4 -vn -c:a libmp3lame -q:a 2 out.mp3   # audio only
ffmpeg -i in.mp4 -an out-silent.mp4                    # strip audio
```

`-crf` is the quality knob for x264: lower is better, 18 is visually lossless-ish, 23 is the
default, 28 is noticeably soft. `-preset` trades encoding time for file size, not quality.

## Resizing and cropping

```bash
ffmpeg -i in.mp4 -vf "scale=1280:-2" out.mp4        # -2 keeps the aspect ratio, even-numbered
ffmpeg -i in.mp4 -vf "crop=1080:1080:420:0" out.mp4 # w:h:x:y
```

Use `-2` rather than `-1` for the auto dimension — x264 requires even dimensions and `-1` will
happily produce an odd number and fail.

## Inspecting a file

```bash
ffprobe -hide_banner in.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 in.mp4
```

## Things that bite

| Symptom | Cause |
| --- | --- |
| Output is silent | Source audio is in a codec the container rejects; add `-c:a aac` |
| "Height not divisible by 2" | Scaling with `-1`; use `-2` |
| Cut starts early | `-c copy` snapped to a keyframe; re-encode for accuracy |
| Huge output file | No `-crf` set, so a default bitrate was used |
