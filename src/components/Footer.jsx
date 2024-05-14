import React from "react";

export default function Footer(props) {
  const { handleToggleModal, data } = props;
  return (
    <footer>
      <div className="bgGradient">
        <h2>{data?.title}</h2>
        <h1>Copyright {data?.copyright}</h1>
      </div>
      <button onClick={handleToggleModal}>
        <i className="fa-solid fa-circle-info"></i>
      </button>
    </footer>
  );
}
