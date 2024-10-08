/** @format */

import React, { Fragment, useState, useEffect } from "react";
import style from "./Tab.module.css";
import Select from "../Select/Select";
import { selectData } from "@/Utils/Constants";

const Tab = ({ onTabSelect, data = [] }) => {
  const [tabState, setTabState] = useState({
    tabSelected: "indie",
    lang: "",
  });

  const onTabItemClick = (tabValue) => {
    setTabState((prevState) => ({ tabSelected: tabValue, lang: "all" }));
  };

  const onLangSelectedListener = (langValue) => {
    setTabState((prevState) => ({ ...prevState, lang: langValue }));
  };

  useEffect(() => {
    onTabSelect(tabState);
  }, [tabState]);

  return (
    <Fragment>
      <div className={`${style.tab_container}`}>
        <div className={`${style.tab_button_container}`}>
          {data?.map((item, index) => {
            return (
              <span
                key={`${item}_${index}`}
                className={
                  tabState.tabSelected === item
                    ? `${style.tab_button} ${style.tab_button_seleted}`
                    : `${style.tab_button}`
                }
                onClick={() => onTabItemClick(item)}
              >
                {item}
              </span>
            );
          })}
        </div>
        <div className={`${style.select_container}`}>
          <label className={`${style.select_label}`}>language :</label>
          <div className={`${style.select_wrapper}`}>
            <Select
              data={selectData[tabState.tabSelected].lang}
              onSelect={(itemSelected) => {
                onLangSelectedListener(itemSelected);
              }}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Tab;
