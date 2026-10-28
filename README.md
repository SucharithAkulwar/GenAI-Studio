# GenAI Studio (Experiment 11)

A full-stack laboratory platform running all 10 Generative AI experiments with an interactive workbench, lazy model caching, automated hardware telemetry, and remote Colab GPU offloading.

---

## Architecture & Technology Stack

- **Backend**: Python 3.10+, FastAPI, Uvicorn, Pydantic, TensorFlow 2 / Keras, NumPy, Pandas, Scikit-learn, Pillow.
- **Frontend**: Plain HTML5, CSS3, Vanilla JavaScript (zero build step), served statically by FastAPI.
- **Design Philosophy**: Academic, high-contrast, cool blue-grey background (`#f8fafc` / `#090e17`), dark navy text, cobalt accent (`#1d4ed8` / `#3b82f6`), Bricolage Grotesque headings, IBM Plex Sans body, IBM Plex Mono code, accessible focus outlines, responsive sidebar, persistent light/dark mode.
- **Execution Engine**:
  - Auto-detects CUDA hardware. If unavailable, falls back to CPU with smaller models and procedural generators, displaying an active warning badge in the interface.
  - Optional `REMOTE_API_URL` proxying forwards heavy computation (Experiments 4, 6, 7, 8, 10) to remote GPU instances (e.g., Google Colab with ngrok).

---

## 10 Experiments Overview

1. **Dataset Analysis & Preprocessing**: Upload CSV or load built-in sample data. Inspect dimensions, data types, statistical summary, missing value audits, correlation matrices, and IQR outlier counts. Preprocess data (impute, encode, scale) and download cleaned CSV artifacts.
2. **TensorFlow 2 Tensor Operations**: Safe eager execution playground with whitelist-restricted primitives (constant, zeros, random, reshape, matmul, broadcasting, reduce_sum, GradientTape autograd).
3. **FLAN-T5 Question–Answer System**: Zero-shot QA using `google/flan-t5-base` (or `flan-t5-small` on CPU) with temperature, top-p nucleus sampling, and full prompt breakdown.
4. **Diffusion Text-to-Image Generation**: Synthesizes images from natural language prompts using Latent Diffusion / `stabilityai/sd-turbo` with prompt weighting, guidance scale, and direct PNG download.
5. **Variational Autoencoder (VAE) on MNIST**: TensorFlow/Keras VAE featuring live 2D latent decoder sliders `(z1, z2)`, continuous 8x8 manifold grid generation, and latent space scatter visualizer.
6. **DCGAN Face Generation on CelebA**: Transpose-convolutional deep GAN producing face grids from latent noise priors, accompanied by an epoch-by-epoch (1 to 50) convergence progression explorer.
7. **StyleGAN High-Quality Image Synthesis**: Style-based GAN demonstrating:
   - *(a) Identity Generation* from seed.
   - *(b) Style Mixing* across coarse and fine layers using AdaIN crossover thresholds.
   - *(c) Stochastic Noise Injection* controlling fine detail variation with difference heatmaps.
8. **MusicGen Foundation Audio Generation**: Generates 5–15 second novel musical compositions using `facebook/musicgen-small`, interactive waveform audio visualizer, direct `.wav` download, and optional LoRA adapter toggle.
9. **Personalized Assistant with RAG & LoRA Fine-Tuning**: Ingests PDF and TXT domain files, builds a vector index, performs dense similarity retrieval with chunk citations, and showcases side-by-side responses comparing the Base model vs. LoRA-tuned adapter.
10. **Damovilab Text-to-Video Generation**: Synthesizes spatiotemporal video sequences from text prompts using diffusion foundations, rendering directly into an embedded looping player with video download.

---

## Quickstart & Local Setup

### 1. Prerequisites
- Python 3.10 or higher.
- Git.

### 2. Installation (Windows PowerShell)
```powershell
# Navigate into genai_studio directory
cd genai_studio

# (Optional) Create and activate a virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install core dependencies
pip install -r requirements.txt
```

### 3. Installation (Linux / macOS)
```bash
cd genai_studio
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 4. Optional Heavy GPU Dependencies
To run local Transformer, Diffusion, and Audio foundation model weights on your GPU:
```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
pip install transformers diffusers accelerate peft sentence-transformers faiss-cpu
```

---

## Running the Application

Launch the FastAPI web server from the `genai_studio` root directory:
```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Open your browser at **[http://127.0.0.1:8000](http://127.0.0.1:8000)**.

---

## Configuration (`.env`)

Copy `.env.example` to `.env`:
```ini
# Force compute device: 'auto', 'cuda', or 'cpu'
DEVICE=auto

# Optional Hugging Face Token for gated repositories
HF_TOKEN=

# Optional Remote Colab/Gradio/ngrok API endpoint for heavy models (Exp 4, 6, 7, 8, 10)
REMOTE_API_URL=https://your-ngrok-tunnel.ngrok-free.app

# Max upload limit in bytes (Default: 25MB = 26214400)
MAX_UPLOAD_BYTES=26214400
```

### Offloading Heavy Experiments to Google Colab
If your local machine does not have an NVIDIA GPU:
1. Open the lab notebook (e.g., `Exe_4_ImageGeneration.ipynb` or `StyleGAN_Face_Generation2.ipynb`) in Google Colab.
2. Select a free GPU runtime (**Runtime > Change runtime type > T4 GPU**).
3. Expose the Colab notebook with ngrok:
   ```python
   !pip install pyngrok
   from pyngrok import ngrok
   tunnel = ngrok.connect(8000)
   print("Public URL:", tunnel.public_url)
   ```
4. Paste the public URL into your local `.env` file under `REMOTE_API_URL=...`.
5. GenAI Studio will automatically route Experiments 4, 6, 7, 8, and 10 to the Colab GPU.

---

## Running the Smoke Test Suite

Run all 10 experiment verification tests with pytest:
```bash
pytest tests/ -v
```
