import { SearchOutlined } from "@ant-design/icons";
import { Input, Table } from "antd";
import { FaSearch } from "react-icons/fa";
import { GetAllReaders } from "../../redux";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  SelectReader,
  SearchAuthor,
  SearchReader,
  SearchLibrarian,
  SearchCategory,
  SearchBook,
  SearchPackages,
  SearchProducts,
  SearchProductCategory,
} from "../../redux";

const DataTable = ({
  data,
  columns,
  width,
  pagination,
  selection,
  Search,
  loader,
  SearchRoute,
}) => {
  const dispatch = useDispatch();
  const [SearchInput, setSearchInput] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys([...selectedRowKeys]);
    dispatch(SelectReader([...selectedRowKeys]));
  };
  const SelectedLibrary = useSelector(
    (state) => state.AuthReducer.Selectedlibrary
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onSearch = (e) => {
    setSearchInput(e.target.value);
    const payload = {
      name: e.target.value,
      libraries: SelectedLibrary,
    };
    SearchRoute === "Readers" && dispatch(SearchReader(payload));
    SearchRoute === "Librarians" && dispatch(SearchLibrarian(payload));
    SearchRoute === "Category" && dispatch(SearchCategory(payload));
    SearchRoute === "Book" && dispatch(SearchBook(payload));
    SearchRoute === "Authors" && dispatch(SearchAuthor(payload));
    SearchRoute === "Packages" && dispatch(SearchPackages(payload));
    SearchRoute === "Products" && dispatch(SearchProducts(payload));
    SearchRoute === "ProductCategory" &&
      dispatch(SearchProductCategory(payload));
  };

  return (
    <>
      <div className="table-search-inp mt-30">
        {Search && (
          <Input
            prefix={<SearchOutlined />}
            value={SearchInput}
            onChange={onSearch}
            placeholder="search"
          />
        )}
      </div>
      <Table
        className="data-table"
        columns={columns}
        dataSource={data}
        rowSelection={selection ? rowSelection : null}
        pagination={pagination}
        // scroll={{ x: width ? width : "auto" }}
        scroll={{ x: "auto" }}
        loading={loader}
      />{" "}
    </>
  );
};

export default DataTable;
