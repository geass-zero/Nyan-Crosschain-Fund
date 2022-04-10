import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ActivePools from './pages/ActivePools';
import CreatePool from './pages/CreatePool';
import FundOverview from './pages/FundOverview';
import Governance from './pages/Governance';
import IndexFunds from './pages/IndexFunds';
import Swap from './pages/Swap';
import PoolIndexInfo from './pages/PoolIndexInfo';
import PoolActiveInfo from './pages/PoolActiveInfo';
import NyanOTCSwap from './pages/NyanOTCSwap';
import NavPanel from './component/NavPanel';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

import { getGlobal } from 'reactn';
import {Web3Util, Accounts} from './utils/index';


// const connect = async() => {
//     const accounts = getGlobal().accounts;
//     if (!accounts) {
//       let instance = await Web3Util.createInstance();
//       console.log(instance);
//       // getGlobal().accounts
  
//     }
// }




function App() {
    useEffect(() => {
        if (document.getElementsByClassName("web3modal-modal-lightbox")[0]) {
            document.getElementsByClassName("web3modal-modal-lightbox")[0].style.zIndex = '20';
        }
        // connect();
        AOS.init({
            // initialise with other settings
            duration: 2000,
        });
    }, []);

    if (!localStorage.getItem('chain')) {
        localStorage.setItem('chain', 'ETH');
      }

    return (
        <>
            <Router>
                <NavPanel />
                <Switch>
                    <Route path='/' exact>
                        <Home />
                    </Route>
                    <Route path='/fund-overview'>
                        <FundOverview />
                    </Route>
                    <Route path='/active-pools'>
                        <ActivePools />
                    </Route>
                    <Route path='/create-a-pool'>
                        <CreatePool />
                    </Route>
                    <Route path='/governance'>
                        <Governance />
                    </Route>
                    <Route path='/passive-pools'>
                        <IndexFunds />
                    </Route>
                    <Route path='/otc-swap'>
                        <NyanOTCSwap />
                    </Route>
                    <Route path='/swap'>
                        <Swap />
                    </Route>
                    <Route path='/active-pool-info'>
                        <PoolActiveInfo type='active' />
                    </Route>
                    <Route path='/index-fund-info'>
                        <PoolIndexInfo type='passive' />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
