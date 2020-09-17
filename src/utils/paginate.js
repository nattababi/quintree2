export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
  //return items;
};

export function prepareAndPaginate(overreads, currentPage, pageSize) {

  const overreadsPaginated = paginate(overreads, currentPage, pageSize);
  return overreadsPaginated;

};