import React from 'react';
import SVG from 'react-inlinesvg'
import { toAbsoluteUrl } from 'src/_metronic/helpers';
import ApexColumnCharts from '../../charts/apex/ApexColumnCharts';
interface ComponentProps {
    data:any,
    filter: any
}

const VisualitationDataComponent:React.FC<ComponentProps>=({data, filter}) => {    
    const [activeTab, setActiveTab] = React.useState(1);

    const dummyDataMitraGmv = [220, 120, 55, 100, 80, 125, 175, 70, 88, 180, 980, 700];
    const dummyDataLogisticGmv = [220, 120, 55, 100, 80, 125, 175, 70, 88, 180, 980, 700];

    const RenderGmvTab = () => <ApexColumnCharts direction={false} filter={filter} dataMitra={dummyDataMitraGmv} dataLogistic={dummyDataLogisticGmv} />;
    const RenderRevenueTab = () => <ApexColumnCharts direction={false} filter={filter} dataMitra={dummyDataMitraGmv} dataLogistic={dummyDataLogisticGmv} />
    const RenderTransactionTab = () => <ApexColumnCharts direction={false} filter={filter} dataMitra={dummyDataMitraGmv} dataLogistic={dummyDataLogisticGmv} />
    const RenderBudgetPromoTab = () => <ApexColumnCharts direction={false} filter={filter} dataMitra={dummyDataMitraGmv} dataLogistic={dummyDataLogisticGmv} />
    const RenderPromoUsedTab = () => <ApexColumnCharts direction={false} filter={filter} dataMitra={dummyDataMitraGmv} dataLogistic={dummyDataLogisticGmv} />
    

    return (
        <>
            <div className="p-3">
                <p className="text-uppercase">VISUALIZATION DATA</p>
            </div>
            <div className="mb-2" style={{border: ".5px solid #F4F4F4", width: 'auto', marginTop: -10}} />
            <div className="p-3 mt-1 d-flex" style={{gap: 10}}>
                <div style={{minWidth: 150}}>
                    <div onClick={() => setActiveTab(1)} className="rounded cursor-pointer filter-dashboard border d-flex" style={{backgroundColor: activeTab === 1 ? '#EAF9FA' : '#F4F4F4', alignItems: 'center', minHeight: 40, minWidth: 100}}>
                        <SVG  src={toAbsoluteUrl("/icons/dashboard/gmv_ic.svg")} className={'mh-50px svg-icon svg-icon-primary'} style={{marginLeft: 5,}} />
                        <p style={{paddingTop: 8, marginLeft: 5}}>GMV</p>
                    </div>                
                    <div onClick={() => setActiveTab(2)} className="rounded cursor-pointer filter-dashboard border d-flex mt-2" style={{backgroundColor: activeTab === 2 ? '#EAF9FA' : '#F4F4F4', alignItems: 'center', minHeight: 40, minWidth: 100}}>
                        <SVG  src={toAbsoluteUrl("/icons/dashboard/revenue_ic.svg")} className={'mh-50px svg-icon svg-icon-primary'} style={{marginLeft: 5,}} />
                        <p style={{paddingTop: 8, marginLeft: 5}}>Revenue</p>
                    </div>                
                    <div onClick={() => setActiveTab(3)} className="rounded cursor-pointer filter-dashboard border d-flex mt-2" style={{backgroundColor: activeTab === 3 ? '#EAF9FA' : '#F4F4F4', alignItems: 'center', minHeight: 40, minWidth: 100}}>
                        <SVG  src={toAbsoluteUrl("/icons/dashboard/trx_ic.svg")} className={'mh-50px svg-icon svg-icon-primary'} style={{marginLeft: 5,}} />
                        <p style={{paddingTop: 8, marginLeft: 5}}>Transaction</p>
                    </div>                
                    <div onClick={() => setActiveTab(4)} className="rounded cursor-pointer filter-dashboard border d-flex mt-2" style={{backgroundColor: activeTab === 4 ? '#EAF9FA' : '#F4F4F4', alignItems: 'center', minHeight: 40, minWidth: 100}}>
                        <SVG  src={toAbsoluteUrl("/icons/dashboard/budget_promo_ic.svg")} className={'mh-50px svg-icon svg-icon-primary'} style={{marginLeft: 5,}} />
                        <p style={{paddingTop: 8, marginLeft: 5}}>Budget Promo</p>
                    </div>                
                    <div onClick={() => setActiveTab(5)} className="rounded cursor-pointer filter-dashboard border d-flex mt-2" style={{backgroundColor: activeTab === 5 ? '#EAF9FA' : '#F4F4F4', alignItems: 'center', minHeight: 40, minWidth: 100}}>
                        <SVG  src={toAbsoluteUrl("/icons/dashboard/used_promo_ic.svg")} className={'mh-50px svg-icon svg-icon-primary'} style={{marginLeft: 5,}} />
                        <p style={{paddingTop: 8, marginLeft: 5}}>Promo Used</p>
                    </div>                
                </div>
                <div className="d-flex bg-white" style={{flexWrap: 'wrap', borderLeft: '1px solid #F4F4F4', marginTop: -15, width: '100%'}}>
                    {
                        activeTab === 1 ? <RenderGmvTab /> :
                        activeTab === 2 ? <RenderRevenueTab /> :
                        activeTab === 3 ? <RenderTransactionTab /> :
                        activeTab === 4 ? <RenderBudgetPromoTab /> :
                        activeTab === 5 ? <RenderPromoUsedTab /> : null
                    }
                </div>
            </div>
        </>
    )
};

export default VisualitationDataComponent;