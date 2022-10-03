const getGreatestCommonDivisor = (
	numberOne: number,
	numberTwo: number,
): number | false => {
	if (typeof numberOne !== 'number' || typeof numberTwo !== 'number') {
		return false;
	}

	numberOne = Math.abs(numberOne);
	numberTwo = Math.abs(numberTwo);

	if (numberTwo > numberOne) [numberOne, numberTwo] = [numberTwo, numberOne];

	return numberOne % numberTwo
		? getGreatestCommonDivisor(numberTwo, numberOne % numberTwo)
		: numberTwo;
};

export default getGreatestCommonDivisor;
