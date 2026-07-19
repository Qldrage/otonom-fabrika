#!/bin/bash
# Kesintilere ve çökmelere karşı korumalı, sonsuz döngülü indirme betiği

source ~/ai-servers/vllm-env/bin/activate
# Hatalı hızlandırıcıları zorla kapat
export HF_XET_HIGH_PERFORMANCE=0
unset HF_HUB_ENABLE_HF_TRANSFER

echo "🤖 Otonom Ajan Devrede: DeepSeek R1 indirilmeye başlanıyor..."
while true; do
  hf download casperhansen/deepseek-r1-distill-qwen-32b-awq --local-dir ~/models/DeepSeek-R1-32B-AWQ
  if [ $? -eq 0 ]; then
    echo "✅ DeepSeek R1 başarıyla indirildi!"
    break
  fi
  echo "⚠️ İndirme çöktü veya koptu. 5 saniye içinde kaldığı yerden (resume) tekrar başlatılıyor..."
  sleep 5
done

echo "🤖 Otonom Ajan Devrede: Llama 3.3 70B indirilmeye başlanıyor..."
while true; do
  hf download LoneStriker/Llama-3.3-70B-Instruct-2.4bpw-h6-exl2 --local-dir ~/models/Llama-70B-EXL2
  if [ $? -eq 0 ]; then
    echo "✅ Llama 3.3 70B başarıyla indirildi!"
    break
  fi
  echo "⚠️ İndirme çöktü veya koptu. 5 saniye içinde kaldığı yerden (resume) tekrar başlatılıyor..."
  sleep 5
done

echo "🎉 TÜM MODELLER BAŞARIYLA İNDİRİLDİ!"
