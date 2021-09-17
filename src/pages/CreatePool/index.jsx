import './styles.scss';
import { useState } from 'react';
import UserAgreement from './UserAgreement';
import CreateActivePassivePool from './CreateActivePassivePool';

const CreatePool = () => {
    const [acknowledged, setAcknowledged] = useState(false);
    return (
        <section className='nav_adjust content_wrap create_pool'>
            <div className='max_width_wrap'>
                <div
                    data-aos='fade-up'
                    data-aos-offset='0'
                    data-aos-duration='500'>
                    {acknowledged ? (
                        <CreateActivePassivePool />
                    ) : (
                        <UserAgreement
                            onComplete={() => setAcknowledged(true)}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default CreatePool;
