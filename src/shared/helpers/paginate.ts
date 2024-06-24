export interface IPaginateData<T> {
  data: T;
  pages: number;
}

export function paginate<T>(array: T, page_size: number, page_number: number): IPaginateData<T> {
  if (!Array.isArray(array)) throw new Error('first argument must be an array');

  return {
    data: array.slice((page_number - 1) * page_size, page_number * page_size) as T,
    pages: array.length / page_size,
  };
}
