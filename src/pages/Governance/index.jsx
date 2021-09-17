import './styles.scss';
import { ReactComponent as Exclamation } from './../../assets/svg/icon_exclamation.svg';
import Contract from './Contract';

const testData = [
    {
        address: '012345',
        yesVotes: 3,
        noVotes: 8,
        timeRemaining: 100000000,
    },
    {
        address: '024890',
        yesVotes: 8,
        noVotes: 2,
        timeRemaining: 100000,
    },
];

const Governance = () => {
    return (
        <section className='nav_adjust content_wrap governance'>
            <div data-aos='fade-up' data-aos-offset='0' data-aos-duration='500'>
                <div className='flex_wrap space_between flex_column_sm'>
                    <h1>Governance</h1>
                    <p>
                        MY VOTES: <span className='green_text'> 2800</span>
                    </p>
                </div>
                <article className='paper_box purple_text vote_info'>
                    <div className='head'>
                        <Exclamation />
                        Voting info:
                    </div>
                    <p className='purple_text'>
                        Voting locks your tokens for the duration of the vote.
                        When voting is complete, make sure to ‘release votes’ to
                        free up votes and tokens.
                    </p>
                    <button className='invert align_center_ml_sm'>
                        Release votes
                    </button>
                </article>
                <article>
                    <div className='head main_head'>
                        <span>Contract whitelist</span>
                        <div className='xs_visible link'>View all</div>
                    </div>
                    <p className='no_margin small'>
                        Contracts wanting to access the Nyan Fund will need to
                        be approved by voters here.
                    </p>
                    <div className='paper_box no_padding row_box plain_sm'>
                        <div className='contracts_wrap'>
                            <div className='contracts_head_wrap'>
                                <div className='head_item'>
                                    Contract address
                                </div>
                                <div className='head_item'>Yes votes</div>
                                <div className='head_item'>No votes</div>
                                <div className='head_item'>Time remaining</div>
                                <div className='head_item input_content'>
                                    Enter vote amount
                                </div>
                                <div className='head_item'></div>
                            </div>
                            <div className='contacts_body_wrap'>
                                <Contract data={testData[0]} />
                                <Contract data={testData[1]} />
                            </div>
                        </div>
                    </div>
                </article>
                <article>
                    <div className='head main_head'>
                        <span>Contract updates</span>
                        <div className='xs_visible link'>View all</div>
                    </div>
                    <p className='no_margin small'>
                        Updates to any contract within the Nyan ecosystem must
                        be approved here first.
                    </p>
                    <div className='paper_box no_padding row_box plain_sm'>
                        <div className='contracts_wrap'>
                            <div className='contracts_head_wrap'>
                                <div className='head_item'>
                                    Contract address
                                </div>
                                <div className='head_item'>Yes votes</div>
                                <div className='head_item'>No votes</div>
                                <div className='head_item'>Time remaining</div>
                                <div className='head_item input_content'>
                                    Enter vote amount
                                </div>
                                <div className='head_item'></div>
                            </div>
                            <div className='contacts_body_wrap'>
                                <Contract data={testData[0]} />
                                <Contract data={testData[1]} />
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default Governance;
