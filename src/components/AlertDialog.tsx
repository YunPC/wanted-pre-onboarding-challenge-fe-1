import React from "react";
import Dialog from "@mui/material/Dialog";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onCancle: () => void;
  onConfirm: () => void;
}

const AlertDialog = ({
  open,
  onClose,
  title,
  content,
  onCancle,
  onConfirm,
}: AlertDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-tilte">{title}</DialogTitle>
      <DialogContent id="alert-dialog-description">{content}</DialogContent>
      <DialogActions>
        <Button onClick={onCancle}>취소</Button>
        <Button onClick={onConfirm} autoFocus>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
