import React from 'react';
import SVG from 'react-inlinesvg'
import { toAbsoluteUrl } from 'src/_metronic/helpers';
import ApexRadiarChart from "../../charts/apex/ApexRadiarChart"
interface BuContributionComponentProps {
    data:any,
    filter: any,
    callback: any
}

const BuContributionComponent:React.FC<BuContributionComponentProps>=({data, filter, callback}) => {    
    const [activeTab, setActiveTab] = React.useState(filter);

    React.useEffect(() => {
        setActiveTab(filter)
    }, [filter]);

    return (
        <>  
            <div className="p-3">
                <p className="text-uppercase">business unit contribution</p>
                <p className="fw-bolder">Mitra</p>
            </div>
            <div className="mb-2" style={{border: ".5px solid #F4F4F4", width: '100%', marginTop: -10}} />
            <div className="p-3 mt-1 d-flex">
                <div>
                    <div onClick={() => {
                        setActiveTab("Logistic")
                        callback("Logistic")
                    }} className="rounded cursor-pointer border d-flex" style={{backgroundColor: activeTab !== "Mitra" ? '#EAF9FA' : '#F4F4F4', alignItems: 'center', minHeight: 40, minWidth: 100}}>
                        <SVG src={toAbsoluteUrl(activeTab !== "Mitra" ? "/icons/dashboard/logistic_ic_green.svg" : "/icons/dashboard/logistic_ic.svg")} className={'mh-50px svg-icon svg-icon-primary'} style={{marginLeft: 5,}} />
                        <p style={{paddingTop: 8, marginLeft: 5}}>Logistic</p>
                    </div>                
                    <div onClick={() => {
                        setActiveTab("Mitra")
                        callback("Mitra")
                    }} className="rounded cursor-pointer border d-flex mt-2" style={{backgroundColor: activeTab !== "Logistic" ? '#EAF9FA' : '#F4F4F4', alignItems: 'center', minHeight: 40, minWidth: 100}}>
                        <SVG src={toAbsoluteUrl("/icons/dashboard/mitra_ic.svg")} className={'mh-50px svg-icon-secondary'} style={{marginLeft: 5,}} />
                        <p style={{paddingTop: 8, marginLeft: 5}}>Mitra</p>
                    </div>                
                </div>
                <div className="d-flex bg-white" style={{flexWrap: 'wrap', width: '100%'}}>
                    <div style={{maxWidth: 250}}>
                        <ApexRadiarChart title="GMV" value1={30} value2={70} filter={filter} />
                    </div>
                    <div style={{maxWidth: 250}}>
                        <ApexRadiarChart title="REVENUE" value1={10} value2={90} filter={filter} />
                    </div>
                    <div style={{maxWidth: 250}}>
                        <ApexRadiarChart title="TRANSACTION" value1={65} value2={35} filter={filter} />
                    </div>
                </div>
            </div>
        </>
    )
};

export default BuContributionComponent;