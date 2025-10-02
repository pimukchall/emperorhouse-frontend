export const roleAdapter = {
  list: ({ q, page, limit, sortBy, sort }) => {
    const sp = new URLSearchParams({
      q: q ?? "",
      page: String(page ?? 1),
      limit: String(limit ?? 200),
      sortBy: String(sortBy ?? "id"),
      sort: String(sort ?? "asc"),
    });
    return `/api/roles?${sp.toString()}`;
  },
  upsert: () => `/api/roles`,
  remove: (id) => `/api/roles/${id}`,
};