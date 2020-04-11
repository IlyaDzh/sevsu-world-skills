import format from "date-fns/format";

export default date => {
    return format(Date.parse(date), "dd.MM.yyyy");
};
