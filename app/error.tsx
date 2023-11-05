'use client';
import React from 'react';

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
  console.error('Error', error);

  return (
    <>
      <div>Unexpected error has occured</div>
      <button onClick={reset} className="btn btn-error">
        Retry
      </button>
    </>
  );
};

export default ErrorPage;
