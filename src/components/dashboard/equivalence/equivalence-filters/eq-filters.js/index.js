import React from "react";
import variants from "src/components/filters/filterConstants";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import "../../../../filters/filters.scss";
import SelectEqFilter from "./select-eq-filter";
import { useTranslation } from "react-i18next";

export default function EqFilters() {
  const { var1, var2, var3, var4 } = variants;
  const { globalState } = useSelector((state) => state.globalRed);
  const { t } = useTranslation();

  return (
    <Grid item style={{ display: "flex", alignItems: "center" }}>
      {[var1, var2, var3, var4].map((data) => {
        return <SelectEqFilter key={utils.commonFunctions.keyFinder()} type={data[0].name} data={data} />;
      })}
      <div
        className={`calendar-filter ${globalState ? " singleView" : ""}`}
        style={{
          color: "#000000",
          fontWeight: "500",
          borderRadius: "5px",
          background: "#ECEFF1",
          border: "1px solid #969696",
        }}
      >
        {t("january2023")}
      </div>
    </Grid>
  );
}

