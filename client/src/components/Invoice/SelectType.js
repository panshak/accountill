/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { unicodeToChar } from "../../utils/utils";
import { useTranslation } from "react-i18next";

export default function SelectType({ type, setType }) {
  const { t } = useTranslation();

  const options = [
    { title: unicodeToChar(t("invoice.invoice")) },
    { title: unicodeToChar(t("invoice.receipt")) },
    { title: unicodeToChar(t("invoice.estimate")) },
    { title: unicodeToChar(t("invoice.bill")) },
    { title: unicodeToChar(t("invoice.quotation")) },
  ];

  return (
    <Autocomplete
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) => option.title || ""}
      //   getOptionSelected={(option, value) => option.title === value.value}
      value={type}
      onChange={(event, value) => setType(value)}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={unicodeToChar(t("invoice.select_type"))}
          variant="outlined"
        />
      )}
    />
  );
}
