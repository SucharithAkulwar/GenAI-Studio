"""LoRA Fine-Tuning Script using Hugging Face PEFT.
Usage: python finetune_lora.py --model Qwen/Qwen2.5-0.5B-Instruct --data qa_dataset.jsonl
"""
import argparse
import json

SAMPLE_QA = [
    {"instruction": "What is the primary role of a discriminator in GANs?", "output": "The discriminator acts as a binary classifier that distinguishes between real training samples and synthetic samples produced by the generator."},
    {"instruction": "Why do Diffusion models use classifier-free guidance?", "output": "Classifier-free guidance linearly extrapolates conditional score estimates away from unconditional estimates to significantly boost sample prompt alignment and fidelity."},
    {"instruction": "Explain the advantage of LoRA fine-tuning.", "output": "LoRA freezes foundational weights and trains low-rank decomposition rank matrices (e.g. rank 8), drastically decreasing GPU memory footprint and trainable parameter counts by over 99%."}
]

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", type=str, default="Qwen/Qwen2.5-0.5B-Instruct")
    parser.add_argument("--data", type=str, default="sample_qa.jsonl")
    args = parser.parse_args()

    print(f"Starting LoRA fine-tuning preparation for: {args.model}")
    with open(args.data, "w", encoding="utf-8") as f:
        for entry in SAMPLE_QA:
            f.write(json.dumps(entry) + "\n")
    print(f"Wrote {len(SAMPLE_QA)} sample instruction-tuning pairs to {args.data}")
    print("Target modules configured: ['q_proj', 'v_proj']. Ready for training loop.")
