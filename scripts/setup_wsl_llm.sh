#!/bin/bash
# Otonom Fabrika V3.0 - Linux (WSL2) LLM Sunucu Kurulum Betiği

set -e # Hata olursa dur

echo "🚀 Fabrika Motorları Kuruluyor: vLLM ve TabbyAPI (ExLlamaV2)"

echo "📦 1. Sistem güncelleniyor ve bağımlılıklar yükleniyor..."
sudo apt-get update && sudo apt-get install -y python3 python3-venv python3-pip git build-essential wget curl

echo "🐍 2. Python Sanal Ortamları (venv) oluşturuluyor..."
mkdir -p ~/ai-servers
cd ~/ai-servers

# vLLM kurulumu
echo "🔥 3. vLLM (AWQ / PagedAttention) kuruluyor..."
python3 -m venv vllm-env
source vllm-env/bin/activate
pip install --upgrade pip
pip install vllm
pip install hf_transfer # HuggingFace hızlandırıcısı
deactivate

# TabbyAPI (ExLlamaV2) kurulumu
echo "🧠 4. TabbyAPI (ExLlamaV2) kuruluyor..."
python3 -m venv tabby-env
source tabby-env/bin/activate
pip install --upgrade pip
if [ ! -d "tabbyAPI" ]; then
  git clone https://github.com/theroyallab/tabbyAPI.git
fi
cd tabbyAPI
pip install .
deactivate
cd ..

echo "📥 5. Model klasörleri hazırlanıyor..."
mkdir -p ~/models

echo "✅ Kurulum tamamlandı!"
echo ""
echo "--------------------------------------------------------"
echo "👉 Modelleri indirmek için Ubuntu terminaline girilecek yeni nesil komutlar:"
echo ""
echo "source ~/ai-servers/vllm-env/bin/activate"
echo "export HF_XET_HIGH_PERFORMANCE=1"
echo "hf download Qwen/Qwen2.5-Coder-32B-Instruct-AWQ --local-dir ~/models/Qwen-32B-AWQ"
echo "hf download turboderp/Llama-3.3-70B-Instruct-exl2-2.5bpw --local-dir ~/models/Llama-70B-EXL2"
echo "--------------------------------------------------------"
