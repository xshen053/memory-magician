import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export function CustomSnackbar({ snackbarOpen, setSnackbarOpen, curCardDuration }) {
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={2000}
      onClose={() => setSnackbarOpen(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={() => setSnackbarOpen(false)} severity="success">
        Good Job! You spent {(curCardDuration / 60000).toFixed(2)} mins
      </Alert>
    </Snackbar>
  );
}


