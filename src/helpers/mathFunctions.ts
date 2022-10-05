export function getNearestEven(value: number): number {
	const result = value % 2 !== 0 ? getNearestEven((value -= 1)) : value;
	return result;
}
export function getNearestOdd(value: number): number {
	const result = value % 2 === 0 ? getNearestOdd((value -= 1)) : value;
	return result;
}
export function getNearestDivByFive(value: number): number {
	const result = value % 5 !== 0 ? getNearestDivByFive((value -= 1)) : value;
	return result;
}
export function getNearestDivByTen(value: number): number {
	const result = value % 10 !== 0 ? getNearestDivByTen((value -= 1)) : value;
	return result;
}
