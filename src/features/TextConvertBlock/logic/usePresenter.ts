import { useState } from 'react'
import {
  REGEX_IS_CSS_RULE,
  REGEX_IS_EMPTY_SELECTOR,
  REGEX_IS_EXACTLY_RULE_FN,
  REGEX_IS_PX_VALUE,
} from '@/features/TextConvertBlock/logic/constants.ts'
import { useTextConvert } from '@/shared/hooks/use-text-convert-options.ts'
import {
  clearCSSRulesWithoutVW,
  replacePXToVW,
} from '@/features/TextConvertBlock/logic/utils.ts'
import { useSelectedWidth } from '@/shared/hooks/use-selected-width.ts'

export function usePresenter() {
  const { selectedWidth } = useSelectedWidth()
  const { textConvertOptions } = useTextConvert()
  const [text, setText] = useState<string>('')
  const [convertedText, setConvertedText] = useState<string>('')

  const onClearAll = () => {
    setText('')
    setConvertedText('')
  }

  const onConvertText = () => {
    let convertedText = text
    const needRunExcludeRulesLogic =
      textConvertOptions.excludeRulesEnabled &&
      textConvertOptions.excludeRulesArray.length > 0

    if (needRunExcludeRulesLogic) {
      textConvertOptions.excludeRulesArray.forEach((excludedRule) => {
        convertedText = convertedText.replace(
          REGEX_IS_EXACTLY_RULE_FN(excludedRule),
          '',
        )
      })
    }

    convertedText = convertedText.replace(REGEX_IS_PX_VALUE, (match, value) =>
      replacePXToVW(
        match,
        parseFloat(value),
        textConvertOptions,
        selectedWidth,
      ),
    )

    if (textConvertOptions.removeRowsWithoutPx) {
      convertedText = convertedText.replace(
        REGEX_IS_CSS_RULE,
        clearCSSRulesWithoutVW,
      )
    }

    if (textConvertOptions.removeEmptySelectors) {
      do {
        convertedText = convertedText.replace(
          REGEX_IS_EMPTY_SELECTOR,
          clearCSSRulesWithoutVW,
        )
      } while (REGEX_IS_EMPTY_SELECTOR.test(convertedText))
    }

    const rowsSplit = convertedText.split(/\r?\n/)
    const emptyRowsCleared = rowsSplit.filter((row) => row !== '')
    convertedText = emptyRowsCleared.join('\n')

    setConvertedText(convertedText)
  }

  return {
    text,
    setText,
    convertedText,
    setConvertedText,
    onClearAll,
    onConvertText,
  }
}
