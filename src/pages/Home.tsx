import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import millify from "millify";

import useStore from "../store";
import AssetLogo from "../components/AssetLogo";
import Spinner from "../components/Spinner";
import ItemList from "../components/ItemList";
import TradeButton from "../components/TradeButton";

const Home = () => {
  const history = useHistory();
  const today = moment(new Date()).format("DD/MM/YYYY");

  const isLogged = useStore(state => state.isLogged);
  const assets = useStore(state => state.assets);
  const loading = useStore(state => state.loading);
  const pageLimit = useStore(state => state.pageLimit);
  const fetchAssets = useStore(state => state.fetchAssets);

  // Check if user is logged in
  useEffect(() => {
    if(!isLogged)
      history.push("/login");
  });

  // Get all crypto assets
  useEffect(() => {
    fetchAssets(pageLimit);
  }, [fetchAssets, pageLimit]);

  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-10/12 bg-gray-800 py-6 px-6 rounded-3xl">
        <div className="flex justify-between text-white items-center mb-8">
          <p className="text-2xl font-bold">Crypto</p>
          <p className="">{today}</p>
        </div>

        <div className="flex justify-end mb-2">
          <ItemList />
        </div>

        <div className="border rounded-b text-gray-100 divide-y divide-gray-700 border-gray-700">
          {!loading ? (
            assets && assets?.map(
              (crypto: {
                id: string;
                name: string;
                symbol: string;
                metrics: any;
              }, index) => (
                <div
                  key={crypto.id}
                  className="px-4 py-2 flex items-center justify-between hover:bg-gray-700"
                >
                  <div className="w-4/12">
                    <div className="flex items-center space-x-2">
                      <span className="w-5">
                        {index + 1}.
                      </span>
                      <AssetLogo id={crypto.id}/>
                      <span>
                        {crypto.symbol} - {crypto.name}
                      </span>
                    </div>
                  </div>
                  <div className="w-3/12">
                    <span className="text-gray-600">Price: </span>
                    {millify(crypto.metrics.market_data.price_usd)}
                  </div>
                  <div className="w-3/12">
                    <span className="text-gray-600">Market Cap: </span>
                    {millify(crypto.metrics.marketcap.current_marketcap_usd)}
                  </div>
                  <div className="w-2/12">
                    <div className="flex items-center space-x-2">
                      <TradeButton />
                    </div>
                  </div>
                </div>
              )
            )): <div className="my-32"><Spinner /></div>}
        </div>
      </div>
    </div>
  );
};

export default Home;
