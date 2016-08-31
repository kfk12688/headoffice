/**
 * Created by sharavan on 26/08/16.
 */
const isEvent = candidate => !!(candidate && candidate.stopPropagation && candidate.preventDefault)

export default isEvent
