import React from 'react';
import './Coin.css';
import { useState, useRef } from 'react';

const Coin = ({ rank, name, price, symbol, marketcap, date, volume, image, priceChange }) => {
  const initialIsPinned = localStorage.getItem(name) || false;
  const [isPinned, setIsPinned] = useState(initialIsPinned);

  const pinRef = useRef(null);
  const handlePin = () => {
    const pinElement = pinRef.current;
    if (!isPinned) {
      pinElement.classList.add('pinned');
      pinElement.length = 1;
      localStorage.setItem(name, true);
      setIsPinned(true);
    } else {
      pinElement.classList.remove('pinned');
      localStorage.removeItem(name);
      setIsPinned(false);
    }
  };
  return (
    <>
      <div className="container">

        <div className='coin-container '>

          <div key={name} className='coin-row' ref={pinRef}>
            <div className='coin'>
              <h1>{rank}</h1>
              <img src={image} alt='crypto' />
              <h1>{name}</h1>
              <p className='coin-symbol'>{symbol}</p>
            </div>
            <div className='coin-data'>
              <p className='coin-price'>${price}</p>
              <p className='coin-volume'>${volume.toLocaleString()}</p>
              <p className='coin.date'> ${date}</p>
              {priceChange < 0 ? (
                <p className='coin-percent red'>{priceChange.toFixed(2)}%</p>
              ) : (
                <p className='coin-percent green'>+{priceChange.toFixed(2)}%</p>
              )}
              <p className='coin-marketcap'>
                Mkt Cap: ${marketcap.toLocaleString()}
              </p>
              <button className="btn btn-outline-primary mx-2"
                onClick={handlePin}
                style={{ color: isPinned ? 'black' : 'initial' }}> {isPinned ? 'unpin' : 'Pin'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coin;