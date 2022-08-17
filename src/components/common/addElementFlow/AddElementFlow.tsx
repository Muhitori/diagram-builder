import AddIcon from '@mui/icons-material/Add';
import { FC, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { AddElementModal } from './AddElementModal';

interface Props {
  groupName: string;
}

export const AddElementFlow: FC<Props> = ({ groupName }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Icon onClick={handleOpen}>
        <AddIcon />
      </Icon>
      <AddElementModal
        open={open}
        onClose={handleClose}
        groupName={groupName}
      />
    </>
  );
};