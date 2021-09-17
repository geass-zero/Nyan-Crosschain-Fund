import React from 'react';
import './styles.scss';
import Chart from 'react-apexcharts';
import { ReactComponent as Dollar } from './../../assets/svg/icon_dollar.svg';
import { ReactComponent as Rise } from './../../assets/svg/icon_rise.svg';
import {Contracts, Formatter} from '../../utils/index';
import { setGlobal, getGlobal, useEffect } from 'reactn';

const FundOverView = () => {
    let chartData = {
        series: [
            {
                name: 'Active',
                data: [
                    // {
                    //     x: 1996,
                    //     y: 322,
                    // }
                ],
            },
            // {
            //     name: 'Passive',
            //     data: [
            //         {
            //             x: 1996,
            //             y: 162,
            //         },
            //     ],
            // },
        ],
        options: {
            colors: ['#9661dc', '#6088fc'],
            chart: {
                toolbar: {
                    show: false,
                },
                type: 'area',
                height: 250,
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'straight',
            },
            legend: {
                show: false,
            },
            title: {
                show: false,
                text: '',
            },
            xaxis: {
                show: false,
                type: 'datetime',
                labels: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            yaxis: {
                tickAmount: 4,
                floating: false,

                labels: {
                    show: false,
                    style: {
                        colors: '#8e8da4',
                    },
                    offsetY: -7,
                    offsetX: 0,
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            fill: {
                opacity: 0.5,
                type: 'image',
            },
            tooltip: {
                x: {
                    format: 'yyyy',
                },
                fixed: {
                    enabled: false,
                    position: 'topRight',
                },
            },
            grid: {
                show: false,
                yaxis: {
                    lines: {
                        offsetX: -30,
                    },
                },
                padding: {
                    left: 20,
                },
            },
        },
    };

    const getChain = () => {
        return window.localStorage.getItem('chain');
    }

    const getCoin = () => {
        let chain = window.localStorage.getItem('chain');
        if (chain == 'ETH') {
            return 'ETH';
        } else if (chain == 'BSC') {
            return 'BNB';
        }
    }

    const [fundHoldings, setFundHoldings] = React.useState(1);
    const getFundHoldings = async() => {
        let balance = await Contracts.getFundETH();
        return Formatter.getRoundedBalance(balance.toString());
    }

    const [fundHistory, setFundHistory] = React.useState([]);
    const getFundHistory = async() => {
        let finalHistory = [];
        chartData.series[0].data = [];
        let historyTemp = await Contracts.getFundHistory();
        console.log(historyTemp);
        // for (let i = 0; i < historyTemp[0].length; i++) {
        //     chartData.series[0].data.push({x: historyTemp[0][i], y: historyTemp[1][i]})
        // }
        for (let i = 0; i < historyTemp[0].length; i++) {
            chartData.series[0].data.push({x: 123, y: 456})
        }
        console.log(chartData.series[0].data);
        chartData.series[0].data[0].x = 18392;
        return finalHistory;
    }

    const [fundActivity, setFundActivity] = React.useState({});
    const getFundActivity = async() => {
        let ETHHistory = await Contracts.getFundHistory();
        console.log(ETHHistory);
        return ETHHistory;
    }
    const setActivityDiv = () => {
        let arr = [];
        console.log(fundActivity);
        if (fundActivity[0]) {
            for (let i = 0; i < fundActivity[0].length; i++) {
                arr.push(
                    <div className='row'>
                        <div className='icon'>
                            <Rise />
                        </div>
                        <div className='hex'>...{fundActivity[1][i].substr(fundActivity[1][i].length - 5)}</div>
                        <div className='description'>{fundActivity[2][i]}</div>
                    </div>
                )
            }
        }
        return arr;
    }

    useEffect(() => {
        async function loadData() {
          setFundHoldings(await getFundHoldings());
          setFundActivity(await getFundActivity());
          setFundHistory(await getFundHistory());
          console.log(fundHoldings);
          console.log(fundHistory);
        }     
    
        
    
        loadData();
    }, []);
    
    console.log(fundHoldings);
    return (
        <section className='nav_adjust content_wrap fund_overview'>
            <div data-aos='fade-up' data-aos-offset='0' data-aos-duration='500'>
                <h1>Overview</h1>
                <article>
                    <div className='flex_wrap space_between'>
                        <div className='left_wrap'>
                            <div className='sub_head'>Fund Liquidity</div>
                            {/* <div className='bnb green_text'>{fundHoldings} {getCoin()}</div> */}
                        </div>
                        <div className='right_wrap'>
                            <div className='legend_wrap'>
                                <div className='item active'>
                                    <div className='color_box'></div>Active
                                </div>
                                <div className='item passive'>
                                    <div className='color_box'></div>Passive
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='paper_box'>
                        <Chart
                            options={chartData.options}
                            series={chartData.series}
                            type='area'
                            // height={350}
                        />
                    </div>
                    {getChain() == 'ETH'? 
                        <button className='align_center_ml_sm min_45_sm'>
                            {/* View contract on ETHScan */}
                        </button>
                        :
                        null
                    }
                    {getChain() == 'BSC'? 
                        <button className='align_center_ml_sm min_45_sm'>
                            View contract on BSCScan
                        </button>
                        :
                        null
                    }
                </article>
                <article>
                    <div className='sub_head'>Fund Activity</div>
                    <p>From newest to oldest</p>
                    <div className='paper_box no_padding row_box'>
                        {setActivityDiv()}
                        {/* <div className='row'>
                            <div className='icon'>
                                <Dollar />
                            </div>
                            <div className='hex'>O124587a4B</div>
                            <div className='description'>deposited funds</div>
                        </div> */}
                    </div>
                </article>
            </div>
        </section>
    );
};

export default FundOverView;
