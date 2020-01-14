/**
 * clone data simply with JSON.parse and JSON.stringify.
 * 
 * @param v
 */
export const deepClone = (v: any) => JSON.parse(JSON.stringify(v));