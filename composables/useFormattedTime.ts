import moment from "moment"

export const useFormattedTime = () => {
  return `[${moment().format("DD/MM/YY HH:mm:ss")}]`
}
