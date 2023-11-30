import React from 'react';
import CardSummary from '../../cards/Summary';


interface RevenueComponentProps {
    data:any,
    filter: any
}

const RevenueComponent:React.FC<RevenueComponentProps>=({data, filter}) => {

    return (
        <div>
            <CardSummary 
                title="summary revenue"
                buName={filter}
                total={74425521}
                target={120000000}
                achievement="61.4%"
                average={956021}
                chart="Down"
                chartValue={"21.4%"}
            />
        </div>
    )
};

export default RevenueComponent;