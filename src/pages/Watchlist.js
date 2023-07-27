import React, { useEffect, useState } from 'react'
import GridComponent from '../components/Dashboard/Grid/GridComponent';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/common/Header/Header';
import Button from '../components/common/Button/Button';
import { NavLink } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, deleteDoc, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import Footer from '../components/common/Footer/Footer';

const Watchlist = () => {
  const [CoinsData, setCoinsData] = useState([]);
  const [user,loading] = useAuthState(auth);

  const obj = {
    display: "flex",
    justifyContent: "center",
    marginTop: "5rem"
  }

  const fetchData = (coin) => {
    getDocs(query(collection(db, `users/${user.uid}/carts`)))
      .then((coins) => {
        let temp = [];
        coins.docs.forEach((coin) => temp.push({ ...coin.data(), id: coin.id }));
        console.log(temp);
        setCoinsData(temp);
      })
  };

  useEffect(() => {
    if (user) {
      fetchData();
    } else {
      alert('First Login Your acoount')
    }
  }, [])

  const removeWatchList = async(coin) => {
    const coinCartRef = doc(db,`users/${user.uid}/carts/${coin.id}`);
    const transactionDoc = await getDoc(coinCartRef); 
    if (transactionDoc.exists()) {
      // Step 2: Get the transaction data from the document
      const transactionData = transactionDoc.data();
      // Step 4: Update the transaction in Firestore
      await deleteDoc(coinCartRef, transactionData);
      fetchData();
      toast.success('Coin is Removed 👍', { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", });
    
    }   
};

  const Empty = () => {
    return (
      <div className='empty-div' style={obj}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <h5 style={{ fontSize: "2rem" }}>{user ? 'Please add coins' : 'Please Login.'}</h5>
          {
            user ? <NavLink to="/dashboard"><Button btnName="Dashboard" /></NavLink> : <NavLink to="/"><Button btnName="Login" /></NavLink>
          }
        </div>
      </div>
    )
  };

  return (
    <React.Fragment>
      <Header />
      {
        CoinsData.length <= 0 ? (<Empty />) :

          (<div className='grid-flex'>
            {
              CoinsData.map((coin, index) => {
                return <GridComponent coin={coin} key={index} addToWatchList={removeWatchList} />
              })
            }
          </div>
          )
      }
      {
        CoinsData.length > 6 && <Footer />
      }
    </React.Fragment>
  )
}

export default Watchlist