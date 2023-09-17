import "./styles.css";
import React from "react";
import { useClientSidePagination } from "./useClientSidePagination";

export default function App() {
  const {
    currentPageData,
    totalPageNo,
    currentPage,
    goToNextPage,
    goToPreviousPage
  } = useClientSidePagination("https://dummyjson.com/products", 10);

  console.log(currentPageData);

  return (
    <div className="App">
      {currentPageData?.map((el) => (
        <p key={el.id}>{el.title}</p>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <button onClick={goToPreviousPage}>prev</button>
        <p>{currentPage}</p>
        <button onClick={goToNextPage}>next</button>
        <p>{totalPageNo}</p>
      </div>
    </div>
  );
}
