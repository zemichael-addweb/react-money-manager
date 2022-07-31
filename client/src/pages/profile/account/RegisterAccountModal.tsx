import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'sm',
  bgcolor: 'background.paper',
  border: '0px solid #000',
  borderRadius: '.4rem',
  boxShadow: 24,
  p: 4,
};

export default function RegisterAccountModal(
  open: any,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
  console.log('register account modal rendered');

  const [modalOpen, setModalOpen] = useState(open.open);

  useEffect(() => {
    setModalOpen(open.open);
    console.log('open', open);
  }, [open]);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Button onClick={handleOpen}>Close Modal</Button>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  );
}
