/** @format */

import React, { Fragment, useEffect, useState } from "react";
import styles from "./Select.module.css";
import { ChevronDown, ChevronUp } from "lucide-react";

const Select = ({ data = [], onSelect }) => {
  const [selectState, setSelectState] = useState({
    selectedText: "",
    showDropDown: false,
  });

  const onClickInputListener = (event) => {
    setSelectState((prevState) => ({ ...prevState, showDropDown: true }));
  };

  const onClickItemListener = (value) => {
    setSelectState((prevState) => ({
      selectedText: value,
      showDropDown: false,
    }));
  };

  useEffect(() => {
    if (data.length > 0) {
      setSelectState((prevState) => ({
        ...prevState,
        selectedText: data[0],
      }));
    }
  }, [data]);

  useEffect(() => {
    onSelect(selectState.selectedText);
  }, [selectState.selectedText]);

  return (
    <Fragment>
      <div className={`${styles.container}`}>
        <div className={`${styles.result_container}`}>
          <p>{selectState.selectedText}</p>{" "}
          {selectState.showDropDown ? <ChevronUp /> : <ChevronDown />}
          <div
            className={`${styles.overlay_result_container}`}
            onClick={(e) => onClickInputListener(e)}
          ></div>
        </div>
        {selectState.showDropDown && (
          <div className={`${styles.dropdown}`}>
            {data.map((item, index) => {
              return (
                <p
                  key={index}
                  className={`${styles.dropdown_item}`}
                  onClick={() => onClickItemListener(item)}
                >
                  {item}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Select;
