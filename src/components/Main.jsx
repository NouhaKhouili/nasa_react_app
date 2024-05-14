import React from "react";

export default function Main(props) {
  const { data } = props;
  return (
    <div className="imgContainer">
      <img src={data?.hdurl} alt="mars" className={data?.title} />
    </div>
  );
}
