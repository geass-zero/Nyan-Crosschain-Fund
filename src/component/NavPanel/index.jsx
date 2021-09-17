import './styles.scss';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as BigLogo } from './../../assets/svg/Logo Full.svg';
import { ReactComponent as OverViewIcon } from './../../assets/svg/panelIcons/icon_overview.svg';
import { ReactComponent as PlusIcon } from './../../assets/svg/panelIcons/icon_plus.svg';
import { ReactComponent as OTC } from './../../assets/svg/panelIcons/icon_checked doc.svg';
import { ReactComponent as PassivePool } from './../../assets/svg/panelIcons/icon_clock.svg';
import { ReactComponent as NyanDocum } from './../../assets/svg/panelIcons/icon_documentation.svg';
import { ReactComponent as Rewards } from './../../assets/svg/panelIcons/icon_dollar.svg';
import { ReactComponent as ActivePools } from './../../assets/svg/panelIcons/icon_earnings.svg';
import { ReactComponent as Yield } from './../../assets/svg/panelIcons/icon_flower.svg';
import { ReactComponent as GitHub } from './../../assets/svg/panelIcons/icon_github.svg';
import { ReactComponent as Swap } from './../../assets/svg/panelIcons/icon_swap.svg';
import { ReactComponent as Community } from './../../assets/svg/panelIcons/icon_telegram.svg';
import { ReactComponent as BurgerMenu } from './../../assets/svg/burger menu.svg';
import { ReactComponent as BurgerMenuClose } from './../../assets/svg/close burger menu.svg';
import { Formatter, Contracts, Accounts } from '../../utils/index';
import { setGlobal, getGlobal, useEffect } from 'reactn';

const Test = () => {
    const [expanded, setExpand] = useState(false);
    const [mobExpanded, setMobExpanded] = useState(false);
    const [myAccount, setMyAccount] = useState('');
    const nightModeHandler = (e) => {
        document
            .getElementsByTagName('html')[0]
            .setAttribute('dark', !e.currentTarget.checked);
    };

    useEffect(() => {
        async function loadData() {
          setMyAccount(await Accounts.getCurrentAccount());
        }     
    
        
    
        loadData();
    }, []);

    return (
        <header
            className={
                (expanded ? ' expanded' : '') + (mobExpanded ? ' expanded' : '')
            }
            onMouseEnter={() => setExpand(true)}
            onMouseLeave={() => setExpand(false)}>
            <Link
                to='/'
                onClick={() => setMobExpanded(false)}
                data-aos='fade-down'
                data-aos-offset='0 '
                data-aos-duration='500'>
                <BigLogo className='nyan_logo' />
            </Link>

            {mobExpanded ? (
                <BurgerMenuClose
                    className='burger'
                    onClick={() => setMobExpanded(false)}
                />
            ) : (
                <BurgerMenu
                    className='burger'
                    onClick={() => setMobExpanded(true)}
                />
            )}

            <div className={'header_items' + (mobExpanded ? ' expanded' : '')}>
                <div className='connection only_onExpanded'>
                    <input
                        type='text'
                        name='connectId'
                        id='connectId'
                        disabled
                        defaultValue={'...'+myAccount.substring(myAccount.length - 12)}
                    />
                    <button>Disconnect</button>
                </div>
                <div
                    className='nav_links_set_wrap'
                    data-aos='fade-up'
                    data-aos-offset='0 '
                    data-aos-duration='700'>
                    <div className='head only_onExpanded'>DASHBOARDS</div>
                    <NavLink
                        onClick={() => setMobExpanded(false)}
                        link='/fund-overview'
                        name='Fund Overview'
                        Icon={OverViewIcon}
                    />
                    <NavLink
                        onClick={() => setMobExpanded(false)}
                        link='/create-a-pool'
                        name='Create a pool'
                        Icon={PlusIcon}
                    />
                    <NavLink
                        onClick={() => setMobExpanded(false)}
                        link='/active-pools'
                        name='Active Pools'
                        Icon={ActivePools}
                    />
                    <NavLink
                        onClick={() => setMobExpanded(false)}
                        link='/passive-pools'
                        name='Passive Pools'
                        Icon={PassivePool}
                    />
                    <NavLink
                        onClick={() => setMobExpanded(false)}
                        link='/nyan-rewards'
                        name='Nyan Rewards'
                        Icon={Rewards}
                    />
                </div>
                <div
                    className='nav_links_set_wrap'
                    data-aos='fade-up'
                    data-aos-offset='0 '
                    data-aos-duration='900'>
                    <div className='head only_onExpanded'>
                        CONTRACT INTERFACES
                    </div>
                    <NavLink
                        onClick={() => setMobExpanded(false)}
                        link='/swap'
                        name='Swap'
                        Icon={Swap}
                    />
                    <NavLink
                        onClick={() => setMobExpanded(false)}
                        link='/yield'
                        name='Yield'
                        Icon={Yield}
                    />
                    <NavLink
                        onClick={() => setMobExpanded(false)}
                        link='/otc-swap'
                        name='OTC Swap'
                        Icon={OTC}
                    />
                    <NavLink
                        onClick={() => setMobExpanded(false)}
                        link='/governance'
                        name='Governance'
                        Icon={OTC}
                    />
                </div>
                <div
                    className='nav_links_set_wrap'
                    data-aos='fade-up'
                    data-aos-offset='0 '
                    data-aos-duration='1100'>
                    <div
                        className='special_link'
                        onClick={() => setMobExpanded(false)}>
                        <NyanDocum />
                        <div className='text_wrap only_onExpanded'>
                            <div className='main'>Nyan Documentation</div>
                        </div>
                    </div>
                    <div
                        className='special_link'
                        onClick={() => setMobExpanded(false)}>
                        <Community />
                        <div className='text_wrap only_onExpanded'>
                            <div className='main'>Join Community</div>
                            <div className='descr'>
                                Join our awesome Telegram
                            </div>
                        </div>
                    </div>
                    <div
                        className='special_link'
                        onClick={() => setMobExpanded(false)}>
                        <GitHub />
                        <div className='text_wrap only_onExpanded'>
                            <div className='main'>Github</div>
                            <div className='descr'>View source code</div>
                        </div>
                    </div>
                </div>
                <div
                    className='theme_shift only_onExpanded'
                    data-aos='fade-up'
                    data-aos-offset='0 '
                    data-aos-duration='1300'>
                    <input
                        id='s2'
                        type='checkbox'
                        className='switch'
                        onClick={() => setMobExpanded(false)}
                        onChange={nightModeHandler}
                    />
                    <label htmlFor='s2'>Night Mode</label>
                </div>
            </div>
        </header>
    );
};

const NavLink = ({ link, name, Icon, onClick }) => {
    const location = useLocation();
    return (
        <Link
            to={link}
            onClick={onClick}
            className={
                'nav_link' + (location.pathname === '/' + link ? ' active' : '')
            }>
            <Icon />
            <span className='only_onExpanded'>{name}</span>
        </Link>
    );
};

export default Test;
