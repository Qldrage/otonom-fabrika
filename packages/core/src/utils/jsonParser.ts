/**
 * extractJSON
 * LLM çıktılarındaki gereksiz metinleri veya markdown (```json ... ```) 
 * kısımlarını temizleyerek sadece geçerli JSON objesini ayıklar.
 */
export function extractJSON(text: string): any {
  if (!text) throw new Error("Boş metinden JSON ayıklanamaz.");

  // Zaten JSON formatındaysa direkt dönmeyi dene
  try {
    return JSON.parse(text);
  } catch (e) {
    // Parsing başarısız olduysa, temizleme işlemine geç
  }

  // Regex ile markdown içindeki JSON'u bul
  const jsonRegex = /```(?:json)?\s*([\s\S]*?)\s*```/;
  const match = text.match(jsonRegex);

  let jsonStr = match ? match[1] : text;

  // Başta ve sonda fazladan boşluklar kalmış olabilir, ya da JSON sadece { ve } arasında
  const firstBrace = jsonStr.indexOf('{');
  const lastBrace = jsonStr.lastIndexOf('}');

  if (firstBrace !== -1 && lastBrace !== -1) {
    jsonStr = jsonStr.substring(firstBrace, lastBrace + 1);
  } else {
    throw new Error("Çıktı içinde geçerli bir JSON objesi '{}' bulunamadı.");
  }

  try {
    return JSON.parse(jsonStr);
  } catch (err: any) {
    throw new Error(`JSON Ayrıştırma Hatası: ${err.message}\nRaw Text: ${jsonStr}`);
  }
}

/**
 * extractCodeBlock
 * Qwen-14B gibi modellerin ürettiği metinden markdown kod bloğunu (``` ... ```)
 * temizleyerek saf kodu döndürür.
 */
export function extractCodeBlock(text: string): string {
  if (!text) return "";
  const codeRegex = /```[a-z]*\s*([\s\S]*?)\s*```/;
  const match = text.match(codeRegex);
  return match ? match[1].trim() : text.trim();
}
