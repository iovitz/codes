interface Translater {
  getTokes(words: string): string[]

  translate(tokens: string[]): string
}

class EnglishTranslater implements Translater {
  getTokes(words: string): string[] {
    return words.split(' ')
  }
  translate(tokens: string[]): string {
    return `English: ${tokens.join(' ')}`
  }
}
class ChineseTransformer implements Translater {
  getTokes(words: string): string[] {
    return words.split(' ')
  }
  translate(tokens: string[]): string {
    return `Chinese: ${tokens.join(' ')}`
  }
}
class TranslaterAdaptor {
  constructor(private originTranslater: Translater, private targetTranslater: Translater) {}
  translate(words: string) {
    return this.targetTranslater.translate(this.originTranslater.getTokes(words))
  }
}

const translater = new TranslaterAdaptor(new EnglishTranslater(), new ChineseTransformer())

console.log(translater.translate('Nice to meet you.'))
