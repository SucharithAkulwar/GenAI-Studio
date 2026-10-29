/**
 * GenAI Studio — Client Application
 * Academic Vanilla JS Architecture (No build step)
 */

(function () {
  'use strict';

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  const FALLBACK_EXP_METADATA = {
  "1": {
    "id": 1,
    "title": "Comprehensive Dataset Analysis and Preprocessing for Generative AI using Python Libraries",
    "aim": "Understand, explore, preprocess and analyze any dataset like a data scientist using NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn, TensorFlow, Keras, PyTorch and LangChain, and prepare high-quality datasets for Generative AI and ML.",
    "tags": [
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "Scikit-learn",
      "Data Preprocessing"
    ],
    "pipeline": [
      "1. Ingestion: Load raw tabular dataset (CSV) into Pandas DataFrame",
      "2. Structural Profiling: Inspect dimensions, data types, and head snapshot",
      "3. Statistical Summary: Calculate central tendency, dispersion, quartiles, and IQR outliers",
      "4. Quality Audit: Identify missing values, duplicate records, and high-correlation features",
      "5. Preprocessing & Transformation: Imputation, categorical encoding, scaling, and train/test partition",
      "6. Export: Download AI-ready dataset artifact for GenAI/ML downstream training"
    ],
    "code_snippet": "import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.model_selection import train_test_split\n\n# 1. Load and inspect\ndf = pd.read_csv('dataset.csv')\nprint(df.info(), df.describe())\n\n# 2. IQR Outlier Detection\nQ1 = df['val'].quantile(0.25)\nQ3 = df['val'].quantile(0.75)\nIQR = Q3 - Q1\noutliers = df[(df['val'] < Q1 - 1.5 * IQR) | (df['val'] > Q3 + 1.5 * IQR)]\n\n# 3. Imputation and Scaling\ndf.fillna(df.median(numeric_only=True), inplace=True)\nscaler = StandardScaler()\ndf[numeric_cols] = scaler.fit_transform(df[numeric_cols])\n\n# 4. Partition\ntrain_df, test_df = train_test_split(df, test_size=0.2, random_state=42)",
    "notebook": {
      "filename": "GenAI_Experiment_01.ipynb",
      "notebook_url": "https://github.com/SucharithAkulwar/GenAI-Studio/tree/main/notebooks/GenAI_Experiment_01.ipynb"
    }
  },
  "2": {
    "id": 2,
    "title": "Basic Python Operations and TensorFlow 2 Tensor Operations for Generative AI Applications",
    "aim": "Understand and implement basic Python operations and TensorFlow 2 tensor operations to build a foundation for generative AI.",
    "tags": [
      "TensorFlow 2",
      "Tensors",
      "Matrix Operations",
      "GradientTape",
      "Autograd"
    ],
    "pipeline": [
      "1. Operation Selection: Pick from whitelist of tensor primitives (constant, zeros, random, reshape, etc.)",
      "2. Parameter Validation: Sanitize dimensions, shapes, and input data without code execution",
      "3. Computation Graph: Execute operation through TensorFlow 2 eager execution runtime",
      "4. Autograd Tracking: Use tf.GradientTape to record automatic differentiation and derivatives",
      "5. Inspection & Telemetry: Return shapes, rank, dtype, and visual step breakdown"
    ],
    "code_snippet": "import tensorflow as tf\n\n# 1. Tensors and Shapes\nt = tf.random.normal([2, 3], mean=0.0, stddev=1.0)\nprint(t.shape, t.dtype)\n\n# 2. Matrix Multiplication\nA = tf.constant([[1.0, 2.0], [3.0, 4.0]])\nB = tf.constant([[5.0, 6.0], [7.0, 8.0]])\nC = tf.matmul(A, B)\n\n# 3. Automatic Differentiation with GradientTape\nx = tf.Variable(3.0)\nwith tf.GradientTape() as tape:\n    y = x**2 + 3.0*x + 5.0\ndy_dx = tape.gradient(y, x) # Result: 2*(3) + 3 = 9.0",
    "notebook": {
      "filename": "GenAI_Experiment_02.ipynb",
      "notebook_url": "https://github.com/SucharithAkulwar/GenAI-Studio/tree/main/notebooks/GenAI_Experiment_02.ipynb"
    }
  },
  "3": {
    "id": 3,
    "title": "Text Generation using a Pre-trained Transformer Model for a Question\u2013Answer System",
    "aim": "Implement a text-generation Question\u2013Answer system using a pre-trained Transformer and generate answers to user questions.",
    "tags": [
      "Transformers",
      "FLAN-T5",
      "Seq2Seq",
      "Prompt Engineering",
      "NLP"
    ],
    "pipeline": [
      "1. Input Structuring: Format user question and optional background context into prompt template",
      "2. Tokenization: Convert text into subword token IDs using T5Tokenizer",
      "3. Transformer Forward Pass: Pass encoder-decoder representations through self-attention layers",
      "4. Decoding: Autoregressively sample tokens with temperature and top-p nucleus thresholds",
      "5. Output Formatting: Detokenize and present final generated answer with prompt breakdown"
    ],
    "code_snippet": "from transformers import AutoTokenizer, AutoModelForSeq2SeqLM\n\n# 1. Load model lazily\nmodel_name = \"google/flan-t5-base\"\ntokenizer = AutoTokenizer.from_pretrained(model_name)\nmodel = AutoModelForSeq2SeqLM.from_pretrained(model_name)\n\n# 2. Formulate Prompt\nprompt = \"Context: Generative AI produces synthetic artifacts.\nQuestion: What does GenAI do?\nAnswer:\"\ninputs = tokenizer(prompt, return_tensors=\"pt\")\n\n# 3. Generate Answer\noutputs = model.generate(**inputs, max_new_tokens=100, temperature=0.7, top_p=0.9)\nprint(tokenizer.decode(outputs[0], skip_special_tokens=True))",
    "notebook": {
      "filename": "GenAI_Experiment_03.ipynb",
      "notebook_url": "https://github.com/SucharithAkulwar/GenAI-Studio/tree/main/notebooks/GenAI_Experiment_03.ipynb"
    }
  },
  "4": {
    "id": 4,
    "title": "Text-to-Image Generation using a Pre-trained Diffusion Model",
    "aim": "Generate images from natural-language prompts using a pre-trained diffusion model.",
    "tags": [
      "Diffusers",
      "Stable Diffusion",
      "SD-Turbo",
      "Latent Diffusion",
      "Text-to-Image"
    ],
    "pipeline": [
      "1. Conditioning: Text prompt encoded via CLIP/OpenCLIP text encoder into continuous embeddings",
      "2. Latent Initialization: Random Gaussian noise latents sampled from prior distribution",
      "3. Iterative Denoising: UNet predicts noise residual across timesteps guided by classifier-free guidance",
      "4. Autoencoder Decoding: VAE decoder maps denoised latent representation back to pixel space",
      "5. Delivery: Save generated image artifact with instant download link"
    ],
    "code_snippet": "from diffusers import AutoPipelineForText2Image\nimport torch\n\n# 1. Pipeline initialization\npipe = AutoPipelineForText2Image.from_pretrained(\n    \"stabilityai/sd-turbo\",\n    torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32\n)\nif torch.cuda.is_available():\n    pipe.to(\"cuda\")\n\n# 2. Generation with CFG & Seed\nprompt = \"A high-tech laboratory with glowing neural holographic displays\"\nimage = pipe(prompt=prompt, num_inference_steps=20, guidance_scale=7.5).images[0]\nimage.save(\"output.png\")",
    "notebook": {
      "filename": "GenAI_Experiment_04.ipynb",
      "notebook_url": "https://github.com/SucharithAkulwar/GenAI-Studio/tree/main/notebooks/GenAI_Experiment_04.ipynb"
    }
  },
  "5": {
    "id": 5,
    "title": "Variational Autoencoder (VAE) on MNIST for New Image Generation",
    "aim": "Implement a VAE with TensorFlow/Keras, train it on MNIST, and generate new MNIST-like images using the learned latent space and trained decoder.",
    "tags": [
      "TensorFlow",
      "Keras",
      "VAE",
      "Latent Space",
      "Reparameterization Trick"
    ],
    "pipeline": [
      "1. Probabilistic Encoder: Maps 28x28 digit into mean (z_mean) and log-variance (z_log_var)",
      "2. Reparameterization Trick: Samples latent vectors z = z_mean + exp(0.5 * z_log_var) * eps",
      "3. Loss Formulation: Reconstruction loss (Binary Cross-Entropy) + KL Divergence regularizer",
      "4. Decoder Synthesis: Maps 2D latent points back to reconstructed 28x28 digit images",
      "5. Interactive Latent Exploration: Decodes custom coordinates (z1, z2) live"
    ],
    "code_snippet": "import tensorflow as tf\nfrom tensorflow.keras import layers, Model\n\n# 1. Reparameterization sampling\ndef sample_z(args):\n    z_mean, z_log_var = args\n    eps = tf.random.normal(shape=tf.shape(z_mean))\n    return z_mean + tf.exp(0.5 * z_log_var) * eps\n\n# 2. VAE Loss = Reconstruction + KL Divergence\nkl_loss = -0.5 * tf.reduce_mean(1 + z_log_var - tf.square(z_mean) - tf.exp(z_log_var))\nvae.add_loss(kl_loss)",
    "notebook": {
      "filename": "GenAI_Experiment_05.ipynb",
      "notebook_url": "https://github.com/SucharithAkulwar/GenAI-Studio/tree/main/notebooks/GenAI_Experiment_05.ipynb"
    }
  },
  "6": {
    "id": 6,
    "title": "Implementation of GANs (DCGAN) on CelebA Dataset",
    "aim": "Implement a Deep Convolutional GAN on the CelebA dataset.",
    "tags": [
      "DCGAN",
      "CelebA",
      "Adversarial Training",
      "Conv2DTranspose",
      "BatchNormalization"
    ],
    "pipeline": [
      "1. Prior Sampling: Sample latent vector z from standard Gaussian N(0, I)",
      "2. Generator Synthesis: Project and upsample latent code through transposed convolutions & BatchNorm",
      "3. Discriminator Evaluation: Strided convolutions classify synthetic vs real CelebA faces",
      "4. Minimax Adversarial Optimization: Binary cross entropy loss updates G and D alternately",
      "5. Progression Tracking: Review epoch-by-epoch loss convergence and synthesized face grids"
    ],
    "code_snippet": "from tensorflow.keras import layers, models\n\n# 1. Generator Model\ndef make_generator_model():\n    model = models.Sequential([\n        layers.Dense(8*8*256, use_bias=False, input_shape=(100,)),\n        layers.BatchNormalization(),\n        layers.LeakyReLU(0.2),\n        layers.Reshape((8, 8, 256)),\n        layers.Conv2DTranspose(128, 5, strides=2, padding='same', use_bias=False),\n        layers.BatchNormalization(),\n        layers.LeakyReLU(0.2),\n        layers.Conv2DTranspose(64, 5, strides=2, padding='same', use_bias=False),\n        layers.BatchNormalization(),\n        layers.LeakyReLU(0.2),\n        layers.Conv2DTranspose(3, 5, strides=2, padding='same', activation='tanh')\n    ])\n    return model",
    "notebook": {
      "filename": "GenAI_Experiment_06.ipynb",
      "notebook_url": "https://github.com/SucharithAkulwar/GenAI-Studio/tree/main/notebooks/GenAI_Experiment_06.ipynb"
    }
  },
  "7": {
    "id": 7,
    "title": "Implementation of StyleGANs for Generating High-Quality Images",
    "aim": "Implement a Style-based GAN for generating high-quality and diverse human face images using CelebA, and demonstrate explicit control over generation through a learned intermediate latent space: coarse-to-fine style control, style mixing between two identities, and stochastic detail variation using noise injection.",
    "tags": [
      "StyleGAN",
      "AdaIN",
      "Latent Space W",
      "Style Mixing",
      "Noise Injection"
    ],
    "pipeline": [
      "1. Mapping Network: 8-layer MLP maps latent z in Z to disentangled intermediate latent w in W",
      "2. Synthesis Network: Progressive resolution generator starting from learned constant 4x4 tensor",
      "3. Adaptive Instance Normalization (AdaIN): Modulates feature channels using scale and bias from w",
      "4. Style Mixing: Injects latent w1 at coarse layers and w2 at fine layers to combine identities",
      "5. Stochastic Noise Injection: Adds per-pixel Gaussian noise to control fine stochastic details (freckles, curls)"
    ],
    "code_snippet": "# AdaIN Formulation\ndef AdaIN(x, y):\n    mean_x = tf.reduce_mean(x, axis=[1, 2], keepdims=True)\n    std_x = tf.math.reduce_std(x, axis=[1, 2], keepdims=True)\n    norm = (x - mean_x) / (std_x + 1e-8)\n    # y provides scale (ys) and bias (yb) learned from latent w\n    return ys * norm + yb",
    "notebook": {
      "filename": "GenAI_Experiment_07.ipynb",
      "notebook_url": "https://github.com/SucharithAkulwar/GenAI-Studio/tree/main/notebooks/GenAI_Experiment_07.ipynb"
    }
  },
  "8": {
    "id": 8,
    "title": "Generation of Novel Music Compositions using a Pretrained Open-Source Foundation Model (MusicGen)",
    "aim": "Use a pretrained, open-source Transformer-based foundation model (MusicGen) to generate novel music directly from text prompts, without dataset collection or training, and save and play the generated audio.",
    "tags": [
      "MusicGen",
      "AudioCraft",
      "Residual Vector Quantization",
      "Audio Transformer",
      "Text-to-Audio"
    ],
    "pipeline": [
      "1. Conditioning: Text description encoded into conditioning tokens via T5 text encoder",
      "2. Autoregressive Codebook Modeling: Transformer predicts discrete acoustic codebook indices",
      "3. Residual Vector Quantization (RVQ): Multi-stage codebook quantizes continuous spectrogram bands",
      "4. Neural Audio Decoder: EnCodec neural vocoder synthesizes high-fidelity 32kHz waveform from codes",
      "5. Playback & Export: Render in HTML audio player, visualize waveform, and offer direct WAV download"
    ],
    "code_snippet": "from transformers import AutoProcessor, MusicgenForConditionalGeneration\nimport scipy.io.wavfile\n\n# 1. Load MusicGen Small\nprocessor = AutoProcessor.from_pretrained(\"facebook/musicgen-small\")\nmodel = MusicgenForConditionalGeneration.from_pretrained(\"facebook/musicgen-small\")\n\n# 2. Text to music generation\ninputs = processor(text=[\"lo-fi chill beats with warm Rhodes piano\"], return_tensors=\"pt\")\naudio_values = model.generate(**inputs, max_new_tokens=256)\n\n# 3. Export WAV\nscipy.io.wavfile.write(\"music.wav\", rate=32000, data=audio_values[0, 0].numpy())",
    "notebook": {
      "filename": "GenAI_Experiment_08.ipynb",
      "notebook_url": "https://github.com/SucharithAkulwar/GenAI-Studio/tree/main/notebooks/GenAI_Experiment_08.ipynb"
    }
  },
  "9": {
    "id": 9,
    "title": "Development of a Personalized AI Assistant using an Open-Source LLM, Retrieval-Augmented Generation (RAG) and Fine-Tuning",
    "aim": "Develop a personalized AI assistant using an open-source foundational language model, integrate a RAG system to answer questions from user-specific documents, and investigate the effect of parameter-efficient fine-tuning using LoRA or QLoRA on response quality.",
    "tags": [
      "RAG",
      "FAISS",
      "Sentence-Transformers",
      "PEFT",
      "LoRA",
      "Open-Source LLM"
    ],
    "pipeline": [
      "1. Document Ingestion: Extract text chunks from uploaded PDF and TXT domain files",
      "2. Embedding & Indexing: Compute dense vector embeddings and index in FAISS vector store",
      "3. Semantic Retrieval: Retrieve top-k most relevant chunks using cosine similarity metric",
      "4. Prompt Augmentation: Ground LLM generation with retrieved contextual excerpts and citations",
      "5. Comparative Evaluation: Side-by-side output comparison between Base Model and LoRA-fine-tuned weights"
    ],
    "code_snippet": "from peft import LoraConfig, get_peft_model\nfrom transformers import AutoModelForCausalLM\n\n# 1. LoRA Configuration\nconfig = LoraConfig(\n    r=8,\n    lora_alpha=32,\n    target_modules=[\"q_proj\", \"v_proj\"],\n    lora_dropout=0.05,\n    bias=\"none\",\n    task_type=\"CAUSAL_LM\"\n)\n\n# 2. Wrap Base Model\nmodel = AutoModelForCausalLM.from_pretrained(\"Qwen/Qwen2.5-0.5B-Instruct\")\npeft_model = get_peft_model(model, config)\npeft_model.print_trainable_parameters() # Trainable params: ~0.1%",
    "notebook": {
      "filename": "GenAI_Experiment_09.ipynb",
      "notebook_url": "https://github.com/SucharithAkulwar/GenAI-Studio/tree/main/notebooks/GenAI_Experiment_09.ipynb"
    }
  },
  "10": {
    "id": 10,
    "title": "Generation of Videos from Text Prompts using a Pretrained Open-Source Video Generation Foundation Model",
    "aim": "Use a pretrained, open-source video generation foundation model to generate short videos directly from text prompts, without collecting a dataset or training the model, and preview and save the generated videos.",
    "tags": [
      "Diffusers",
      "Text-to-Video",
      "damo-vilab",
      "Spatiotemporal Attention",
      "Video Diffusion"
    ],
    "pipeline": [
      "1. Text Conditioning: Encodes textual prompt via CLIP text encoder into contextual semantic features",
      "2. Spatiotemporal Latent Prior: Samples 3D latent noise tensor (Batch, Channels, Frames, Height, Width)",
      "3. Cross-Frame Attention: UNet alternates spatial 2D attention and temporal 1D self-attention across frames",
      "4. Temporal Denoising: Progressive DDIM denoising step-by-step preserves temporal visual coherence",
      "5. Video Rendering: VAE temporal decoder synthesizes coherent MP4 video playable in browser"
    ],
    "code_snippet": "import torch\nfrom diffusers import DiffusionPipeline\n\n# 1. Load Text-to-Video Model\npipe = DiffusionPipeline.from_pretrained(\n    \"damo-vilab/text-to-video-ms-1.7b\",\n    torch_dtype=torch.float16,\n    variant=\"fp16\"\n)\npipe.enable_model_cpu_offload()\n\n# 2. Generate video frames\nprompt = \"An astronaut walking peacefully on the surface of Mars with crimson dust\"\nvideo_frames = pipe(prompt, num_frames=16, num_inference_steps=25).frames[0]\n\n# 3. Export MP4\nfrom diffusers.utils import export_to_video\nexport_to_video(video_frames, \"mars_walk.mp4\")",
    "notebook": {
      "filename": "GenAI_Experiment_10.ipynb",
      "notebook_url": "https://github.com/SucharithAkulwar/GenAI-Studio/tree/main/notebooks/GenAI_Experiment_10.ipynb"
    }
  }
};

  const DEFAULT_EXPERIMENTS = [
    { id: 1, title: 'Data Foundations & Feature Prep', category: 'Data Foundations', tags: ['Pandas', 'EDA', 'Feature Eng'] },
    { id: 2, title: 'Tensor Computing & Operations', category: 'Tensor Computing', tags: ['PyTorch', 'Linear Algebra', 'Shapes'] },
    { id: 3, title: 'Transformers & Sentiment NLP', category: 'Transformers & NLP', tags: ['HuggingFace', 'Attention', 'BERT'] },
    { id: 4, title: 'Generative Diffusion Pipeline', category: 'Generative Diffusion', tags: ['Stable Diffusion', 'Latents', 'Noise'] },
    { id: 5, title: 'Variational Autoencoders & Latent Space', category: 'Latent Space & VAE', tags: ['VAE', 'Manifold', 'MNIST'] },
    { id: 6, title: 'Deep Convolutional GAN (DCGAN)', category: 'Adversarial Networks', tags: ['GAN', 'Generator', 'Discriminator'] },
    { id: 7, title: 'Style-Based Synthesis (StyleGAN Concepts)', category: 'Style-Based Synthesis', tags: ['StyleGAN', 'AdaIN', 'Style Mixing'] },
    { id: 8, title: 'Audio & Music Synthesis', category: 'Audio & MusicGen', tags: ['Audio', 'Spectrogram', 'Waveform'] },
    { id: 9, title: 'Retrieval Augmented Generation (RAG)', category: 'RAG & LLM Fine-Tuning', tags: ['Embeddings', 'Vector DB', 'Retrieval'] },
    { id: 10, title: 'Video Diffusion & Temporal Modeling', category: 'Video Diffusion', tags: ['VideoGen', 'Motion', 'Temporal'] }
  ];

  const state = {
    currentRoute: 'home',
    systemStatus: null,
    experiments: DEFAULT_EXPERIMENTS,
    expCache: {},
    activeTab: 'gen'
  };

  function showToast(msg, duration = 2500) {
    const t = $('#toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.remove('hidden');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.add('hidden'), duration);
  }

  window.copyCode = function (text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Code snippet copied to clipboard');
    }).catch(() => {
      showToast('Failed to copy');
    });
  };

  function initTheme() {
    const saved = localStorage.getItem('genai_theme') || 'theme-light';
    document.body.className = saved;
    updateThemeIcon(saved);

    const toggle = $('#theme-toggle');
    const mobileToggle = $('#mobile-theme-btn');
    const handler = () => {
      const isDark = document.body.classList.contains('theme-dark');
      const next = isDark ? 'theme-light' : 'theme-dark';
      document.body.className = next;
      localStorage.setItem('genai_theme', next);
      updateThemeIcon(next);
    };

    if (toggle) toggle.addEventListener('click', handler);
    if (mobileToggle) mobileToggle.addEventListener('click', handler);
  }

  function updateThemeIcon(theme) {
    const icon = $('#theme-icon');
    if (icon) icon.textContent = theme === 'theme-dark' ? '☼' : '◐';
  }

  async function fetchSystemStatus() {
    try {
      const res = await fetch('/api/system/status');
      if (!res.ok) return;
      const data = await res.json();
      state.systemStatus = data;

      const devEl = $('#sys-device');
      const gpuEl = $('#sys-gpu');
      const memEl = $('#sys-mem');
      const modEl = $('#sys-models');
      const warnBadge = $('#cpu-warning-badge');

      if (devEl) devEl.textContent = data.device.toUpperCase();
      if (gpuEl) gpuEl.textContent = data.gpu_name;
      if (memEl) memEl.textContent = `${data.ram_free_mb} MB RAM`;
      if (modEl) modEl.textContent = `${data.cached_models.length} active`;

      if (warnBadge) {
        if (data.is_cpu) {
          warnBadge.classList.remove('hidden');
        } else {
          warnBadge.classList.add('hidden');
        }
      }
    } catch (e) {
      console.warn('System status check skipped:', e);
    }
  }

  async function initNavigation() {
    const navList = $('#experiments-nav-list');
    const mobileList = $('#mobile-nav-list');

    const renderItems = (items) => (Array.isArray(items) ? items : DEFAULT_EXPERIMENTS).map(exp => `
      <a href="#exp-${exp.id}" class="dropdown-item" data-id="exp-${exp.id}" id="nav-exp-${exp.id}">
        <span class="dropdown-num">${String(exp.id).padStart(2, '0')}</span>
        <span class="nav-label">${escapeHtml(exp.title)}</span>
      </a>
    `).join('');

    // Pre-populate navigation dropdown immediately
    if (navList) navList.innerHTML = renderItems(state.experiments);
    if (mobileList) mobileList.innerHTML = renderItems(state.experiments);

    try {
      const res = await fetch('/api/experiments');
      if (res.ok) {
        const list = await res.json();
        if (Array.isArray(list) && list.length > 0) {
          state.experiments = list;
          if (navList) navList.innerHTML = renderItems(list);
          if (mobileList) mobileList.innerHTML = renderItems(list);
        }
      }
    } catch (e) {
      console.warn('Navigation using fallback experiments list:', e);
    }

    // Search filter in dropdown
    const searchInput = $('#exp-search');
    if (searchInput && navList) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        $$('.dropdown-item', navList).forEach(item => {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(q) ? 'flex' : 'none';
        });
      });
    }

    // Dropdown toggle
    const dropdownContainer = $('#exp-dropdown-container');
    const dropdownBtn = $('#exp-dropdown-btn');
    if (dropdownBtn && dropdownContainer) {
      dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownContainer.classList.toggle('open');
      });

      document.addEventListener('click', (e) => {
        if (!dropdownContainer.contains(e.target)) {
          dropdownContainer.classList.remove('open');
        }
      });
    }
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
  }

  function handleRoute() {
    const hash = window.location.hash.replace('#', '') || 'home';
    state.currentRoute = hash;

    // Close any open dropdowns or drawers
    const dropdown = $('#exp-dropdown-container');
    if (dropdown) dropdown.classList.remove('open');
    const drawer = $('#mobile-drawer');
    if (drawer) drawer.classList.remove('open');

    // Update active top nav links
    $$('.top-nav-link').forEach(l => l.classList.remove('active'));
    $$('.dropdown-item').forEach(l => l.classList.remove('active'));

    const activeTop = $(`[data-id="${hash}"]`);
    if (activeTop) activeTop.classList.add('active');

    const container = $('#content-container');
    if (!container) return;

    if (hash === 'home' || hash === 'experiments-section') {
      renderHome(container);
      if (hash === 'experiments-section') {
        setTimeout(() => {
          const target = document.getElementById('experiments-section');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else if (hash.startsWith('exp-')) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      const expId = parseInt(hash.replace('exp-', ''), 10);
      renderExperiment(container, expId);
    }
  }

  function renderHome(container) {
    container.innerHTML = `
      <div class="hero-section">
        <div style="position: relative; display: inline-block;">
          <h1 class="hero-display-title">
            Less boilerplate.
            <span class="accent-line">More GenAI.</span>
          </h1>
          <span class="hero-sparkle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
            </svg>
          </span>
        </div>

        <p class="hero-lead-text">
          Models, pipelines, and interactive demos — all in one studio.<br>
          The intuitive laboratory workbench to understand and execute generative AI.
        </p>

        <div class="hero-cta-group">
          <a href="#experiments-section" id="btn-explore-experiments" class="btn-hero-solid">
            <span>Explore Experiments</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </div>
      </div>

      <div id="experiments-section" class="section-divider-title">Select an experiment to launch</div>

      <div class="exp-grid">
        ${(Array.isArray(state.experiments) && state.experiments.length ? state.experiments : DEFAULT_EXPERIMENTS).map(exp => `
          <a href="#exp-${exp.id}" class="exp-card">
            <div class="exp-card-num">EXPERIMENT ${String(exp.id).padStart(2, '0')}</div>
            <div class="exp-card-title">${escapeHtml(exp.title)}</div>
            <div class="exp-card-category">${escapeHtml(exp.category)}</div>
            <div class="exp-badge-row">
              ${(exp.tags || []).slice(0, 3).map(t => `<span class="exp-tag">${escapeHtml(t)}</span>`).join('')}
            </div>
            <div class="exp-card-footer">
              <span>Launch Lab Demo</span>
              <span>→</span>
            </div>
          </a>
        `).join('')}
      </div>
    `;

    const scrollToExperiments = (e) => {
      e.preventDefault();
      const target = document.getElementById('experiments-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, null, '#experiments-section');
      }
    };

    const exploreBtn = document.getElementById('btn-explore-experiments');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', scrollToExperiments);
    }
  }

  async function renderExperiment(container, expId) {
    container.innerHTML = `
      <div style="padding: 40px; text-align: center; color: var(--text-muted);">
        <span class="spinner" style="border-top-color: var(--accent-cobalt); width: 24px; height: 24px;"></span>
        <div style="margin-top: 12px; font-family: var(--font-mono);">Loading Experiment ${expId} Pipeline & Telemetry...</div>
      </div>
    `;

    try {
      const expKey = `exp${String(expId).padStart(2, '0')}`;
      const res = await fetch(`/api/${expKey}/info`);
      if (!res.ok) throw new Error(`HTTP ${res.status} while fetching experiment metadata`);
      const info = await res.json();
      state.expCache[expId] = info;

      const notebookUrl = info.notebook ? info.notebook.notebook_url : '#';
      const notebookFile = info.notebook ? info.notebook.filename : 'experiment.ipynb';

      // Generate horizontal switcher pills
      const switcherHtml = `
        <div class="exp-nav-bar">
          <a href="#home" class="exp-pill-link">← Overview</a>
          ${Array.from({length: 10}, (_, i) => i + 1).map(num => `
            <a href="#exp-${num}" class="exp-pill-link ${num === expId ? 'active' : ''}">
              Exp ${String(num).padStart(2, '0')}
            </a>
          `).join('')}
        </div>
      `;

      container.innerHTML = `
        ${switcherHtml}
        <div class="page-header">
          <div class="exp-category-kicker">EXPERIMENT ${String(expId).padStart(2, '0')}</div>
          <h1 class="page-title">${escapeHtml(info.title)}</h1>
          
          <div class="exp-badge-row">
            ${(info.tags || []).map(t => `<span class="exp-tag">${escapeHtml(t)}</span>`).join('')}
          </div>

          <!-- Aim Card with Exact Text Required -->
          <div class="aim-card">
            <div class="aim-label">AIM</div>
            <div class="aim-text">${escapeHtml(info.aim)}</div>
          </div>

          <div class="action-bar">
            <a href="${notebookUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary" id="btn-open-notebook">
              <span>📓</span> Open Notebook (${escapeHtml(notebookFile)})
            </a>
            
          </div>
        </div>

        <div class="grid-2col">
          <div class="section-box">
            <div class="section-heading">Pipeline Steps</div>
            <ul class="pipeline-list">
              ${(info.pipeline || []).map(s => `<li>${escapeHtml(s)}</li>`).join('')}
            </ul>
          </div>

          <div class="section-box">
            <div class="section-heading">
              <span>Core Code Snippet</span>
              <button class="copy-btn" onclick="copyCode(this.getAttribute('data-code'))" data-code="${escapeHtml(info.code_snippet)}">Copy</button>
            </div>
            <div class="code-container">
              <pre><code>${escapeHtml(info.code_snippet)}</code></pre>
            </div>
          </div>
        </div>

        <div class="demo-panel" id="demo-panel">
          <div class="demo-heading">Interactive Experiment Demo</div>
          <div id="demo-content"></div>
        </div>
      `;

      mountExperimentDemo(expId, $('#demo-content'));

    } catch (err) {
      container.innerHTML = `
        <div class="alert-error">
          <strong>Failed to load Experiment ${expId}</strong>: ${escapeHtml(err.message)}
          <div class="alert-hint">Fix hint: Verify FastAPI server is running with 'uvicorn app.main:app --reload'</div>
        </div>
      `;
    }
  }

  function mountExperimentDemo(id, el) {
    switch (id) {
      case 1: mountExp01(el); break;
      case 2: mountExp02(el); break;
      case 3: mountExp03(el); break;
      case 4: mountExp04(el); break;
      case 5: mountExp05(el); break;
      case 6: mountExp06(el); break;
      case 7: mountExp07(el); break;
      case 8: mountExp08(el); break;
      case 9: mountExp09(el); break;
      case 10: mountExp10(el); break;
      default: el.innerHTML = '<div>Demo not implemented.</div>';
    }
  }

  // Exp 1: Dataset Analysis & Preprocessing
  function mountExp01(el) {
    el.innerHTML = `
      <div style="display: flex; gap: 12px; margin-bottom: 18px; align-items: center; flex-wrap: wrap;">
        <input type="file" id="csv-file-input" accept=".csv" class="form-input" style="max-width: 320px;">
        <button id="btn-analyze-csv" class="btn-primary">Upload & Analyze CSV</button>
        <button id="btn-sample-csv" class="btn-secondary">Load Built-in Sample Dataset</button>
      </div>

      <div id="exp01-results" class="hidden">
        <div class="result-box">
          <div class="result-title">Dataset Summary & Shape</div>
          <div id="csv-shape-info" style="font-family: var(--font-mono); font-size: 13px; margin-bottom: 12px;"></div>
          
          <div class="result-title">Data Snapshot (First 5 Rows)</div>
          <div id="csv-head-table" class="data-table-wrapper"></div>
          
          <div class="result-title" style="margin-top: 16px;">Statistical Description (describe())</div>
          <div id="csv-describe-table" class="data-table-wrapper"></div>

          <div class="grid-2col" style="margin-top: 16px;">
            <div>
              <div class="result-title">Missing Values Audit</div>
              <div id="csv-missing-table" class="data-table-wrapper"></div>
            </div>
            <div>
              <div class="result-title">IQR Outliers Detection</div>
              <div id="csv-outliers-table" class="data-table-wrapper"></div>
            </div>
          </div>

          <div class="result-title" style="margin-top: 16px;">Correlation Matrix</div>
          <div id="csv-corr-table" class="data-table-wrapper"></div>
        </div>

        <div class="result-box" style="margin-top: 20px;">
          <div class="result-title">Preprocessing & Clean Pipeline</div>
          <div class="form-row-3">
            <div class="form-group">
              <label class="form-label">Imputation Strategy</label>
              <select id="prep-impute" class="form-select">
                <option value="median">Median (Numeric)</option>
                <option value="mean">Mean (Numeric)</option>
                <option value="drop">Drop Missing Rows</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Categorical Encoding</label>
              <select id="prep-encode" class="form-select">
                <option value="true">Ordinal / Label Encoding</option>
                <option value="false">Keep Raw</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Standard Scaling</label>
              <select id="prep-scale" class="form-select">
                <option value="true">Z-score Standardization</option>
                <option value="false">No Scaling</option>
              </select>
            </div>
          </div>
          <button id="btn-preprocess" class="btn-primary" style="margin-top: 8px;">Run Preprocessing & Download Cleaned CSV</button>
          <div id="prep-download-area" style="margin-top: 12px;"></div>
        </div>
      </div>
      <div id="exp01-msg"></div>
    `;

    let activeCsvBlob = null;
    let activeFilename = 'dataset.csv';

    $('#btn-sample-csv').onclick = async () => {
      try {
        const res = await fetch('/api/exp01/sample-dataset');
        const data = await res.json();
        activeCsvBlob = new Blob([data.csv_data], { type: 'text/csv' });
        activeFilename = data.filename;
        triggerAnalysis(activeCsvBlob, activeFilename);
      } catch (e) {
        showMsg('#exp01-msg', 'Failed to fetch sample: ' + e.message, true);
      }
    };

    $('#btn-analyze-csv').onclick = () => {
      const input = $('#csv-file-input');
      if (!input.files.length) {
        showMsg('#exp01-msg', 'Please select a CSV file first.', true);
        return;
      }
      activeCsvBlob = input.files[0];
      activeFilename = input.files[0].name;
      triggerAnalysis(activeCsvBlob, activeFilename);
    };

    async function triggerAnalysis(blob, filename) {
      showMsg('#exp01-msg', '<span class="spinner"></span> Parsing and profiling dataset...', false);
      const fd = new FormData();
      fd.append('file', blob, filename);

      try {
        const res = await fetch('/api/exp01/analyze', { method: 'POST', body: fd });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.detail || 'Analysis error');
        }
        const data = await res.json();
        $('#exp01-msg').innerHTML = '';
        $('#exp01-results').classList.remove('hidden');

        $('#csv-shape-info').innerHTML = `
          <strong>File:</strong> ${escapeHtml(data.filename)} | 
          <strong>Rows:</strong> ${data.shape[0]} | 
          <strong>Columns:</strong> ${data.shape[1]}
        `;

        renderTable('#csv-head-table', data.head);

        if (data.describe && Object.keys(data.describe).length) {
          const descRows = [];
          const cols = Object.keys(data.describe);
          const stats = Object.keys(data.describe[cols[0]] || {});
          stats.forEach(stat => {
            const row = { metric: stat };
            cols.forEach(c => row[c] = data.describe[c][stat]);
            descRows.push(row);
          });
          renderTable('#csv-describe-table', descRows);
        }

        const missingRows = Object.entries(data.missing_values || {}).map(([col, cnt]) => ({
          column: col, missing_count: cnt, status: cnt > 0 ? '⚠️ Has Missing' : '✓ Clean'
        }));
        renderTable('#csv-missing-table', missingRows);

        const outlierRows = Object.entries(data.outliers || {}).map(([col, info]) => ({
          column: col, IQR: info.iqr, outliers: info.outlier_count
        }));
        renderTable('#csv-outliers-table', outlierRows);

        if (data.correlations && Object.keys(data.correlations).length) {
          const corrCols = Object.keys(data.correlations);
          const corrRows = corrCols.map(r => {
            const row = { feature: r };
            corrCols.forEach(c => row[c] = data.correlations[r][c]);
            return row;
          });
          renderTable('#csv-corr-table', corrRows);
        }

      } catch (err) {
        showMsg('#exp01-msg', `Error: ${err.message}. Fix hint: Ensure the file is a standard comma-separated tabular CSV.`, true);
      }
    }

    $('#btn-preprocess').onclick = async () => {
      if (!activeCsvBlob) return;
      const fd = new FormData();
      fd.append('file', activeCsvBlob, activeFilename);
      fd.append('impute_strategy', $('#prep-impute').value);
      fd.append('encode_categoricals', $('#prep-encode').value);
      fd.append('scale_numeric', $('#prep-scale').value);
      fd.append('test_split_ratio', '0.2');

      try {
        const res = await fetch('/api/exp01/preprocess', { method: 'POST', body: fd });
        const data = await res.json();
        $('#prep-download-area').innerHTML = `
          <div style="background: var(--success-bg); border: 1px solid var(--success-border); color: var(--success-text); padding: 12px; border-radius: var(--radius-sm); font-size: 13px;">
            ✓ Preprocessing complete. Cleaned shape: [${data.cleaned_shape.join(', ')}] (Train: ${data.train_rows}, Test: ${data.test_rows})
            <div style="margin-top: 8px;">
              <a href="${data.download_url}" download class="btn-primary">Download Cleaned CSV</a>
            </div>
          </div>
        `;
      } catch (err) {
        showMsg('#exp01-msg', 'Preprocessing error: ' + err.message, true);
      }
    };
  }

  // Exp 2: TensorFlow 2 Playground
  function mountExp02(el) {
    el.innerHTML = `
      <div class="form-row-2">
        <div class="form-group">
          <label class="form-label">Operation Preset</label>
          <select id="tf-op-select" class="form-select">
            <option value="constant">tf.constant (Create fixed tensor)</option>
            <option value="zeros">tf.zeros (Allocate zero weights)</option>
            <option value="random">tf.random.normal (Sample latent prior)</option>
            <option value="reshape">tf.reshape (Reorganize dimensions)</option>
            <option value="matmul">tf.matmul (Matrix multiplication)</option>
            <option value="broadcasting">Broadcasting addition</option>
            <option value="reduce_sum">tf.reduce_sum (Aggregate axis)</option>
            <option value="GradientTape">tf.GradientTape (Automatic differentiation)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Parameters (Custom Value / Coordinates)</label>
          <input type="text" id="tf-params-input" class="form-input" value="[1.0, 2.0, 3.0, 4.0]" placeholder="Shape or value array">
        </div>
      </div>
      <button id="btn-run-tf-op" class="btn-primary">Run Tensor Operation</button>

      <div id="tf-results" class="result-box hidden">
        <div class="result-title">Execution Steps & Graph Trace</div>
        <ul id="tf-steps" class="pipeline-list" style="margin-bottom: 14px;"></ul>
        
        <div class="result-title">Tensor Metadata</div>
        <div id="tf-meta" style="font-family: var(--font-mono); font-size: 12px; margin-bottom: 12px;"></div>

        <div class="result-title">Evaluated Output</div>
        <div class="code-container">
          <pre><code id="tf-output-val"></code></pre>
        </div>
        
        <div id="tf-explanation" style="margin-top: 12px; font-size: 13px; color: var(--text-secondary);"></div>
      </div>
      <div id="exp02-msg"></div>
    `;

    const opSelect = $('#tf-op-select');
    const paramInput = $('#tf-params-input');

    opSelect.onchange = () => {
      const op = opSelect.value;
      if (op === 'constant') paramInput.value = '[1.0, 2.0, 3.0, 4.0]';
      else if (op === 'zeros') paramInput.value = '[2, 4]';
      else if (op === 'random') paramInput.value = '[3, 3]';
      else if (op === 'reshape') paramInput.value = '{"initial_shape": [2, 4], "new_shape": [4, 2]}';
      else if (op === 'matmul') paramInput.value = '{"a_rows": 2, "a_cols": 3, "b_cols": 2}';
      else if (op === 'broadcasting') paramInput.value = '{}';
      else if (op === 'reduce_sum') paramInput.value = '{"axis": 0}';
      else if (op === 'GradientTape') paramInput.value = '{"x": 4.0}';
    };

    $('#btn-run-tf-op').onclick = async () => {
      const op = opSelect.value;
      let params = {};
      try {
        const raw = paramInput.value.trim();
        if (raw.startsWith('{')) params = JSON.parse(raw);
        else if (raw.startsWith('[')) {
          if (op === 'zeros' || op === 'random') params = { shape: JSON.parse(raw) };
          else params = { value: JSON.parse(raw) };
        }
      } catch (e) {
        showMsg('#exp02-msg', 'Invalid JSON/Array parameter format.', true);
        return;
      }

      showMsg('#exp02-msg', '<span class="spinner"></span> Computing eager tensor...', false);
      try {
        const res = await fetch('/api/exp02/run-op', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operation: op, params: params })
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.detail || 'Op failed');
        }
        const data = await res.json();
        $('#exp02-msg').innerHTML = '';
        $('#tf-results').classList.remove('hidden');

        $('#tf-steps').innerHTML = (data.steps || []).map(s => `<li>${escapeHtml(s)}</li>`).join('');
        $('#tf-meta').innerHTML = `
          <strong>Shape:</strong> [${(data.shape || []).join(', ')}] | 
          <strong>Dtype:</strong> ${escapeHtml(data.dtype || 'float32')} | 
          <strong>Rank:</strong> ${data.rank !== undefined ? data.rank : (data.shape || []).length}
        `;
        $('#tf-output-val').textContent = JSON.stringify(data.result, null, 2);
        $('#tf-explanation').innerHTML = `<strong>Theoretical Insight:</strong> ${escapeHtml(data.explanation)}`;
      } catch (err) {
        showMsg('#exp02-msg', err.message, true);
      }
    };
  }

  // Exp 3: FLAN-T5
  function mountExp03(el) {
    el.innerHTML = `
      <div class="form-group">
        <label class="form-label">Question</label>
        <input type="text" id="t5-question" class="form-input" value="What is the significance of the self-attention mechanism in Generative AI?">
      </div>
      <div class="form-group">
        <label class="form-label">Optional Context</label>
        <textarea id="t5-context" class="form-textarea">The Transformer model uses multi-head self-attention to compute dynamic representations of input sequences, allowing words to attend to all other positions simultaneously without recurrence.</textarea>
      </div>
      <div class="form-row-3">
        <div class="form-group">
          <label class="form-label">Max Tokens</label>
          <input type="number" id="t5-tokens" class="form-input" value="128" min="16" max="256">
        </div>
        <div class="form-group">
          <label class="form-label">Temperature: <span id="temp-val" class="slider-val">0.7</span></label>
          <input type="range" id="t5-temp" class="form-input" min="0.1" max="1.0" step="0.05" value="0.7">
        </div>
        <div class="form-group">
          <label class="form-label">Top-P Nucleus: <span id="topp-val" class="slider-val">0.9</span></label>
          <input type="range" id="t5-topp" class="form-input" min="0.1" max="1.0" step="0.05" value="0.9">
        </div>
      </div>
      <button id="btn-t5-generate" class="btn-primary">Generate Transformer Answer</button>

      <div id="t5-results" class="result-box hidden">
        <div class="result-title">Generated Answer</div>
        <div id="t5-answer" style="font-size: 15px; font-weight: 500; margin-bottom: 14px; padding: 12px; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-sm);"></div>
        
        <div class="result-title">Prompt Representation Sent to Model</div>
        <div class="code-container">
          <pre><code id="t5-final-prompt"></code></pre>
        </div>
        <div id="t5-notice" style="margin-top: 10px; font-size: 12px; color: var(--text-muted);"></div>
      </div>
      <div id="exp03-msg"></div>
    `;

    $('#t5-temp').oninput = e => $('#temp-val').textContent = e.target.value;
    $('#t5-topp').oninput = e => $('#topp-val').textContent = e.target.value;

    $('#btn-t5-generate').onclick = async () => {
      const q = $('#t5-question').value.trim();
      const ctx = $('#t5-context').value.trim();
      if (!q) {
        showMsg('#exp03-msg', 'Please enter a question.', true);
        return;
      }

      showMsg('#exp03-msg', '<span class="spinner"></span> Autoregressively decoding FLAN-T5 tokens...', false);
      try {
        const res = await fetch('/api/exp03/generate-answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: q,
            context: ctx,
            max_tokens: parseInt($('#t5-tokens').value, 10),
            temperature: parseFloat($('#t5-temp').value),
            top_p: parseFloat($('#t5-topp').value)
          })
        });
        const data = await res.json();
        $('#exp03-msg').innerHTML = '';
        $('#t5-results').classList.remove('hidden');

        $('#t5-answer').textContent = data.answer;
        $('#t5-final-prompt').textContent = data.prompt;
        $('#t5-notice').innerHTML = `
          <strong>Model Engine:</strong> ${escapeHtml(data.model)} | 
          <strong>Device:</strong> ${escapeHtml(data.device)} | 
          <strong>Tokens:</strong> ${data.tokens_generated}
          ${data.notice ? `<div class="alert-hint" style="color: var(--accent-cobalt); margin-top: 4px;">ℹ ${escapeHtml(data.notice)}</div>` : ''}
        `;
      } catch (err) {
        showMsg('#exp03-msg', err.message, true);
      }
    };
  }

  // Exp 4: Diffusion Image
  function mountExp04(el) {
    el.innerHTML = `
      <div class="form-group">
        <label class="form-label">Text Prompt</label>
        <input type="text" id="diff-prompt" class="form-input" value="A futuristic generative AI research laboratory with holographic neural networks, cinematic lighting, 8k">
      </div>
      <div class="form-group">
        <label class="form-label">Negative Prompt</label>
        <input type="text" id="diff-neg-prompt" class="form-input" value="blurry, distorted, oversaturated, low quality, artifacts">
      </div>
      <div class="form-row-3">
        <div class="form-group">
          <label class="form-label">Denoising Steps: <span id="steps-val" class="slider-val">20</span></label>
          <input type="range" id="diff-steps" class="form-input" min="5" max="30" value="20">
        </div>
        <div class="form-group">
          <label class="form-label">Guidance Scale (CFG): <span id="cfg-val" class="slider-val">7.5</span></label>
          <input type="range" id="diff-cfg" class="form-input" min="1.0" max="15.0" step="0.5" value="7.5">
        </div>
        <div class="form-group">
          <label class="form-label">Random Seed</label>
          <input type="number" id="diff-seed" class="form-input" value="42">
        </div>
      </div>
      <button id="btn-diff-generate" class="btn-primary">Synthesize Image with Diffusion</button>

      <div id="diff-results" class="result-box hidden">
        <div class="result-title">Diffusion Synthesized Output</div>
        <div class="media-preview-box">
          <img id="diff-img-preview" alt="Diffusion Result">
          <div style="display: flex; gap: 12px; align-items: center; margin-top: 8px;">
            <a id="diff-download-link" download="diffusion_image.png" class="btn-primary">Download Image</a>
            <span id="diff-meta-tag" class="exp-tag"></span>
          </div>
        </div>
        <div id="diff-notice" style="margin-top: 10px; font-size: 12px; color: var(--text-muted);"></div>
      </div>
      <div id="exp04-msg"></div>
    `;

    $('#diff-steps').oninput = e => $('#steps-val').textContent = e.target.value;
    $('#diff-cfg').oninput = e => $('#cfg-val').textContent = e.target.value;

    $('#btn-diff-generate').onclick = async () => {
      const p = $('#diff-prompt').value.trim();
      if (!p) {
        showMsg('#exp04-msg', 'Prompt must not be empty.', true);
        return;
      }

      showMsg('#exp04-msg', '<span class="spinner"></span> Executing latent reverse diffusion timesteps...', false);
      try {
        const res = await fetch('/api/exp04/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: p,
            negative_prompt: $('#diff-neg-prompt').value,
            steps: parseInt($('#diff-steps').value, 10),
            guidance_scale: parseFloat($('#diff-cfg').value),
            seed: parseInt($('#diff-seed').value, 10)
          })
        });
        const data = await res.json();
        $('#exp04-msg').innerHTML = '';
        $('#diff-results').classList.remove('hidden');

        $('#diff-img-preview').src = `data:image/png;base64,${data.image_base64}`;
        $('#diff-download-link').href = data.download_url;
        $('#diff-meta-tag').textContent = `Seed: ${data.seed} | Steps: ${data.steps} | Device: ${data.device}`;
        if (data.notice) {
          $('#diff-notice').innerHTML = `<div class="alert-hint">ℹ ${escapeHtml(data.notice)}</div>`;
        }
      } catch (err) {
        showMsg('#exp04-msg', err.message, true);
      }
    };
  }

  // Exp 5: VAE on MNIST
  function mountExp05(el) {
    el.innerHTML = `
      <div style="display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;">
        <button id="btn-train-vae" class="btn-primary">Train VAE on MNIST (5 Epochs)</button>
        <button id="btn-vae-grid" class="btn-secondary">Generate 8x8 Latent Digits Grid</button>
      </div>

      <div id="vae-train-stream" class="result-box hidden">
        <div class="result-title">Training Loss Progression (Streamed)</div>
        <div class="data-table-wrapper" id="vae-loss-table"></div>
      </div>

      <div class="grid-2col" style="margin-top: 20px;">
        <div class="section-box">
          <div class="section-heading">Live 2D Latent Decoder</div>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 14px;">
            Slide continuous coordinates in learned latent space Z = (z1, z2) to decode digits live:
          </p>
          <div class="form-group">
            <label class="form-label">Latent Coordinate z1: <span id="z1-val" class="slider-val">0.0</span></label>
            <input type="range" id="vae-z1" class="form-input" min="-3.0" max="3.0" step="0.1" value="0.0">
          </div>
          <div class="form-group">
            <label class="form-label">Latent Coordinate z2: <span id="z2-val" class="slider-val">0.0</span></label>
            <input type="range" id="vae-z2" class="form-input" min="-3.0" max="3.0" step="0.1" value="0.0">
          </div>
          <div style="text-align: center; margin-top: 14px;">
            <img id="vae-live-digit" alt="Decoded Digit" style="border: 2px solid var(--border-color); border-radius: var(--radius-sm); width: 140px; height: 140px; image-rendering: pixelated; background: #000;">
            <div style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); margin-top: 6px;">Live 28x28 Decoder Output</div>
          </div>
        </div>

        <div class="section-box">
          <div class="section-heading">Latent Space Scatter (Colored by Digit)</div>
          <canvas id="vae-scatter-canvas" width="340" height="260" style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-sm); width: 100%;"></canvas>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 8px;">250 projected samples clustered across learned Gaussian prior N(0, I)</div>
        </div>
      </div>

      <div id="vae-grid-box" class="result-box hidden">
        <div class="result-title">Synthesized 8x8 MNIST Manifold Grid</div>
        <div class="media-preview-box">
          <img id="vae-grid-img" alt="VAE 8x8 Grid">
          <a id="vae-grid-download" download="vae_grid.png" class="btn-primary" style="margin-top: 10px;">Download 8x8 Grid</a>
        </div>
      </div>
      <div id="exp05-msg"></div>
    `;

    const updateLatent = async () => {
      const z1 = parseFloat($('#vae-z1').value);
      const z2 = parseFloat($('#vae-z2').value);
      $('#z1-val').textContent = z1.toFixed(1);
      $('#z2-val').textContent = z2.toFixed(1);

      try {
        const res = await fetch('/api/exp05/decode-latent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ z1, z2 })
        });
        const data = await res.json();
        $('#vae-live-digit').src = `data:image/png;base64,${data.image_base64}`;
      } catch (e) {
        console.warn('Live decode error:', e);
      }
    };

    $('#vae-z1').oninput = updateLatent;
    $('#vae-z2').oninput = updateLatent;
    updateLatent();

    (async () => {
      try {
        const res = await fetch('/api/exp05/latent-scatter');
        const data = await res.json();
        const canvas = $('#vae-scatter-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const scale = 45;

        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, cy); ctx.lineTo(canvas.width, cy);
        ctx.moveTo(cx, 0); ctx.lineTo(cx, canvas.height);
        ctx.stroke();

        const colors = ['#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef', '#ec4899'];
        data.points.forEach(p => {
          const px = cx + p.x * scale;
          const py = cy - p.y * scale;
          ctx.fillStyle = colors[p.digit % colors.length];
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, 2 * Math.PI);
          ctx.fill();
        });
      } catch (e) {
        console.warn('Scatter load skipped:', e);
      }
    })();

    $('#btn-train-vae').onclick = async () => {
      showMsg('#exp05-msg', '<span class="spinner"></span> Training Keras VAE across 5 epochs...', false);
      try {
        const res = await fetch('/api/exp05/train', { method: 'POST' });
        const data = await res.json();
        $('#exp05-msg').innerHTML = '';
        $('#vae-train-stream').classList.remove('hidden');
        renderTable('#vae-loss-table', data.history);
        showToast('VAE Model trained successfully');
      } catch (err) {
        showMsg('#exp05-msg', err.message, true);
      }
    };

    $('#btn-vae-grid').onclick = async () => {
      showMsg('#exp05-msg', '<span class="spinner"></span> Decoding 8x8 latent manifold grid...', false);
      try {
        const res = await fetch('/api/exp05/generate-grid');
        const data = await res.json();
        $('#exp05-msg').innerHTML = '';
        $('#vae-grid-box').classList.remove('hidden');
        $('#vae-grid-img').src = `data:image/png;base64,${data.image_base64}`;
        $('#vae-grid-download').href = data.download_url;
      } catch (err) {
        showMsg('#exp05-msg', err.message, true);
      }
    };
  }

  // Exp 6: DCGAN
  function mountExp06(el) {
    el.innerHTML = `
      <div class="form-row-2">
        <div class="form-group">
          <label class="form-label">Random Noise Prior Seed (z ~ N(0, I))</label>
          <input type="number" id="dcgan-seed" class="form-input" value="42">
        </div>
        <div class="form-group">
          <label class="form-label">Number of Faces to Generate</label>
          <select id="dcgan-count" class="form-select">
            <option value="4">4 Faces (2x2 Grid)</option>
            <option value="8">8 Faces (4x2 Grid)</option>
          </select>
        </div>
      </div>
      <div style="display: flex; gap: 12px; margin-bottom: 20px;">
        <button id="btn-dcgan-gen" class="btn-primary">Generate Synthetic Faces (DCGAN)</button>
        <button id="btn-dcgan-prog" class="btn-secondary">View Epoch-by-Epoch Progression</button>
      </div>

      <div id="dcgan-results" class="result-box hidden">
        <div class="result-title">Generated Face Grid (from Generator Latents)</div>
        <div class="media-preview-box">
          <img id="dcgan-img-preview" alt="DCGAN Faces">
          <a id="dcgan-download" download="dcgan_faces.png" class="btn-primary" style="margin-top: 10px;">Download Faces Grid</a>
        </div>
      </div>

      <div id="dcgan-prog-box" class="result-box hidden">
        <div class="result-title">CelebA Training Convergence Progression (Epochs 1 to 50)</div>
        <div id="dcgan-prog-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 12px;"></div>
      </div>
      <div id="exp06-msg"></div>
    `;

    $('#btn-dcgan-gen').onclick = async () => {
      showMsg('#exp06-msg', '<span class="spinner"></span> Generating faces via DCGAN Generator transpose convolutions...', false);
      try {
        const res = await fetch('/api/exp06/generate-faces', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            seed: parseInt($('#dcgan-seed').value, 10),
            num_faces: parseInt($('#dcgan-count').value, 10)
          })
        });
        const data = await res.json();
        $('#exp06-msg').innerHTML = '';
        $('#dcgan-results').classList.remove('hidden');
        $('#dcgan-img-preview').src = `data:image/png;base64,${data.image_base64}`;
        $('#dcgan-download').href = data.download_url;
      } catch (err) {
        showMsg('#exp06-msg', err.message, true);
      }
    };

    $('#btn-dcgan-prog').onclick = async () => {
      showMsg('#exp06-msg', '<span class="spinner"></span> Loading progression artifacts...', false);
      try {
        const res = await fetch('/api/exp06/training-progression');
        const data = await res.json();
        $('#exp06-msg').innerHTML = '';
        $('#dcgan-prog-box').classList.remove('hidden');

        $('#dcgan-prog-grid').innerHTML = data.progression.map(p => `
          <div style="background: var(--bg-surface); padding: 8px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); text-align: center;">
            <img src="data:image/png;base64,${p.image_base64}" style="width: 100%; border-radius: 2px;">
            <div style="font-family: var(--font-mono); font-size: 11px; margin-top: 4px;">Epoch ${p.epoch}</div>
            <div style="font-size: 10px; color: var(--text-muted);">G Loss: ${p.loss_g}</div>
          </div>
        `).join('');
      } catch (err) {
        showMsg('#exp06-msg', err.message, true);
      }
    };
  }

  // Exp 7: StyleGAN
  function mountExp07(el) {
    el.innerHTML = `
      <div class="tab-row">
        <button class="tab-btn active" data-tab="gen" id="tab-btn-gen">(a) Generate from Seed</button>
        <button class="tab-btn" data-tab="mix" id="tab-btn-mix">(b) Style Mixing (A + B)</button>
        <button class="tab-btn" data-tab="noise" id="tab-btn-noise">(c) Stochastic Noise Injection</button>
      </div>

      <div id="tab-content-gen">
        <div class="form-group" style="max-width: 320px;">
          <label class="form-label">Identity Seed in Latent Space Z</label>
          <input type="number" id="style-seed" class="form-input" value="101">
        </div>
        <button id="btn-style-gen" class="btn-primary">Generate Face (StyleGAN)</button>
        <div id="style-gen-result" class="media-preview-box hidden" style="margin-top: 16px;">
          <img id="style-gen-img" alt="StyleGAN Result">
          <a id="style-gen-download" download="stylegan_face.png" class="btn-primary">Download High-Res Face</a>
        </div>
      </div>

      <div id="tab-content-mix" class="hidden">
        <div class="form-row-3">
          <div class="form-group">
            <label class="form-label">Seed Identity A (Coarse Structure)</label>
            <input type="number" id="mix-seed-a" class="form-input" value="101">
          </div>
          <div class="form-group">
            <label class="form-label">Seed Identity B (Fine Details)</label>
            <input type="number" id="mix-seed-b" class="form-input" value="202">
          </div>
          <div class="form-group">
            <label class="form-label">Crossover Layer: <span id="crossover-val" class="slider-val">4</span></label>
            <input type="range" id="mix-crossover" class="form-input" min="1" max="8" value="4">
          </div>
        </div>
        <button id="btn-style-mix" class="btn-primary">Execute Style Mixing via AdaIN</button>

        <div id="mix-results" class="result-box hidden">
          <div class="result-title">Style Mixing Comparison</div>
          <div class="form-row-3" style="text-align: center;">
            <div>
              <div style="font-weight: 600; margin-bottom: 6px;">Identity A</div>
              <img id="mix-img-a" style="max-width: 100%; border: 1px solid var(--border-color); border-radius: 4px;">
            </div>
            <div>
              <div style="font-weight: 600; margin-bottom: 6px; color: var(--accent-cobalt);">Mixed Synthesis</div>
              <img id="mix-img-res" style="max-width: 100%; border: 2px solid var(--accent-cobalt); border-radius: 4px;">
              <a id="mix-download" download="style_mixed.png" class="btn-primary" style="margin-top: 8px; font-size: 11px;">Download Mixed</a>
            </div>
            <div>
              <div style="font-weight: 600; margin-bottom: 6px;">Identity B</div>
              <img id="mix-img-b" style="max-width: 100%; border: 1px solid var(--border-color); border-radius: 4px;">
            </div>
          </div>
        </div>
      </div>

      <div id="tab-content-noise" class="hidden">
        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label">Identity Latent Seed</label>
            <input type="number" id="noise-base-seed" class="form-input" value="105">
          </div>
          <div class="form-group">
            <label class="form-label">Stochastic Noise Seed (Per-pixel detail)</label>
            <input type="number" id="noise-var-seed" class="form-input" value="88">
          </div>
        </div>
        <button id="btn-style-noise" class="btn-primary">Inject Stochastic Noise</button>

        <div id="noise-results" class="result-box hidden">
          <div class="result-title">Noise Injection Side-by-Side & Difference Heatmap</div>
          <div class="grid-2col">
            <div style="text-align: center;">
              <div style="font-weight: 600; margin-bottom: 6px;">Face with Stochastic Detail</div>
              <img id="noise-img-base" style="max-width: 100%; border: 1px solid var(--border-color); border-radius: 4px;">
            </div>
            <div style="text-align: center;">
              <div style="font-weight: 600; margin-bottom: 6px;">Stochastic Difference Heatmap</div>
              <img id="noise-img-heat" style="max-width: 100%; border: 1px solid var(--border-color); border-radius: 4px;">
            </div>
          </div>
        </div>
      </div>
      <div id="exp07-msg"></div>
    `;

    $$('.tab-btn', el).forEach(btn => {
      btn.onclick = () => {
        $$('.tab-btn', el).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.getAttribute('data-tab');
        $('#tab-content-gen').classList.toggle('hidden', tab !== 'gen');
        $('#tab-content-mix').classList.toggle('hidden', tab !== 'mix');
        $('#tab-content-noise').classList.toggle('hidden', tab !== 'noise');
      };
    });

    $('#btn-style-gen').onclick = async () => {
      showMsg('#exp07-msg', '<span class="spinner"></span> Mapping Z to W and synthesizing StyleGAN layers...', false);
      try {
        const res = await fetch('/api/exp07/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ seed: parseInt($('#style-seed').value, 10) })
        });
        const data = await res.json();
        $('#exp07-msg').innerHTML = '';
        $('#style-gen-result').classList.remove('hidden');
        $('#style-gen-img').src = `data:image/png;base64,${data.image_base64}`;
        $('#style-gen-download').href = data.download_url;
      } catch (err) {
        showMsg('#exp07-msg', err.message, true);
      }
    };

    $('#mix-crossover').oninput = e => $('#crossover-val').textContent = e.target.value;
    $('#btn-style-mix').onclick = async () => {
      showMsg('#exp07-msg', '<span class="spinner"></span> Swapping latent W at crossover layer in AdaIN...', false);
      try {
        const res = await fetch('/api/exp07/mix-styles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            seed_a: parseInt($('#mix-seed-a').value, 10),
            seed_b: parseInt($('#mix-seed-b').value, 10),
            crossover_layer: parseInt($('#mix-crossover').value, 10)
          })
        });
        const data = await res.json();
        $('#exp07-msg').innerHTML = '';
        $('#mix-results').classList.remove('hidden');
        $('#mix-img-a').src = `data:image/png;base64,${data.img_a}`;
        $('#mix-img-b').src = `data:image/png;base64,${data.img_b}`;
        $('#mix-img-res').src = `data:image/png;base64,${data.mixed_base64}`;
        $('#mix-download').href = data.download_url;
      } catch (err) {
        showMsg('#exp07-msg', err.message, true);
      }
    };

    $('#btn-style-noise').onclick = async () => {
      showMsg('#exp07-msg', '<span class="spinner"></span> Injecting Gaussian detail noise to synthesis feature maps...', false);
      try {
        const res = await fetch('/api/exp07/inject-noise', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            seed: parseInt($('#noise-base-seed').value, 10),
            noise_seed: parseInt($('#noise-var-seed').value, 10)
          })
        });
        const data = await res.json();
        $('#exp07-msg').innerHTML = '';
        $('#noise-results').classList.remove('hidden');
        $('#noise-img-base').src = `data:image/png;base64,${data.base_image}`;
        $('#noise-img-heat').src = `data:image/png;base64,${data.heatmap_base64}`;
      } catch (err) {
        showMsg('#exp07-msg', err.message, true);
      }
    };
  }

  // Exp 8: MusicGen
  function mountExp08(el) {
    el.innerHTML = `
      <div class="form-group">
        <label class="form-label">Music Description Prompt</label>
        <input type="text" id="music-prompt" class="form-input" value="Lofi hip hop beats with warm jazz chords, gentle vinyl crackle and electric piano">
      </div>
      <div class="form-row-2">
        <div class="form-group">
          <label class="form-label">Duration (5 to 15 seconds): <span id="dur-val" class="slider-val">8s</span></label>
          <input type="range" id="music-duration" class="form-input" min="5" max="15" value="8">
        </div>
        <div class="form-group" style="display: flex; align-items: center; gap: 8px; margin-top: 24px;">
          <input type="checkbox" id="music-lora" style="width: 18px; height: 18px; accent-color: var(--accent-cobalt);">
          <label for="music-lora" class="form-label" style="margin-bottom: 0; cursor: pointer;">Enable LoRA Adapter (models/musicgen_lora)</label>
        </div>
      </div>
      <button id="btn-music-gen" class="btn-primary">Generate Music Composition</button>

      <div id="music-results" class="result-box hidden">
        <div class="result-title">Synthesized Audio Player</div>
        <div class="media-preview-box">
          <canvas id="waveform-canvas" class="waveform-canvas"></canvas>
          <audio id="audio-player" controls style="width: 100%; margin-top: 6px;"></audio>
          <div style="display: flex; gap: 12px; margin-top: 10px; align-items: center;">
            <a id="audio-download" download="generated_music.wav" class="btn-primary">Download .WAV Audio</a>
            <span id="audio-meta" class="exp-tag"></span>
          </div>
        </div>
      </div>
      <div id="exp08-msg"></div>
    `;

    $('#music-duration').oninput = e => $('#dur-val').textContent = `${e.target.value}s`;

    $('#btn-music-gen').onclick = async () => {
      const p = $('#music-prompt').value.trim();
      if (!p) {
        showMsg('#exp08-msg', 'Please enter a music prompt.', true);
        return;
      }

      showMsg('#exp08-msg', '<span class="spinner"></span> Generating acoustic codebooks via MusicGen Transformer...', false);
      try {
        const res = await fetch('/api/exp08/generate-music', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: p,
            duration: parseInt($('#music-duration').value, 10),
            use_lora: $('#music-lora').checked
          })
        });
        const data = await res.json();
        $('#exp08-msg').innerHTML = '';
        $('#music-results').classList.remove('hidden');

        const audioBlob = b64toBlob(data.audio_base64, 'audio/wav');
        const audioUrl = URL.createObjectURL(audioBlob);
        const player = $('#audio-player');
        player.src = audioUrl;

        $('#audio-download').href = data.download_url;
        $('#audio-meta').textContent = `${data.model} | ${data.duration}s | ${data.sample_rate}Hz`;

        const canvas = $('#waveform-canvas');
        if (canvas && data.waveform_preview) {
          const ctx = canvas.getContext('2d');
          canvas.width = canvas.offsetWidth || 500;
          canvas.height = 60;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#1d4ed8';

          const peaks = data.waveform_preview;
          const barW = canvas.width / peaks.length;
          peaks.forEach((peak, i) => {
            const h = peak * 50;
            ctx.fillRect(i * barW, (60 - h) / 2, barW - 1, h);
          });
        }
      } catch (err) {
        showMsg('#exp08-msg', err.message, true);
      }
    };
  }

  // Exp 9: RAG Assistant
  function mountExp09(el) {
    el.innerHTML = `
      <div class="section-box" style="margin-bottom: 20px;">
        <div class="section-heading">1. Ingest Knowledge Documents (PDF / TXT)</div>
        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <input type="file" id="rag-file-input" multiple accept=".txt,.pdf" class="form-input" style="max-width: 320px;">
          <button id="btn-upload-rag" class="btn-primary">Chunk & Embed into FAISS</button>
        </div>
        <div id="rag-upload-status" style="margin-top: 8px; font-size: 12px; color: var(--text-muted);"></div>
      </div>

      <div class="form-group">
        <label class="form-label">Ask Your Assistant</label>
        <input type="text" id="rag-question" class="form-input" value="What is the advantage of parameter-efficient fine-tuning with LoRA?">
      </div>
      
      <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
        <button id="btn-ask-rag" class="btn-primary">Query Assistant</button>
        <div style="display: flex; align-items: center; gap: 8px;">
          <input type="checkbox" id="rag-toggle-lora" style="width: 18px; height: 18px; accent-color: var(--accent-cobalt);">
          <label for="rag-toggle-lora" class="form-label" style="margin-bottom: 0; cursor: pointer;">Compare Base vs LoRA-tuned Model</label>
        </div>
      </div>

      <div id="rag-results" class="result-box hidden">
        <div class="result-title">Retrieved Grounding Chunks (from FAISS Index)</div>
        <div id="rag-chunks-container" style="display: grid; gap: 8px; margin-bottom: 18px;"></div>

        <div class="result-title">Response Comparison</div>
        <div class="grid-2col" id="rag-comparison-box">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 14px; border-radius: var(--radius-sm);">
            <div style="font-weight: 700; color: var(--text-muted); font-size: 12px; margin-bottom: 6px;">BASE FOUNDATION MODEL</div>
            <div id="rag-base-ans" style="font-size: 14px;"></div>
          </div>
          <div style="background: var(--bg-surface); border: 2px solid var(--accent-cobalt); padding: 14px; border-radius: var(--radius-sm);">
            <div style="font-weight: 700; color: var(--accent-cobalt); font-size: 12px; margin-bottom: 6px;">LoRA-TUNED ADAPTER (PEFT)</div>
            <div id="rag-lora-ans" style="font-size: 14px;"></div>
          </div>
        </div>
      </div>
      <div id="exp09-msg"></div>
    `;

    $('#btn-upload-rag').onclick = async () => {
      const input = $('#rag-file-input');
      if (!input.files.length) {
        showMsg('#exp09-msg', 'Please select at least one TXT or PDF file to index.', true);
        return;
      }
      const fd = new FormData();
      for (let i = 0; i < input.files.length; i++) {
        fd.append('files', input.files[i]);
      }
      showMsg('#exp09-msg', '<span class="spinner"></span> Extracting, chunking and computing embeddings...', false);
      try {
        const res = await fetch('/api/exp09/upload-docs', { method: 'POST', body: fd });
        const data = await res.json();
        $('#exp09-msg').innerHTML = '';
        $('#rag-upload-status').innerHTML = `✓ Indexed <strong>${data.total_chunks}</strong> chunks across ${data.files_processed} document(s) in FAISS memory.`;
        showToast('Documents indexed in FAISS');
      } catch (err) {
        showMsg('#exp09-msg', err.message, true);
      }
    };

    $('#btn-ask-rag').onclick = async () => {
      const q = $('#rag-question').value.trim();
      if (!q) {
        showMsg('#exp09-msg', 'Please enter a question.', true);
        return;
      }

      showMsg('#exp09-msg', '<span class="spinner"></span> Performing dense retrieval and generating response...', false);
      try {
        const res = await fetch('/api/exp09/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: q,
            use_lora: $('#rag-toggle-lora').checked
          })
        });
        const data = await res.json();
        $('#exp09-msg').innerHTML = '';
        $('#rag-results').classList.remove('hidden');

        $('#rag-chunks-container').innerHTML = (data.retrieved_chunks || []).map(c => `
          <div style="background: var(--bg-surface); padding: 10px 12px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 12px;">
            <strong style="color: var(--accent-cobalt);">Source: ${escapeHtml(c.source)} [Chunk #${c.id}]:</strong>
            <div style="margin-top: 4px; color: var(--text-secondary);">${escapeHtml(c.text)}</div>
          </div>
        `).join('');

        $('#rag-base-ans').textContent = data.base_answer;
        $('#rag-lora-ans').textContent = data.lora_answer;
      } catch (err) {
        showMsg('#exp09-msg', err.message, true);
      }
    };
  }

  // Exp 10: Damovilab Video
  function mountExp10(el) {
    el.innerHTML = `
      <div class="form-group">
        <label class="form-label">Video Prompt</label>
        <input type="text" id="video-prompt" class="form-input" value="An astronaut exploring Mars looking around at crimson dust and distant cosmic stars">
      </div>
      <div class="form-row-3">
        <div class="form-group">
          <label class="form-label">Frames (e.g. 16 frames)</label>
          <input type="number" id="video-frames" class="form-input" value="16" min="8" max="24">
        </div>
        <div class="form-group">
          <label class="form-label">Denoising Steps</label>
          <input type="number" id="video-steps" class="form-input" value="25" min="10" max="40">
        </div>
        <div class="form-group">
          <label class="form-label">Random Seed</label>
          <input type="number" id="video-seed" class="form-input" value="42">
        </div>
      </div>
      <button id="btn-video-gen" class="btn-primary">Generate Video with Damovilab</button>

      <div id="video-results" class="result-box hidden">
        <div class="result-title">Synthesized Video Player</div>
        <div class="media-preview-box">
          <img id="video-player-img" alt="Video Preview" style="border: 2px solid var(--border-color); border-radius: var(--radius-sm); max-width: 320px;">
          <div style="display: flex; gap: 12px; align-items: center; margin-top: 8px;">
            <a id="video-download" download="generated_video.gif" class="btn-primary">Download Video</a>
            <span id="video-meta" class="exp-tag"></span>
          </div>
        </div>
      </div>
      <div id="exp10-msg"></div>
    `;

    $('#btn-video-gen').onclick = async () => {
      const p = $('#video-prompt').value.trim();
      if (!p) {
        showMsg('#exp10-msg', 'Prompt must not be empty.', true);
        return;
      }

      showMsg('#exp10-msg', '<span class="spinner"></span> Denoising spatiotemporal video latents step-by-step...', false);
      try {
        const res = await fetch('/api/exp10/generate-video', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: p,
            num_frames: parseInt($('#video-frames').value, 10),
            steps: parseInt($('#video-steps').value, 10),
            seed: parseInt($('#video-seed').value, 10)
          })
        });
        const data = await res.json();
        $('#exp10-msg').innerHTML = '';
        $('#video-results').classList.remove('hidden');

        $('#video-player-img').src = `data:image/gif;base64,${data.video_base64}`;
        $('#video-download').href = data.download_url;
        $('#video-meta').textContent = `${data.model} | ${data.num_frames} frames | Seed ${data.seed}`;
      } catch (err) {
        showMsg('#exp10-msg', err.message, true);
      }
    };
  }

  function showMsg(targetSel, msg, isError = false) {
    const el = $(targetSel);
    if (!el) return;
    if (!msg) {
      el.innerHTML = '';
      return;
    }
    if (isError) {
      el.innerHTML = `<div class="alert-error">${msg}</div>`;
    } else {
      el.innerHTML = `<div style="margin-top: 14px; font-size: 13px; color: var(--accent-cobalt); font-weight: 500;">${msg}</div>`;
    }
  }

  function renderTable(targetSel, data) {
    const el = $(targetSel);
    if (!el || !Array.isArray(data) || !data.length) return;

    const cols = Object.keys(data[0]);
    el.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>${cols.map(c => `<th>${escapeHtml(c)}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${data.map(row => `
            <tr>${cols.map(c => `<td>${escapeHtml(row[c] !== undefined ? row[c] : '')}</td>`).join('')}</tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  function initMobileMenu() {
    const btn = $('#mobile-menu-btn');
    const drawer = $('#mobile-drawer');
    if (btn && drawer) {
      btn.onclick = () => drawer.classList.toggle('open');
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initNavigation();
    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    fetchSystemStatus();
    setInterval(fetchSystemStatus, 8000);
  });

})();
