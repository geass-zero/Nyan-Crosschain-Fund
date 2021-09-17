import React from 'react';
import './styles.scss';
import AvailableGraph from './../../component/AvailableGraph';
import {Contracts, Formatter} from '../../utils/index';
import { setGlobal, getGlobal, useEffect } from 'reactn';

const IndexFunds = () => {
    const [indexAddresses, setIndexAddresses] = React.useState([]);

    useEffect(() => {
        async function loadData() {
          setIndexAddresses(await Contracts.getIndexFundAddresses());
        }     
    
        
    
        loadData();
    }, []);

    function setIndices() {
        let arr = [];
        for(let i = 0; i < indexAddresses.length; i++) {
            // <div className='paper_box split_box'>
            //     <AvailableGraph type='passive' name='Index name' />
            // </div>
        }
        return arr;
    }

    return (
        <section className='nav_adjust content_wrap index_funds'>
            <div data-aos='fade-up' data-aos-offset='0' data-aos-duration='500'>
                <div className='flex_wrap space_between'>
                    <h1 className='center_sm'>Available index funds:</h1>
                    <div className='abs_right xs_hidden'>
                        <div className='item'>Sort by: </div>
                        <select name='Size' id='Size' className='input_box'>
                            <option value='Size'>Size</option>
                        </select>
                    </div>
                </div>
                <div className='split_box_wrap'>
                    {setIndices()}
                    
                </div>
            </div>
        </section>
    );
};

export default IndexFunds;
