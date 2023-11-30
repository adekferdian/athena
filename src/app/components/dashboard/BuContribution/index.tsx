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
    const [title, setTitle] = React.useState("GMV");

    React.useEffect(() => {
        setActiveTab(filter)
    }, [filter]);

    return (
        <div className="w-100">  
            <div className="p-3">
                <p className="text-uppercase">business unit contribution</p>
                <p className="fw-bolder">{filter}</p>
            </div>
            <div className="mb-2" style={{border: ".5px solid #F4F4F4", width: '100%', marginTop: -10}} />
            <div className="p-3 mt-1 d-flex">
                <div>
                    <div onClick={() => {
                        setActiveTab(1);
                        setTitle("GMV")
                    }} className="rounded cursor-pointer filter-dashboard border d-flex" style={{backgroundColor: activeTab === 1 ? '#EAF9FA' : '#F4F4F4', alignItems: 'center', minHeight: 40, minWidth: 100}}>
                        <SVG  src={toAbsoluteUrl("/icons/dashboard/gmv_ic.svg")} className={'mh-50px svg-icon svg-icon-primary'} style={{marginLeft: 5,}} />
                        <p style={{paddingTop: 8, marginLeft: 5}}>GMV</p>
                    </div>                
                    <div onClick={() => {
                        setActiveTab(2);
                        setTitle("REVENUE")
                    }} className="rounded cursor-pointer filter-dashboard border d-flex mt-2" style={{backgroundColor: activeTab === 2 ? '#EAF9FA' : '#F4F4F4', alignItems: 'center', minHeight: 40, minWidth: 100}}>
                        <SVG  src={toAbsoluteUrl("/icons/dashboard/revenue_ic.svg")} className={'mh-50px svg-icon svg-icon-primary'} style={{marginLeft: 5,}} />
                        <p style={{paddingTop: 8, marginLeft: 5}}>Revenue</p>
                    </div>                
                    <div onClick={() => {
                        setActiveTab(3);
                        setTitle("TRANSACTION")
                    }} className="rounded cursor-pointer filter-dashboard border d-flex mt-2" style={{backgroundColor: activeTab === 3 ? '#EAF9FA' : '#F4F4F4', alignItems: 'center', minHeight: 40, minWidth: 100}}>
                        <SVG  src={toAbsoluteUrl("/icons/dashboard/trx_ic.svg")} className={'mh-50px svg-icon svg-icon-primary'} style={{marginLeft: 5,}} />
                        <p style={{paddingTop: 8, marginLeft: 5}}>Transaction</p>
                    </div>                 
                </div>
                <div className="bg-white d-flex" style={{width: '80%', position: 'relative',}}>
                    <div style={{minWidth: "20%",}}>
                        <ApexRadiarChart title={title} value1={30} value2={70} filter={filter} />
                    </div>
                    <div style={{position: 'relative', marginTop: 120}}>
                        {
                            filter !== "Logistic" &&
                            <div className="d-flex justify-content-end" style={{gap: 4, marginRight: 15}}>
                                <SVG src={toAbsoluteUrl("/icons/dashboard/mitra_ic.svg")} className={'mh-50px svg-icon svg-icon-primary'} style={{marginLeft: 5,}} />
                                <p style={{marginTop: 5}}>Mitra</p>
                            </div>
                        }
                        {
                            filter !== "Mitra" &&
                            <div className="d-flex justify-content-end" style={{gap: 4, marginRight: 0}}>
                                <SVG src={toAbsoluteUrl("/icons/dashboard/logistic_ic_green.svg")} className={'mh-50px svg-icon svg-icon-primary'} style={{marginLeft: 5,}} />
                                <p style={{marginTop: 5}}>Logistic</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BuContributionComponent;