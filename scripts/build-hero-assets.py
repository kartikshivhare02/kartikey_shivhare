import os
import sys
import subprocess
import imageio_ffmpeg
import numpy as np
import cv2
import shutil

FFMPEG_EXE = imageio_ffmpeg.get_ffmpeg_exe()

def run_cmd(cmd):
    print("Running:", " ".join(cmd))
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print("Error:", res.stderr)
        raise RuntimeError(f"Command failed with code {res.returncode}")

def build_hero_assets():
    input_video = "intro.mp4"
    if not os.path.exists(input_video):
        print(f"Error: {input_video} not found")
        sys.exit(1)

    os.makedirs("public/hero", exist_ok=True)

    # 1. Process Audio with numpy sample-accurate crossfade
    print("Processing audio with numpy crossfade...")
    pcm_cmd = [FFMPEG_EXE, '-y', '-i', input_video, '-f', 's16le', '-ac', '2', '-ar', '48000', '-']
    p = subprocess.Popen(pcm_cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    raw_audio, _ = p.communicate()

    sr = 48000
    audio_data = np.frombuffer(raw_audio, dtype=np.int16).reshape(-1, 2)
    
    # 10s audio duration
    total_samples = 10 * sr
    audio_10s = audio_data[:total_samples].copy()

    # 0.5s crossfade
    fade_samples = int(0.5 * sr)
    main_samples = total_samples - fade_samples

    tail = audio_10s[main_samples:total_samples].astype(np.float32)
    head = audio_10s[0:fade_samples].astype(np.float32)
    body = audio_10s[fade_samples:main_samples]

    alpha = np.linspace(0, 1, fade_samples)[:, None]
    fade_head = tail * (1 - alpha) + head * alpha
    looped_audio = np.concatenate([fade_head.astype(np.int16), body])

    temp_wav = "temp_looped_audio.wav"
    # Write WAV header + PCM
    header = bytearray()
    header.extend(b'RIFF')
    data_size = len(looped_audio.tobytes())
    header.extend((data_size + 36).to_bytes(4, 'little'))
    header.extend(b'WAVEfmt ')
    header.extend((16).to_bytes(4, 'little')) # Subchunk1Size
    header.extend((1).to_bytes(2, 'little'))  # AudioFormat PCM
    header.extend((2).to_bytes(2, 'little'))  # NumChannels
    header.extend((sr).to_bytes(4, 'little')) # SampleRate
    header.extend((sr * 2 * 2).to_bytes(4, 'little')) # ByteRate
    header.extend((4).to_bytes(2, 'little'))  # BlockAlign
    header.extend((16).to_bytes(2, 'little')) # BitsPerSample
    header.extend(b'data')
    header.extend(data_size.to_bytes(4, 'little'))
    
    with open(temp_wav, 'wb') as f:
        f.write(header)
        f.write(looped_audio.tobytes())

    print("Audio WAV saved.")

    # 2. Render Hero Video MP4 & WebM with xfade video + custom audio
    vf = (
        '[0:v]crop=576:720:352:0,scale=768:960,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98,fps=24,settb=AVTB[v0];'
        '[v0]split[v_main][v_tail];'
        '[v_main]trim=0:9.5,setpts=PTS-STARTPTS,fps=24,settb=AVTB[v_start];'
        '[v_tail]trim=9.5:10,setpts=PTS-STARTPTS,fps=24,settb=AVTB[v_end];'
        '[v_end][v_start]xfade=transition=fade:duration=0.5:offset=0[v_out]'
    )

    mp4_cmd = [
        FFMPEG_EXE, '-y',
        '-i', input_video,
        '-i', temp_wav,
        '-filter_complex', vf,
        '-map', '[v_out]',
        '-map', '1:a',
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-crf', '24',
        '-preset', 'slow',
        '-c:a', 'aac',
        '-b:a', '96k',
        '-movflags', '+faststart',
        'public/hero/hero.mp4'
    ]
    run_cmd(mp4_cmd)

    webm_cmd = [
        FFMPEG_EXE, '-y',
        '-i', input_video,
        '-i', temp_wav,
        '-filter_complex', vf,
        '-map', '[v_out]',
        '-map', '1:a',
        '-c:v', 'libvpx-vp9',
        '-crf', '36',
        '-b:v', '0',
        '-c:a', 'libopus',
        '-b:a', '80k',
        'public/hero/hero.webm'
    ]
    run_cmd(webm_cmd)

    if os.path.exists(temp_wav):
        os.remove(temp_wav)

    # 3. Export portrait still (portrait-bust.webp) at 480x600 & og.jpg at 1200x630
    print("Generating stills...")
    cap = cv2.VideoCapture("public/hero/hero.mp4")
    ret, frame = cap.read()
    if ret:
        # Bust crop: 480x600 from 768x960 frame
        bust_w, bust_h = 480, 600
        x_start = (768 - bust_w) // 2
        y_start = 60 # Head to shirt crop
        bust_crop = frame[y_start:y_start+bust_h, x_start:x_start+bust_w]
        cv2.imwrite("public/portrait-bust.webp", bust_crop, [cv2.IMWRITE_WEBP_QUALITY, 90])
        
        # og.jpg 1200x630 with #f4f2ee paper background
        og_bg = np.ones((630, 1200, 3), dtype=np.uint8)
        og_bg[:, :] = np.array([238, 242, 244], dtype=np.uint8) # BGR for #f4f2ee
        
        scaled_frame = cv2.resize(frame, (504, 630))
        og_bg[0:630, 80:584] = scaled_frame
        
        # Typography on right
        cv2.putText(og_bg, "KARTIKEY SHIVHARE", (620, 280), cv2.FONT_HERSHEY_SIMPLEX, 1.3, (13, 13, 13), 3, cv2.LINE_AA)
        cv2.putText(og_bg, "Data Science & AI | Web Solutions", (620, 340), cv2.FONT_HERSHEY_SIMPLEX, 0.85, (119, 117, 117), 2, cv2.LINE_AA)
        cv2.putText(og_bg, "Indore, India", (620, 390), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (169, 166, 160), 2, cv2.LINE_AA)
        
        cv2.imwrite("public/og.jpg", og_bg, [cv2.IMWRITE_JPEG_QUALITY, 90])
    cap.release()

    # Copy resume.pdf to public/
    if os.path.exists("resume.pdf"):
        shutil.copy("resume.pdf", "public/resume.pdf")
        print("Copied resume.pdf to public/resume.pdf")

    print("All hero assets built successfully!")

if __name__ == "__main__":
    build_hero_assets()
