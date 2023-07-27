import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import LoaderComponent from '../components/common/Loader/LoaderComponent';
import { coinObject } from '../functions/coinObject';
import ListComponent from '../components/Dashboard/List/ListComponent';
import CoinInfo from '../components/Coins/CoinInfo/CoinInfo';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import LineChartComponent from '../components/Coins/LineChart/LineChartComponent';
import SelectDaysComponent from '../components/Coins/SelectDays/SelectDaysComponent';
import { settingChartData } from '../functions/settingChartData';
import PriceToggle from '../components/Coins/PriceType/PriceToggle';
import { motion } from 'framer-motion';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';

const Coin = () => {
    const { id } = useParams();
    const [isLoader, setIsLoader] = useState(true);  // This State For set Loading ina Page..
    const [coinData, setCoinData] = useState();      // Store Single Coin Data Depend On(URL ID)
    const [days, setDays] = useState(30);
    const [chartData, setChartData] = useState({});
    const [priceToggle, setPriceToggle] = useState('prices');

    useEffect(() => {
        if (id) {
            getData();
        };
    }, [days])

    async function getData() {
        const data = await getCoinData(id);  // Get Coin Data
        if (data) {
            coinObject(setCoinData, data);  // This Function Gives Me The Only Needed Object Values.
            const prices = await getCoinPrices(id, days, priceToggle);   // Get Coin Prices 
            if (prices.length > 0) {
                settingChartData(setChartData, prices);   // This Functon sets the chart data..
                setIsLoader(false)
            }
        }
    };

    // This onChange Function Change My Days. (This fun for Select Box)
    const handledaysChange = async (event) => {
        setIsLoader(true);
        setDays(event.target.value);
        const prices = await getCoinPrices(id, event.target.value, priceToggle);
        if (prices.length > 0) {
            settingChartData(setChartData, prices);
            setIsLoader(false);
        }
    }

    // this onchange function run depend on toggle price or market cap or total volume
    const handlePriceTypeChange = async (event, newType) => {
        console.log(event.target.value)
        setIsLoader(true);
        setPriceToggle(event.target.value);
        // console.log(newType)
        const prices = await getCoinPrices(id, days, event.target.value);
        if (prices.length > 0) {
            settingChartData(setChartData, prices);
            setIsLoader(false);
        }

    };

    return (
        <React.Fragment>
        <Header />
            <div>
                {
                    isLoader ? (<LoaderComponent />
                    ) : (
                        <React.Fragment>
                            <motion.div className='grey-wrapper' initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
                                <ListComponent coin={coinData} />
                            </motion.div>
                            <div className='grey-wrapper'>
                                <SelectDaysComponent days={days} handledaysChange={handledaysChange} />
                                <PriceToggle priceToggle={priceToggle} handlePriceTypeChange={handlePriceTypeChange} />
                                <LineChartComponent chartData={chartData} priceToggle={priceToggle} />
                            </div>
                            <motion.div className='grey-wrapper coin-info-div' initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
                                <CoinInfo heading={coinData.name} desc={coinData.desc} />
                            </motion.div>
                        </React.Fragment>
                    )
                }
            </div>
            <Footer />
        </React.Fragment>
    )
};

export default Coin;