import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem
} from "@mui/material";
import "./expenseModal.css";

export default function ExpenseModal({ open, handleClose, handleAddExpense }) {

 const AddExpense = (e) => {
    e.preventDefault();
    
      const title = e.target.title.value;
      const price = Number(e.target.price.value);
      const category = e.target.category.value;
      const date = e.target.date.value;

        const expenseData = {
          id: Date.now(),
          title,
          price,
          category,
          date
        };

          handleAddExpense(expenseData);
          handleClose();
          e.target.reset();
    };

  

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="custom-dialog"
      PaperProps={{ className: "modal-paper" }}>
      
      <DialogTitle className="modal-title">
        <p>Add Expenses</p>
      </DialogTitle>

      <DialogContent className="modal-content">

        <form onSubmit={AddExpense}>

          <div className="input-row">
            <TextField name="title" label="Title" fullWidth className="input-box" required />
            <TextField name="price" label="Price" fullWidth className="input-box" type="number" required />
          </div>

          <div className="input-row">
           <select name="category" required className="input-box category-dropdown" defaultValue="">
            <option value="" disabled>Select Category</option>
            <option value="Food">Food</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travel">Travel</option>
          </select>


            <TextField
              type="date"
              name="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              className="input-box"
              required
              />        
          </div>

          <div className="modal-buttons">
            <Button  type="submit" className="add-btn">
              Add Expense
            </Button>
            <Button className="cancel-btn" onClick={handleClose}>
              Cancel
            </Button>
          </div>
          
       </form>
       
      </DialogContent>
    </Dialog>
  );
}
