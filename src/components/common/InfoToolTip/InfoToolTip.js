import { useContext } from 'react';

import { AppContext } from '../../../contexts/AppContext';
import Popup from '../Popup/Popup';

function InfoTooltip({ message }) {
  const app = useContext(AppContext);

  return (
    <Popup isOpen={message} name="info" onClose={app.closeAllPopups}>
      <p className="popup__title popup__title_info">{message?.text}</p>
    </Popup>
  );
}

export default InfoTooltip;