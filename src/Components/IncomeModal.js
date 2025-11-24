import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle
} from "@mui/material";
import "./incomeModal.css";

export default function IncomeModal({ incomeOpen, handleIncomeClose, handleAddIncome }) {

  const handleSubmitIncome = (e) => {
    e.preventDefault();
    const amount = e.target.amount.value;
    handleAddIncome(amount);
    handleIncomeClose();
  };

  return (
    <Dialog
      open={incomeOpen}
      onClose={handleIncomeClose}
      className="custom-dialog"
      PaperProps={{ className: "modal-paper" }}>

      <DialogTitle className="modal-title">
        <p>Add Income</p>
      </DialogTitle>

      <DialogContent className="modal-content">

        <form onSubmit={handleSubmitIncome}>

        <div className="input-row">
          <TextField
           name="amount"
            type="number"
            fullWidth
            placeholder="Income Amount"
            className="input-box"
            required
          />

          <Button type="submit" className="add-btn">
            Add Balance
          </Button>

          <Button type="button" className="cancel-btn" onClick={handleIncomeClose}>
            Cancel
          </Button>
        </div>

      </form>
      </DialogContent>
    </Dialog>
  );
}
