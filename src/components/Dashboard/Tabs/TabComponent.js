import React, { useEffect, useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme, ThemeProvider } from '@mui/material';
import GridComponent from '../Grid/GridComponent';
import './tabsComponent.css';
import ListComponent from '../List/ListComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { db, auth } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function TabComponent({ coins }) {
  const [value, setValue] = useState("grid");
  const [getCoins, setCoins] = useState([]);
  const [user, loading] = useAuthState(auth);

  // Fetching data Into Firebase Firestore.
  const fetchData = (coin) => {
    getDocs(query(collection(db, `users/${user.uid}/carts`)))
      .then((coins) => {
        let temp = [];
        coins.docs.forEach((coin) => temp.push({ ...coin.data(), id: coin.id }));
        setCoins(temp);
      })
  };

  useEffect(() => {
    fetchData();
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#3a80e9"
      },
    },
  });

  const style = {
    color: "var(--white)",
    fontSize: "1.2rem",
    fontWeight: 600,
    textTransform: "capitalize"
  };


  const check = (coinData) => {
    for (let i = 0; i < getCoins.length; i++) {
      if (getCoins[i].name === coinData.name) {
        return true;
      }
    }
    return false;
  };

  // Add To WatchList (Firestore)
  const addToWatchList = async (coinData) => {
    if (check(coinData) === false) {
      await addDoc(collection(db, `users/${user.uid}/carts`), coinData);
      toast.success('Coin added in WatchList 👍', { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", });
    } else {
      toast.warning('Coin is Already added 👍', { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
        <TabList onChange={handleChange} variant='fullWidth'>
          <Tab label="Grid" value="grid" sx={style} />
          <Tab label="List" value="list" sx={style} />
        </TabList>
        <TabPanel value="grid">
          <div className='grid-flex'>
            {
              coins.map((coin, index) => {
                return <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.5 }}><GridComponent coin={coin} key={index} addToWatchList={addToWatchList} isCheck={true} /></motion.div>
              })
            }
          </div>
        </TabPanel>
        <TabPanel value="list">
          <table className='list-table'>
            {
              coins.map((coin, index) => {
                return <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.5 }}><ListComponent coin={coin} key={index} /></motion.div>
              })
            }
          </table>
        </TabPanel>
      </TabContext>
      <ToastContainer />
    </ThemeProvider>
  );
}