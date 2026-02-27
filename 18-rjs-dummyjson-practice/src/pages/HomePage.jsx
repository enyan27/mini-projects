import { sortOptions } from "../constants";
import { useFetchList, useQuery } from "../hooks";

const HomePage = () => {
    const [query, updateQuery, resetQuery] = useQuery({ q: "", page: 1, limit: 5 });
    const [data] = useFetchList("products", query);

    const handleSearch = (e) => updateQuery({ q: e.target.value, page: 1 });
    const handleSort = (e) => updateQuery({ ...sortOptions[e.target.value].value, page: 1 });
    const handleLimit = (e) => updateQuery({ limit: Number(e.target.value), page: 1 });
    const handlePage = (newPage) => {
        if (newPage < 1) return;
        updateQuery({ page: newPage });
    }

    // Page 1: (1-1)/4 = 0 --> 0*4+1 = 1
    // Page 4: (4-1)/4 = 0.75 --> 0*4+1 = 1
    // Page 5: (5-1)/4 = 1 --> 1*4+1 = 5
    const startPage = Math.floor((query.page - 1) / 4) * 4 + 1;
    const currentGroup = [startPage, startPage + 1, startPage + 2, startPage + 3];

    return (
        <>
            <div className="flex flex-col items-center space-y-4 pt-4">
                <div className="join">
                    {/* SEARCH */}
                    <input className="join-item input w-60" onChange={handleSearch} placeholder="Type here to search..." />
                    {/* SORT */}
                    <select className="join-item select w-24" onChange={handleSort}>
                        {sortOptions.map((item, i) => (
                            <option key={i} value={i}>{item.label}</option>
                        ))}
                    </select>
                    {/* LIMIT */}
                    <select className="join-item select w-16" onChange={handleLimit}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>
                {/* PRODUCTS */}
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-full max-w-5xl">
                    <table className="table table-zebra">
                        {/* HEAD */}
                        <thead className="bg-base-200">
                            <tr>
                                <th></th>
                                <th>Tên sản phẩm</th>
                                <th>Brand</th>
                                <th>Giá</th>
                                <th>Mô tả</th>
                            </tr>
                        </thead>
                        {/* BODY */}
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id} className="hover:bg-base-200">
                                    <th>{item.id}</th>
                                    <th>{item.title}</th>
                                    <td>{item.brand}</td>
                                    <td>{item.price}</td>
                                    <td>{item.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* PAGINATION */}
                <div className="join">
                    <button className="join-item btn" onClick={() => handlePage(query.page - 1)}>«</button>
                    {currentGroup.map((item) => (
                        <button
                            key={item}
                            className={`join-item btn ${item === query.page ? "btn-active btn-primary" : ""}`}
                            onClick={() => handlePage(item)}>
                            {item}
                        </button>
                    ))}
                    <button className="join-item btn" onClick={() => handlePage(query.page + 1)}>»</button>
                </div>
            </div >
        </>
    )
}

export default HomePage;