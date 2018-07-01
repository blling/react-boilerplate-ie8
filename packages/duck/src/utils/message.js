function formatMessage(value, params) {
  let formatValue = value;
  if (params) {
    formatValue = params.map((v, index) => {
      const re = new RegExp(`\\{${index}\\}`);
      return formatValue.replace(re, v);
    });
  }

  return formatValue;
}

export default function message(msg, key, params) {
  const value = msg[key];

  if (!value) {
    return key;
  }

  return formatMessage(value, params);
}
