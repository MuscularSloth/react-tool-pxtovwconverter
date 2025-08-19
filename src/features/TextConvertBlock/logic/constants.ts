export const HEX_WEBCOLOR_PATTERN =
  '^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|[a-fA-F0-9]{8})$'
export const ONLY_HEX_CHARACTERS = '^#?[A-Fa-f0-9]{0,8}$'
export const REGEX_IS_PX_VALUE = /([0-9]+)px/g
export const REGEX_IS_CSS_RULE =
  /^[/\w\s-]+\s*:\s*[\w\s#'"(),.$:%/!-]+\t*\n*\r*;$/gm

export const REGEX_IS_EMPTY_SELECTOR = /[\t\s\]*[\.\w\-&:]+{[\s\t\n\r]*}/g

export const REGEX_IS_EXACTLY_RULE_FN = (rule: string) =>
  new RegExp(
    // `(${rule})[\\w\\s#'"(),.$:%/!-]*:\\s*[\\w\\s#'"(),.$:%/!-]+\\t*\\n*\\r*;$`,
    `^\\s*(${rule}){1}\\s*:\\s*[\\w\\s#'"(),.$:%/!-]+\\t*\\n*\\r*;$`,
    'gm',
  )
