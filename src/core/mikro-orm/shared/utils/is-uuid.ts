
const uuidRegex = /^[[:xdigit:]]{8}(?:\-[[:xdigit:]]{4}){3}\-[[:xdigit:]]{12}$/i;

const isUuid = (value: string) => uuidRegex.test(value);

export default isUuid;
