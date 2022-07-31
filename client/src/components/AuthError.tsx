import React, { ReactElement, useEffect } from 'react';
import './authError.sass';

export const AuthError: React.FC<any> = (error: any): ReactElement => {
  console.log('Error For UI', error);
  if (Object.keys(error.error).length != 0) {
    return (
      <div className="auth_error_message">
        {error.error.description || 'Server error!'}
      </div>
    );
  } else return <></>;
};
