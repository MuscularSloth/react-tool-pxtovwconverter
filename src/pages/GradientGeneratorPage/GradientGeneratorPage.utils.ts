//Types
import type {
  GradientColorsListTypes,
  CirclePosition,
  GradientTypeMap,
} from './GradientGeneratorPage.types';

export function getCalculatedGradientString(
  {key: gradientType, value: gradientTypeValue}: GradientTypeMap,
  gradientAngle: number,
  circlePosition: CirclePosition,
  gradientColorsSet: GradientColorsListTypes[],
): string {
  let gradientString = `${gradientTypeValue}(`;

  switch (gradientType) {
    case 'linearGradient':
    case 'repeatinglinearGradient':
      gradientString += `${gradientAngle}deg`;
      break;
    case 'radialGradient':
    case 'repeatingRadialGradient':
      gradientString += `circle at ${circlePosition.x}% ${circlePosition.y}%`;
      break;
    case 'conicGradient':
      gradientString += `from ${gradientAngle}deg at ${circlePosition.x}% ${circlePosition.y}%`;
      break;
    default:
  }

  gradientString = gradientColorsSet.reduce(
    (colorString, {color, stop}) => `${colorString}, ${color} ${stop}%`,
    gradientString,
  );

  gradientString += ')';

  return gradientString;
}
