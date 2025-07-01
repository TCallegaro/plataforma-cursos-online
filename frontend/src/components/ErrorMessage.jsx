import React from 'react';

function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div style={{ color: 'red', marginTop: '0.5rem' }}>
      {message}
    </div>
  );
}

export default ErrorMessage;
