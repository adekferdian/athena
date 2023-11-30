import React from 'react';
import CardSummary from '../../cards/Summary';


interface TransactionComponentProps {
    data:any
}

const TransactionComponent:React.FC<TransactionComponentProps>=({data}) => {

    return (
        <div>
            <CardSummary 
                title="summary transaction"
                buName="Mitra"
                total={105581}
                target={120000}
                achievement="92%"
                average={234}
                chart="Balance"
                chartValue={"0%"}
            />
        </div>
    )
};

export default TransactionComponent;