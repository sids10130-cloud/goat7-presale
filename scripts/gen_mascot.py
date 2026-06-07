"""One-shot script to generate the GOAT7 premium mascot image via Nano Banana."""
import asyncio
import base64
import os
from pathlib import Path

from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")

PROMPT = (
    "Ultra-premium 3D crypto mascot character: a regal, muscular black billy goat shown from the "
    "chest up, facing the camera directly. JET BLACK glossy fur with subtle hair detail. "
    "MASSIVE curled golden horns with intricate metallic texture and reflections, "
    "catching warm rim light. GLOWING NEON GREEN EYES emitting a soft volumetric light. "
    "Wearing a regal solid GOLD CROWN with diamond and emerald inlays sitting between the horns. "
    "Subtle gold chain. Pitch BLACK studio background with soft cinematic side lighting in warm "
    "gold and emerald green. Centered composition, square 1:1 aspect ratio, the mascot fills most "
    "of the frame. Photoreal CGI, hyperdetailed, octane render, 8K, luxury meme coin character "
    "branding, no text, no logo, no watermark."
)


async def main():
    api_key = os.getenv("EMERGENT_LLM_KEY")
    if not api_key:
        raise RuntimeError("EMERGENT_LLM_KEY not set in /app/backend/.env")

    chat = LlmChat(
        api_key=api_key,
        session_id="goat7-mascot-gen",
        system_message="You are an expert 3D character artist who renders premium crypto mascot art.",
    )
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])

    msg = UserMessage(text=PROMPT)
    text, images = await chat.send_message_multimodal_response(msg)

    out_dir = Path("/app/frontend/public")
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / "mascot-goat.png"

    if not images:
        raise RuntimeError(f"No image returned. Text: {text[:300] if text else ''}")

    image_bytes = base64.b64decode(images[0]["data"])
    out_path.write_bytes(image_bytes)
    print(f"OK saved {out_path} ({len(image_bytes)} bytes)")


if __name__ == "__main__":
    asyncio.run(main())
