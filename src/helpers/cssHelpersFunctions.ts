export const clearCSSRulesWithoutVW = (match: string): string => {
  console.log({match});

  if (match.includes('vw')) {
    return match;
  }
  return '';
};

export const clearCSSExactlyRules = (match: string): string => {
  console.log('match >>> ', match);

  return '';
};
