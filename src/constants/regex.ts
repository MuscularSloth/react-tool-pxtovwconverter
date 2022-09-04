export const HEX_WEBCOLOR_PATTERN =
	'^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|[a-fA-F0-9]{8})$';
export const ONLY_HEX_CHARACTERES = '^#?[A-Fa-f0-9]{0,8}$';
export const REGEX_IS_PX_VALUE = /([0-9]+)px/g;
export const REGEX_IS_CSS_RULE =
	/^[/\w\s-]+\s*:\s*[\w\s#'"(),.$:%/!-]+\t*\n*\r*;$/gm;
export const REGEX_IS_EMPTY_SELECTOR = /[^{}]*\w*\s*\d*{{1}[^\w\d}]*}{1}$/gm;
export const REGEX_IS_EXACTLY_RULE =
	/(rule-here)[\w\s#'"(),.$:%/!-]*:\s*[\w\s#'"(),.$:%/!-]+\t*\n*\r*;$/gm;
export const REGEX_IS_EXACTLY_RULE_FN = (rule: string) =>
	// eslint-disable-next-line no-useless-escape
	new RegExp(
		// `(${rule})[\\w\\s#'"(),.$:%/!-]*:\\s*[\\w\\s#'"(),.$:%/!-]+\\t*\\n*\\r*;$`,
		`^\\s*(${rule}){1}\\s*:\\s*[\\w\\s#'"(),.$:%/!-]+\\t*\\n*\\r*;$`,
		'gm',
	);

// /(border)[\w\s#'"(),.$:%/!-]*:\s*[\w\s#'"(),.$:%/!-]+\t*\n*\r*;$/gm
// /(border)[\w\s#'"(),.$:%/!-]*:\s*[\w\s#'"(),.$:%/!-]+\t*\n*\r*;$/gm
// border: hello;
// border : 1px solid #ddd;
// border-bottom: 1px solid #ddd;
// border-top : 1px solid red;
// border-left: 1px solid $color;
