#!/bin/bash
# ============================================================
# Otonom Fabrika - TabbyAPI (ExLlamaV2) Sunucu Baslatici
# Port 5000: Llama 3.3 70B EXL2 2.4bpw (Mimar / Lead Dev)
# Llama 70B indirmesi tamamlandiktan sonra calistirin!
# ============================================================

source ~/ai-servers/vllm-env/bin/activate

# TabbyAPI kurulu mu kontrol et
if [ ! -d "$HOME/ai-servers/tabbyAPI" ]; then
  echo "[TabbyAPI] Kuruluyor (GitHub Clone)..."
  git clone https://github.com/theroyallab/tabbyAPI.git ~/ai-servers/tabbyAPI
  cd ~/ai-servers/tabbyAPI
  pip install .
else
  cd ~/ai-servers/tabbyAPI
fi

echo "=============================================="
echo " OTONOM FABRIKA - Llama 70B (TabbyAPI) Baslatiliyor"
echo " PORT: 5000"
echo "=============================================="

# JIT Derlemesi sırasında (exllamav3) RAM'in çökmesini engellemek için paralel iş sayısını limitliyoruz
export MAX_JOBS=2

# Sabit API anahtarlarımızı yazıyoruz ki WorkflowOrchestrator yetki hatası almasın
echo -e "api_key: sk-local\nadmin_key: sk-admin" > api_tokens.yml

# TabbyAPI doğrudan kendi klasöründeki start.sh veya python main.py ile başlar
python main.py \
  --model-dir ~/models \
  --model-name Llama-70B-EXL2 \
  --host 0.0.0.0 \
  --port 5000 \
  --max-seq-len 8192 \
  --rope-scale 1.0

echo "[TabbyAPI] Sunucu kapatildi."
