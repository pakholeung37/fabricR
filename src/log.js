/**
 * Wrapper around `console.log` (when available)
 * @param {*} [values] Values to log
 */
export const log = console.log

/**
 * Wrapper around `console.warn` (when available)
 * @param {*} [values] Values to log as a warning
 */
export const warn = console.warn

// TODO
getGlobalThis().fabric.log = log
getGlobalThis().fabric.warn = warn
