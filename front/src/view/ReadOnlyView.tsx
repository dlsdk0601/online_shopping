import React from "react";

const ReadOnlyView = (props: { value: string; label: string; type?: string }) => {
  return (
    <>
      <div className="input-field">
        <label>{props.label}</label>
        <input value={props.value} type={props.type ?? "text"} readOnly />
      </div>
    </>
  );
};

export default ReadOnlyView;
