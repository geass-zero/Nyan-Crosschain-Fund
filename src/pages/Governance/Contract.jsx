import { ReactComponent as Network } from './../../assets/svg/icon_network.svg';
import Timer from './Timer';

const Contract = ({ data }) => {
    return (
        <div className='contract_item'>
            <div className='contract_data_item'>
                <div className='label xs_visible'>Contract address</div>
                <div className='flex_wrap'>
                    <Network /> <strong>{data.address}</strong>
                </div>
            </div>
            <div className='contract_data_item'>
                <div className='label xs_visible'>Yes votes</div>
                {data.yesVotes}
            </div>
            <div className='contract_data_item'>
                <div className='label xs_visible'>No votes</div>
                {data.noVotes}
            </div>
            <div className='contract_data_item'>
                <div className='label xs_visible'>Time remaining</div>
                <Timer timerValue={data.timeRemaining} />
            </div>
            <div className='contract_data_item input_content'>
                <div className='label xs_visible'>Enter vote amount</div>
                <input type='text' className='input_box' />
            </div>
            <div className='contract_data_item'>
                <button className='align_center_ml_sm'>Vote</button>
            </div>
        </div>
    );
};

export default Contract;
