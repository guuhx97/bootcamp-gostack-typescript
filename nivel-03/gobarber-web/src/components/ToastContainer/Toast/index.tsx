import React, { useEffect } from 'react';

import { Container } from './styles';
import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';
import { IToastMessage, useToast } from '../../../hooks/toast';

interface IToastProps{
  message: IToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  sucess: <FiCheckCircle size={24} />
}

const Toast: React.FC<IToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);
    return () => {
      clearTimeout(timer);
    }
  }, [message.id, removeToast]);

  return (
    <Container style={style} key={message.id} type={message.type} hasDescription={!!message.description}>
      { icons[message.type || 'info'] }
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
        <button onClick={() => removeToast(message.id)} type="button">
          <FiXCircle size={18}/>
        </button>
      </div>
    </Container>
  );
};

export default Toast;
