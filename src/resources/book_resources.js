const allBooksResources = (books) => {
  return books.map((item) => {
    return {
      id: item.id,
      name: item.name,
      publisher: item.publisher,
    };
  });
};

export { allBooksResources };
