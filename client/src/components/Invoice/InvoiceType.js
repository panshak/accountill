import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { unicodeToChar } from "../../utils/utils";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const InvoiceType = ({ type, setType }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <p style={{ marginBottom: "-10px", paddingTop: "10px", color: "gray" }}>
        {unicodeToChar(t("invoice.select_type"))}
      </p>
      <Button
        style={{ lineSpacing: 1, fontSize: 35, fontWeight: 700 }}
        onClick={handleClickOpen}
      >
        {type ? type : unicodeToChar(t("invoice.invoice"))}
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        {/* <DialogTitle>Fill the form</DialogTitle> */}
        <DialogContent>
          <div className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">
                {unicodeToChar(t("invoice.select_type"))}
              </InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={type}
                onChange={handleChange}
                input={<Input />}
              >
                <MenuItem value="">
                  <em>{unicodeToChar(t("invoice.select_type"))}</em>
                </MenuItem>
                <MenuItem value="Invoice">
                  {unicodeToChar(t("invoice.invoice"))}
                </MenuItem>
                <MenuItem value="Receipt">
                  {unicodeToChar(t("invoice.receipt"))}
                </MenuItem>
                <MenuItem value="Estimate">
                  {unicodeToChar(t("invoice.estimate"))}
                </MenuItem>
                <MenuItem value="Bill">
                  {unicodeToChar(t("invoice.bill"))}
                </MenuItem>
                <MenuItem value="Quotation">
                  {unicodeToChar(t("invoice.quotation"))}
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {unicodeToChar(t("cancel"))}
          </Button>
          <Button onClick={handleClose} color="primary">
            {unicodeToChar(t("ok"))}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InvoiceType;
