export const departmentAdapter = {
  list: ({ q, page, limit, sortBy, sort }) => {
    const sp = new URLSearchParams({
      q: q ?? "",
      page: String(page ?? 1),
      limit: String(limit ?? 200),
      sortBy: String(sortBy ?? "id"),
      sort: String(sort ?? "asc"),
    });
    return `/api/departments?${sp}`;
  },
  upsert: () => `/api/departments`,
  remove: (id) => `/api/departments/${id}`,
};