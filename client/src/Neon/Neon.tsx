import React from 'react';
import './Neon.css';
import { Link } from 'react-router-dom';

function NeonBanner(top: string, bottom?: string) {
  return (
    <div className='neon-wrapper'>
      <div className='container-neon'>
        <div className='neon'>{top} </div>
        <div className='flux'>{bottom} </div>
      </div>
    </div>
  );
}

export default function Neon({
  top,
  bottom,
  to,
}: {
  top: string;
  bottom: string;
  to?: string;
}) {
  if (to) {
    return (
      <Link to={to} style={{ textDecoration: 'none' }}>
        {NeonBanner(top, bottom)}
      </Link>
    );
  }

  return <div className='neon-wrapper'>{NeonBanner(top, bottom)}</div>;
}
