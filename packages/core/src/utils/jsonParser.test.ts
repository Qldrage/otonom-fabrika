import { describe, it, expect } from 'vitest'
import { extractJSON, extractCodeBlock } from './jsonParser'

describe('extractJSON', () => {
  it('düz JSON string\'i parse eder', () => {
    const result = extractJSON('{"key": "value"}')
    expect(result).toEqual({ key: 'value' })
  })

  it('markdown code block içindeki JSON\'u ayıklar', () => {
    const input = '```json\n{"name": "test"}\n```'
    expect(extractJSON(input)).toEqual({ name: 'test' })
  })

  it('dil etiketi olmayan code block\'u işler', () => {
    const input = '```\n{"x": 1}\n```'
    expect(extractJSON(input)).toEqual({ x: 1 })
  })

  it('metin içine gömülü JSON\'u ayıklar', () => {
    const input = 'İşte sonuç: {"status": "ok"} başarılı.'
    expect(extractJSON(input)).toEqual({ status: 'ok' })
  })

  it('boş metin için hata fırlatır', () => {
    expect(() => extractJSON('')).toThrow('Boş metinden JSON ayıklanamaz.')
  })

  it('JSON olmayan metin için hata fırlatır', () => {
    expect(() => extractJSON('merhaba dünya')).toThrow()
  })
})

describe('extractCodeBlock', () => {
  it('typescript code block\'u temizler', () => {
    const input = '```typescript\nconst x = 1\n```'
    expect(extractCodeBlock(input)).toBe('const x = 1')
  })

  it('kod bloğu yoksa metni olduğu gibi döndürür', () => {
    expect(extractCodeBlock('sade metin')).toBe('sade metin')
  })

  it('boş metin için boş string döndürür', () => {
    expect(extractCodeBlock('')).toBe('')
  })

  it('başındaki ve sonundaki boşlukları temizler', () => {
    const input = '```\n  const y = 2  \n```'
    expect(extractCodeBlock(input)).toBe('const y = 2')
  })
})
