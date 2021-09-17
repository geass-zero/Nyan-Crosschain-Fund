import PopUp from './../../../component/PopUp';
import { ReactComponent as Edit } from './../../../assets/svg/icon_edit.svg';

const EditPopUp = ({ showEditPop, setShowEditPop }) => {

    return (
        <PopUp
            visible={showEditPop}
            className={'edit_pop_up'}
            onClose={() => setShowEditPop(false)}
            responsive={false}>
            <div className='edit_header'>
                <div className='image'></div>
                <Edit />
                <div>Edit pool image</div>
            </div>
            <div className='form_wrap'>
                <div className='form_item_wrap'>
                    <label>Pool manager fee %:</label>
                    <input
                        type='number'
                        className='input_box'
                        defaultValue='1'
                    />
                </div>
                <button
                    className='align_center_ml_sm min_45_sm'
                    onClick={() => setShowEditPop(false)}>
                    Update
                </button>
                <div className='form_item_wrap'>
                    <label>Pool description:</label>
                    <textarea id="pdescription" className='input_box' />
                </div>
            </div>
            <button
                className='align_center_ml_sm min_45_sm'
                onClick={() => setShowEditPop(false)}>
                Update
            </button>
        </PopUp>
    );
};

export default EditPopUp;
