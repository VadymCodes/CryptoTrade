import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import useStore from "../store";

const Trade = () => {
  const history = useHistory();
  const isLogged = useStore(state => state.isLogged);
  const [asset, setAsset] = useState(null);
  const [crypto, setCtypto] = useState(0);
  const [fiat, setFiat] = useState(0);
  const [price, setPrice] = useState(0);
  const assets = useStore(state => state.assets);
  const pageLimit = useStore(state => state.pageLimit);
  const fetchAssets = useStore(state => state.fetchAssets);

  // Check if user is logged in
  useEffect(() => {
    if(!isLogged)
      history.push("/login");
    
    if(assets && price === 0){
      // @ts-ignore
      setPrice(assets[0].metrics.market_data.price_usd);
    }
  });

  // Fetch assets data
  useEffect(() => {
    fetchAssets(pageLimit);
    
  }, [fetchAssets, pageLimit, assets]);

  function changeAsset(e: any) {
    setFiat(e.target.value * crypto);
    setPrice(e.target.value);
  }

  function changeCrypto(e: any) {
    setCtypto(e.target.value);
    // @ts-ignore
    // const price = asset.metrics.market_data.price_usd;
    setFiat(e.target.value * price);
  }

  function changeFiat(e: any) {
    setFiat(e.target.value);
    // @ts-ignore
    const price = asset.metrics.market_data.price_usd;
    setCtypto(e.target.value / price);
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full lg:w-6/12 bg-gray-800 py-6 px-6 rounded-3xl">
          <div className="flex flex-col justify-center text-white items-center mb-8 px-12">
            <p className="text-2xl font-bold mb-8">Swap Crypto</p>
            <div className="w-full relative rounded-2xl shadow-sm">
              <input
                type="number"
                name="crypto"
                id="crypto"
                value={crypto}
                onInput={changeCrypto}
                className="focus:ring-indigo-500 bg-gray-800 block w-full pl-7 pr-12 py-3 sm:text-sm border-gray-300 rounded-2xl focus:border-transparent focus:outline-none ring-1 ring-blue-500"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="currency" className="sr-only">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  onChange={changeAsset}
                  className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-2 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md focus:outline-none"
                >
                  {assets && assets?.map(
                    (crypto: {
                      id: string;
                      name: string;
                      symbol: string;
                      metrics: any;
                    }, index) => (
                      <option key={index} value={crypto.metrics.market_data.price_usd}>{crypto.symbol}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="w-full relative rounded-2xl shadow-sm my-8">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                name="fiat"
                id="fiat"
                value={fiat}
                onInput={changeFiat}
                className="focus:ring-indigo-500 bg-gray-800 block w-full pl-7 pr-12 py-3 sm:text-sm border-gray-300 rounded-2xl focus:border-transparent focus:outline-none ring-1 ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <button className="bg-blue-500 hover:bg-blue-400 w-full text-xl rounded-2xl text-white py-1.5 focus:outline-none">Swap</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trade;
