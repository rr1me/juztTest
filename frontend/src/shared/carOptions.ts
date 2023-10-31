export enum CarColor {
	Unset,
	White,
	Gray,
	Black,
	Blue,
	Silver,
	Brown,
	Red,
	Green,
	Beige,
	Orange,
	Cyan,
	Yellow,
	Other,
}

export enum Engine {
	Gasoline,
	Diesel,
	Electrical,
}

export enum Transmission {
	Auto,
	Manual,
	Robotic,
}

export type Car = {
	id: number;
	brand: string;
	model: string;
	color: CarColor;
	price: number;
	year: number;
	engine: Engine;
	transmission: Transmission;
	cruisingRange: number
}

export const carColorOptions: (keyof typeof CarColor)[] = [
	'Unset',
	'White',
	'Gray',
	'Black',
	'Blue',
	'Silver',
	'Brown',
	'Red',
	'Green',
	'Beige',
	'Orange',
	'Cyan',
	'Yellow',
	'Other',
];

export const carEngineOptions: (keyof typeof Engine)[] = [
	'Gasoline',
	'Diesel',
	'Electrical'
];

export const carTransmissionOptions: (keyof typeof Transmission)[] = [
	'Auto',
	'Manual',
	'Robotic'
];
