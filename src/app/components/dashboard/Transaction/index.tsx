import React from 'react';
import CardSummary from '../../cards/Summary';


interface TransactionComponentProps {
    data:any,
    filter: any
}

const TransactionComponent:React.FC<TransactionComponentProps>=({data, filter}) => {

    return (
        <div>
            <CardSummary 
                title="summary transaction"
                buName={filter}
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