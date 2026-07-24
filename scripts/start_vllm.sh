#!/bin/bash
# ============================================================
# Otonom Fabrika - vLLM Sunucusu Başlatıcı
# Port 8000: Qwen 2.5 Coder 32B AWQ (Ana Kodlama Ajani)
# Port 8001: Qwen VL 7B AWQ (Gorsel Test Ajani)
# ============================================================

source ~/ai-servers/vllm-env/bin/activate

echo "=============================================="
echo " OTONOM FABRIKA - vLLM Sunuculari Baslatiliyor"
echo "=============================================="

# ------------------------------------------------------------------
# SUNUCU 1: Qwen 2.5 Coder 14B (Port 8000) - Ana Kodlama Modeli
# ------------------------------------------------------------------
echo "[1/2] Qwen 14B Coder baslatiliyor -> PORT 8000..."
python -m vllm.entrypoints.openai.api_server \
  --model Qwen/Qwen2.5-Coder-14B-Instruct-AWQ \
  --served-model-name "Qwen/Qwen2.5-Coder-14B-Instruct-AWQ" \
  --quantization awq \
  --port 8000 \
  --host 0.0.0.0 \
  --max-model-len 4096 \
  --gpu-memory-utilization 0.55 \
  --enforce-eager \
  --dtype auto &

QWEN_PID=$!
echo "[1/2] Qwen 32B PID: $QWEN_PID"

# ------------------------------------------------------------------
# SUNUCU 2: Qwen VL 7B (Port 8001) - Gorsel Test + Embedding Modeli
# ------------------------------------------------------------------
echo "[2/2] Qwen VL 7B baslatiliyor -> PORT 8001..."
python -m vllm.entrypoints.openai.api_server \
  --model Qwen/Qwen2-VL-7B-Instruct-AWQ \
  --served-model-name "Qwen/Qwen2-VL-7B-Instruct-AWQ" \
  --quantization awq \
  --port 8001 \
  --host 0.0.0.0 \
  --max-model-len 4096 \
  --gpu-memory-utilization 0.40 \
  --enforce-eager \
  --dtype auto &

VL_PID=$!
echo "[2/2] Qwen VL 7B PID: $VL_PID"

echo ""
echo "=============================================="
echo " Her iki sunucu da arka planda baslatildi!"
echo " Qwen 32B: http://localhost:8000/v1"
echo " Qwen VL : http://localhost:8001/v1"
echo " Model yuklenene kadar ~60-90 saniye bekleyin"
echo "=============================================="
echo ""
echo "Hazir olup olmadigini test etmek icin:"
echo "  curl http://localhost:8000/v1/models"
echo "  curl http://localhost:8001/v1/models"
echo ""

# Her iki sunucu da calismaya devam etsin
wait $QWEN_PID $VL_PID
