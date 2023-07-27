import React, { useEffect, useState } from 'react'
import TabComponent from '../components/Dashboard/Tabs/TabComponent';
import SearchBar from '../components/Dashboard/Search/SearchBar';
import PaginationComponent from '../components/Dashboard/Pagination/PaginationComponent';
import LoaderComponent from '../components/common/Loader/LoaderComponent';
import BackToTopbtn from '../components/common/BackToTop/BackToTopbtn';
import { get100Coins } from '../functions/get100Coins';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';

const DashboardPage = () => {
  const [search, setSearch] = useState("");   // Search Bar State.
  const [paginationCoins, setPaginationCoins] = useState([]);
  const [coins, setCoins] = useState([]);    // This State Store The Crypto Coins API data.
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  }

  const handleChange = (event, value) => {
    setPage(value);
    var previousIndex = (value - 1) * 10;
    setPaginationCoins(coins.slice(previousIndex, previousIndex + 10));
  };

  //  Get 100 Coins Data
  const getData = async () => {
    const myCoins = await get100Coins();
    setCoins(myCoins);
    setPaginationCoins(myCoins.slice(0, 10));
    setIsLoading(false);
  };
  // It Use To send get Request To Coin API data and store in state.
  useEffect(() => {
    getData();
  }, []);

  

  // Search Filter Coins into the api
  var filterCoins = coins.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.symbol.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <React.Fragment>
    <Header />
      <BackToTopbtn />
      {
        isLoading ? (
          <LoaderComponent />
        ) : (
          <div>
            <SearchBar search={search} onSearchChange={onSearchChange} />
            <TabComponent coins={search ? filterCoins : paginationCoins} />
            {!search && <PaginationComponent page={page} handleChange={handleChange} />}
          </div>
        )
      }
      <Footer />
    </React.Fragment>
  )
}

export default DashboardPage