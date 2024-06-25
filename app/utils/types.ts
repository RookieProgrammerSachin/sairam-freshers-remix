/** Utility type that provides all keys of an object */
export type ObjectKeys<Obj> = keyof Obj;

export const objectKeys = <O>(object: O): (keyof O)[] => {
  return Object.keys(object) as (keyof O)[];
};
