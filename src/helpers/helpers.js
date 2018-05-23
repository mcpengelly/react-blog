/**
 * creates an abbreviation from a string of words seperated by spaces
 * @param  {String} a string of words seperated by spaces
 * @return {String} string abbreviation of the input string
 */
// export function _abbreviate (str) {
//   return str.split(' ').map(word => word[0])
// }

export function formatDate (date) {
  return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getYear()
}
