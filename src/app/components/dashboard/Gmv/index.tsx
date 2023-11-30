import React from 'react';
import CardSummary from '../../cards/Summary';


interface GmvComponentProps {
    data:any,
    filter: any
}

const GmvComponent:React.FC<GmvComponentProps>=({data, filter}) => {

    return (
        <div className="w-100">
            <CardSummary 
                title="summary gmv"
                buName={filter}
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