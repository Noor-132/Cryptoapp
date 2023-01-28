import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Coin from './Coins'

function Navbar() {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        fetchCoins();
    }, []);
    const fetchCoins = async () => {
        setIsLoading(true);
        setError(false);
        try {
            const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
            setCoins(response.data);
            setIsLoading(false);
        } catch (error) {
            setError(true);
            console.error(error);
        }
    }
    const handleChange = e => {
        setSearch(e.target.value);
    };
    const handleUpdate = async () => {
        await fetchCoins();
        console.log("updateCoins")
    };
    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">

                        <a className="navbar-brand" href="/">Cap Coin</a>
                        <button className="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                </li>
                            </ul>
                            <form className="coin-search">
                                <input className='coin-input mx-2     align-items-center' type='text' onChange={handleChange} placeholder='Search' aria-label="Search" />
                                <button className="btn btn-outline-primary" type="submit">Search</button>
                                <button className="btn btn-outline-primary mx-2" onClick={handleUpdate}>Update</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>

            <div className='container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='th-rank'>Rank</th>
                            <th className='th-name'>Name</th>
                            <th className='th-symbol'>Symbol</th>
                            <th className='th-price'>Price (USD)</th>
                            <th className='th-volume'>Volume (24h)</th>
                            <th className='th-date'>date</th>
                            <th className='th-pc'>price change%</th>
                            <th className='th-mkt'>Market_cap</th>
                        </tr>
                    </thead>
                </table>
            </div>
            {isLoading ? <p>Loading...</p> : error ? <p>Error: Unable to fetch data</p> : filteredCoins.map((coin) => (
                <Coin
                    key={coin.id}
                    rank={coin.market_cap_rank}
                    name={coin.name}
                    symbol={coin.symbol}
                    price={coin.current_price}
                    marketcap={coin.market_cap}
                    date={coin.last_updated}
                    volume={coin.total_volume}
                    image={coin.image}
                    priceChange={coin.price_change_percentage_24h}
                />
            )
            )
            }
        </div>
    )
}
export default Navbar
