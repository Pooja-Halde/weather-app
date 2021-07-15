const celsiusToFarenheit = celsius => (celsius * 9/5) + 32;
const farenheitToCelsius = farenheit => (farenheit - 32) * 5/9;

const nth = n => ["st","nd","rd"][((n+90)%100-10)%10-1]||"th";

const getUnitType = (unit) => (unit === 'Farenheit') ? 'imperial' : 'metric';

export { nth, getUnitType }