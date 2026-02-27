const sortOptions = [
    { label: "Sắp xếp", value: { sortBy: "", order: "" } },
    { label: "Giá tăng dần", value: { sortBy: "price", order: "asc" } },
    { label: "Giá giảm dần", value: { sortBy: "price", order: "desc" } },
    { label: "Tên từ a-z", value: { sortBy: "title", order: "asc" } },
    { label: "Tên từ z-a", value: { sortBy: "title", order: "desc" } },
];

export { sortOptions };