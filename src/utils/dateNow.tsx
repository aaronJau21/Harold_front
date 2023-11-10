export default function getFormattedDate() {
  const today = new Date();
  const year = today.getFullYear();
  let month = (today.getMonth() + 1).toString();
  let day = today.getDate().toString();

  if (month.length === 1) {
    month = "0" + month; // Agrega un cero si el mes es de un solo dígito
  }

  if (day.length === 1) {
    day = "0" + day; // Agrega un cero si el día es de un solo dígito
  }

  return `${year}-${month}-${day}`;
}
