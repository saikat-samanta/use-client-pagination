import React from "react";
import axios from "axios";

export function useClientSidePagination(apiUrl, pageSize) {
  const [data, setData] = React.useState();
  const [currentPageData, setCurrentPageData] = React.useState();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLoading, setisLoading] = React.useState();
  const [error, setError] = React.useState();
  const [totalPageNo, setTotalPages] = React.useState(0);

  const goToNextPage = () => {
    setCurrentPage((prev) => {
      if (prev < totalPageNo) {
        return prev + 1;
      }
      return prev;
    });
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => {
      if (prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  const fetchData = React.useCallback(async () => {
    setisLoading(true);
    try {
      const response = await axios.get(apiUrl);
      setisLoading(false);
      setData(response.data.products);
    } catch (error) {
      setisLoading(false);
      setError(error.response);
    }
  }, [apiUrl]);

  React.useMemo(() => {
    if (data) {
      setCurrentPageData(
        data.slice(pageSize * (currentPage - 1), pageSize * currentPage)
      );
    }
  }, [currentPage, pageSize, data]);

  React.useEffect(() => {
    try {
      if (!data) {
        void fetchData();
      }
      if (data) {
        setTotalPages(data.length / pageSize);
      }
    } catch (error) {}
  }, [fetchData, pageSize, data]);

  return {
    data,
    currentPageData,
    currentPage,
    isLoading,
    error,
    goToNextPage,
    goToPreviousPage,
    totalPageNo
  };
}
