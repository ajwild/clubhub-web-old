import React from 'react';

function prefixUrl(url) {
  return process.env.PUBLIC_PREFIX ? process.env.PUBLIC_PREFIX + url : url;
}

const Static = () => {
  return (
    <div>
      <h1>Static</h1>
      <img src={prefixUrl('/unicorn.svg')} alt="Unicorn" />
    </div>
  );
};

export default Static;
