import './styles.scss';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import { Formatter } from '../../utils/index';

const AvailableGraph = ({ type, name, owner, aum, lifetime }) => {
    const graphColor = type === 'active' ? '#9661dc' : '#6088fc';
    const chartData = {
        series: [
            {
                name: 'Passive',
                data: [
                    {
                        x: 1996,
                        y: 162,
                    },
                    {
                        x: 1997,
                        y: 90,
                    },
                    {
                        x: 1998,
                        y: 50,
                    },
                    {
                        x: 1999,
                        y: 77,
                    },
                    {
                        x: 2000,
                        y: 35,
                    },
                    {
                        x: 2001,
                        y: 45,
                    },
                    {
                        x: 2002,
                        y: 88,
                    },
                    {
                        x: 2003,
                        y: 120,
                    },
                    {
                        x: 2004,
                        y: 156,
                    },
                    {
                        x: 2005,
                        y: 123,
                    },
                    {
                        x: 2006,
                        y: 88,
                    },
                    {
                        x: 2007,
                        y: 66,
                    },
                    {
                        x: 2008,
                        y: 45,
                    },
                    {
                        x: 2009,
                        y: 29,
                    },
                    {
                        x: 2010,
                        y: 45,
                    },
                    {
                        x: 2011,
                        y: 88,
                    },
                    {
                        x: 2012,
                        y: 132,
                    },
                    {
                        x: 2013,
                        y: 146,
                    },
                    {
                        x: 2014,
                        y: 169,
                    },
                    {
                        x: 2015,
                        y: 184,
                    },
                ],
            },
        ],
        options: {
            colors: [graphColor],
            chart: {
                toolbar: {
                    show: false,
                },
                type: 'area',
                height: 350,
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
                type: 'gradient',
                gradient: {
                    shadeIntensity: 0.5,
                    opacityFrom: 0.8,
                    opacityTo: -0.2,
                },
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
    return (
        <section className='content_wrap available_graph_wrap'>
            <div className='title'>
                <div className='prof_pic'></div>
                <div className='name'>{name}</div>
            </div>
            {owner && <div className='owner'>{owner}</div>}
            <Chart
                options={chartData.options}
                series={chartData.series}
                type='area'
                height={250}
            />
            <div className='details'>
                {type === 'active' ? (
                    <>
                        <p>
                            Assets under management
                            <strong>
                                <span className='green_text'> {Formatter.getRoundedBalance(aum)} BNB</span>
                            </strong>
                        </p>
                        <p>
                            Lifetime profits:
                            <strong>
                                <span className='green_text'> {Formatter.getRoundedBalance(lifetime)} BNB</span>
                            </strong>
                        </p>
                        <div className='top_holds_head'>TOP HOLDS</div>
                    </>
                ) : (
                    <>
                        <p>
                            Index valuation:
                            <strong>
                                <span className='green_text'> $ 20.8K</span>
                            </strong>
                        </p>
                        <div className='top_holds_head'>TOKENS</div>
                    </>
                )}
                <div className='top_holds'>
                    <div className='item'>LINK</div>
                    <div className='item'>WBTC</div>
                    <div className='item'>AAVE</div>
                </div>
            </div>
            <Link
                to={
                    type === 'active' ? 'active-pool-info/'+owner : '/index-fund-info'
                }>
                <button className='align_center_ml_sm min_45_sm'>View</button>
            </Link>
        </section>
    );
};

export default AvailableGraph;
