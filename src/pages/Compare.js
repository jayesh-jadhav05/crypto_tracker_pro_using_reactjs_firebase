import React, { useEffect, useState } from 'react'
import SelectCoinsComponent from '../components/Compare/SelectCoins/SelectCoinsComponent'
import SelectDaysComponent from '../components/Coins/SelectDays/SelectDaysComponent';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import LoaderComponent from '../components/common/Loader/LoaderComponent';
import { coinObject } from '../functions/coinObject';
import ListComponent from '../components/Dashboard/List/ListComponent';
import CoinInfo from '../components/Coins/CoinInfo/CoinInfo';
import { settingChartData } from '../functions/settingChartData';
import LineChartComponent from '../components/Coins/LineChart/LineChartComponent';
import PriceToggle from '../components/Coins/PriceType/PriceToggle';
import {motion} from 'framer-motion';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';

const Compare = () => {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [days, setDays] = useState(7);
  const [crypto1Data, setCrypto1Data] = useState({})
  const [crypto2Data, setCrypto2Data] = useState({})
  const [isLoader, setIsLoader] = useState(true);
  const [priceToggle, setPriceToggle] = useState("prices");
  const [chartData, setChartData] = useState({});


  const getData = async () => {
    setIsLoader(true);
    const data1 = await getCoinData(crypto1);
    if (data1) {
      const data2 = await getCoinData(crypto2);
      coinObject(setCrypto1Data, data1);
      if (data2) {
        coinObject(setCrypto2Data, data2);
        const prices1 = await getCoinPrices(crypto1, days, priceToggle);
        const prices2 = await getCoinPrices(crypto2, days, priceToggle);
        settingChartData(setChartData, prices1, prices2);
        setIsLoader(false);
      }
    }
  };

  useEffect(() => {
    getData()
  }, [])



  

  // this onchange function run depend on toggle price or market cap or total volume
  const handlePriceTypeChange = async (event, newType) => {
    setIsLoader(true);
    setPriceToggle(event.target.value);
    const prices1 = await getCoinPrices(crypto1, days, event.target.value);
    const prices2 = await getCoinPrices(crypto2, days, event.target.value);
    settingChartData(setChartData, prices1, prices2);
    setIsLoader(false);

  };

  const handledaysChange = async (event) => {
    setIsLoader(true);
    setDays(event.target.value);
    const prices1 = await getCoinPrices(crypto1, event.target.value, priceToggle);
    const prices2 = await getCoinPrices(crypto2, event.target.value, priceToggle);
    settingChartData(setChartData, prices1, prices2);
    setIsLoader(false);
  };


  const handleCoinChange = async (event, isCoin2) => {
    setIsLoader(true);
    if (isCoin2) {
      setCrypto2(event.target.value);
      const data = await getCoinData(event.target.value);
      coinObject(setCrypto2Data, data);
      const prices1 = await getCoinPrices(crypto1, days, priceToggle)
      const prices2 = await getCoinPrices(crypto2, days, priceToggle)
      if (prices1.length > 0 && prices2.length > 0) {
        setIsLoader(false);
      }
    } else {
      setCrypto1(event.target.value);
      const data = await getCoinData(event.target.value);
      coinObject(setCrypto1Data, data);
      const prices1 = await getCoinPrices(crypto1, days, priceToggle)
      const prices2 = await getCoinPrices(crypto2, days, priceToggle)
      if (prices1.length > 0 && prices2.length > 0) {
        setIsLoader(false);
      }
    }
  };


  return (
    <>
    <Header />
      {
        isLoader ? (
          <LoaderComponent />
        ) : (
          <React.Fragment>
            <motion.div className='coins-days-flex filter-coins' initial={{ opacity:0, x:-50}} animate={{ opacity:1, x:0}} transition={{ duration:0.5 ,delay:0.5}}>
              <SelectCoinsComponent crypto1={crypto1} crypto2={crypto2} handleCoinChange={handleCoinChange} />
              <SelectDaysComponent days={days} handledaysChange={handledaysChange} noPTag={true} />
            </motion.div>
            <motion.div className='grey-wrapper' initial={{ opacity:0, x:-50}} animate={{ opacity:1, x:0}} transition={{ duration:0.5 ,delay:1}}>
              <ListComponent coin={crypto1Data} />
            </motion.div>
            <motion.div className='grey-wrapper' initial={{ opacity:0, x:-50}} animate={{ opacity:1, x:0}} transition={{ duration:0.5 ,delay:1.2}}>
              <ListComponent coin={crypto2Data} />
            </motion.div>
            <div className='grey-wrapper'>
              <PriceToggle priceToggle={priceToggle} handlePriceTypeChange={handlePriceTypeChange} />
              <LineChartComponent chartData={chartData} priceToggle={priceToggle} multiAxis={true} />
            </div>
            <motion.div className='grey-wrapper coin-info-div' initial={{ opacity:0, x:-50}} animate={{ opacity:1, x:0}} transition={{ duration:0.5 ,delay:0.5}}>
              <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
            </motion.div>
            <motion.div className='grey-wrapper coin-info-div' initial={{ opacity:0, x:50}} animate={{ opacity:1, x:0}} transition={{ duration:0.5 ,delay:1}}>
              <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
            </motion.div>
          </React.Fragment>
        )}
       <Footer />
    </>
  )
};

export default Compare;