export default (a,b)=> a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0