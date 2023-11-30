import React from 'react';
import CardSummary from '../../cards/Summary';


interface GmvComponentProps {
    data:any
}

const GmvComponent:React.FC<GmvComponentProps>=({data}) => {

    return (
        <div>
            <CardSummary 
                title="summary gmv"
                buName="Mitra"
                total={92503412}
                target={95000000}
                achievement="92.2%"
                average={1255221}
                chart="Up"
                chartValue={"21.4%"}
            />
        </div>
    )
};

export default GmvComponent;