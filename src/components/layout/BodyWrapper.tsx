import React from 'react';

const BodyWrapper = ({children}:any) => {
  return (
      <div className="relative min-h-screen">
        <main style={{alignSelf: 'flex-end'}}>{children}</main>
      </div>
  );
};

export default BodyWrapper;
