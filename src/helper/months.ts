type MonthToTextDict = { [key: number]: string };
type TextToMonthDict = { [key: string]: number };

const MONTH_TO_TEXT: MonthToTextDict = {
	1: "enero",
	2: "febrero",
	3: "marzo",
	4: "abril",
	5: "mayo",
	6: "junio",
	7: "julio",
	8: "agosto",
	9: "septiembre",
	10: "octubre",
	11: "noviembre",
	12: "diciembre",
};

const TEXT_TO_MONTH: TextToMonthDict = {
	enero: 1,
	febrero: 2,
	marzo: 3,
	abril: 4,
	mayo: 5,
	junio: 6,
	julio: 7,
	agosto: 8,
	septiembre: 9,
	octubre: 10,
	noviembre: 11,
	diciembre: 12,
};

const getDateElements = (date: string) => {
	const [year, month, day] = date.split("-");
	return { year: Number(year), month: Number(month), day: Number(day) };
};

export const fromDateToText = (date: string) => {
	const dateElements = getDateElements(date);
	return `${MONTH_TO_TEXT[dateElements.month]} ${dateElements.year}`;
};

const fromTextToDate = (text: string, shouldBeTheFirst: boolean) => {
	const [month, year] = text.split(" ");
	return `${year}-${TEXT_TO_MONTH[month]}-${shouldBeTheFirst ? "01" : "31"}`;
};

export const isDateAfterStartDate = (a: string, b: string) => {
	const dateA = getDateElements(a);
	const dateB = getDateElements(fromTextToDate(b, true));

	if (dateA.year > dateB.year) return true;
	else if (dateA.year < dateB.year) return false;

	if (dateA.month > dateB.month) return true;
	else if (dateA.month < dateB.month) return false;

	if (dateA.day >= dateB.day) return true;
	return false;
};

export const isDateBeforeEndDate = (a: string, b: string) => {
	const dateA = getDateElements(a);
	const dateB = getDateElements(fromTextToDate(b, false));

	if (dateA.year < dateB.year) return true;
	else if (dateA.year > dateB.year) return false;

	if (dateA.month < dateB.month) return true;
	else if (dateA.month > dateB.month) return false;

	if (dateA.day <= dateB.day) return true;
	return false;
};
