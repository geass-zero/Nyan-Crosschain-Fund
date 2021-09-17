import React from 'react';
import './styles.scss';
import AvailableGraph from './../../component/AvailableGraph';
import {Contracts, Formatter} from '../../utils/index';
import { setGlobal, getGlobal, useEffect } from 'reactn';

const ActivePools = () => {
    const [activePools, setActivePools] = React.useState({});
    const [pageReady, setPageReady] = React.useState(false);
    const getActivePools = async() => {
        let pools = await Contracts.getAllSelfPools();
        return pools;
    }

    useEffect(() => {
        async function loadData() {
          setActivePools(await getActivePools());
          setPageReady(true);
        }     
    
        
    
        loadData();
    }, []);

    const setActiveDivs = () => {
        let arr = [];
        if (activePools[0]) {
            for (let i = 0; i < activePools[0].length; i++) {
                arr.push(
                    <div className='paper_box split_box'>
                        <AvailableGraph
                            type='active'
                            name={activePools[3][i]}
                            owner={activePools[0][i]}
                            aum={activePools[1][i]}
                            lifetime={activePools[2][i]}
                        />
                    </div>
                )
            }
        }
        return arr;
    }

    return (
        <section className='nav_adjust content_wrap active_pool'>
            <div data-aos='fade-up' data-aos-offset='0' data-aos-duration='500'>
                <div className='flex_wrap space_between'>
                    <h1 className='center_sm'>Available active pools:</h1>
                    <div className='abs_right xs_hidden'>
                        <div className='item'>Sort by: </div>
                        <select name='Size' id='Size' className='input_box'>
                            <option value='Size'>Size</option>
                        </select>
                    </div>
                </div>
                {pageReady ?
                    <div className='split_box_wrap'>
                        {setActiveDivs()}
                        
                    </div>
                    :
                    null
                }
            </div>
        </section>
    );
};

export default ActivePools;
