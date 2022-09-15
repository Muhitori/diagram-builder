import { useLocation } from 'react-router-dom'
import { ADD_ELEMENT_ROUTE, EDIT_ELEMENT_ROUTE, EDIT_GROUP_ROUTE, EDIT_NODE_ROUTE } from 'src/utils/constants/route.constants';

import { EditElementGroupModal } from './elementGroupModal/editElementGroupModal';
import { AddElementModal } from './elementModal/addElementModal';
import { EditElementModal } from './elementModal/editElementModal';
import { EditNodeModal } from './nodeModal/editNodeModal';

export const ModalController = () => {
  const location = useLocation();

  if (location.pathname === EDIT_ELEMENT_ROUTE) {
    return <EditElementModal />
  }

  if (location.pathname === ADD_ELEMENT_ROUTE) {
    return <AddElementModal />;
  }

  if (location.pathname === EDIT_GROUP_ROUTE) {
      return <EditElementGroupModal />;
  }

  if (location.pathname === EDIT_NODE_ROUTE) {
    return <EditNodeModal />;
  }
  
  return null;
}