import React from 'react';
import { toAbsoluteUrl } from 'src/_metronic/helpers';
import { convertToRupiah } from 'src/_metronic/helpers/convertToRupiah';
import SVG from 'react-inlinesvg'

interface SummaryProps {
    title: any,
    buName: any,
    total: any,
    target: any,
    achievement: any,
    average: any,
    chart: any,
    chartValue: any
};

const CardSummary:React.FC<SummaryProps>= ({
    title, buName, total, target, achievement, average, chart, chartValue
}) => {

    return (
        <div className="p-3">
            <p className="text-uppercase">{title}</p>
            <p className="fw-bolder">{buName}</p>
            <p style={{fontSize: '1.7vw'}} className="fw-bolder responsive-font-example">{convertToRupiah(total)}</p>
            <div className="d-flex justify-content-between">
                <p>Target:</p>
                <p className="fw-bolder">{convertToRupiah(target)}</p>
            </div>
            <div className="d-flex justify-content-between">
                <p>Achievement:</p>
                <p className="fw-bolder">{achievement}</p>
            </div>
            <div className="mb-2" style={{border: ".5px solid #F4F4F4", width: '100%',}} />
            <p>Average</p>
            <div className="d-flex justify-content-between">
                <p>last 3 Month:</p>
                <p className="fw-bolder">{convertToRupiah(average)} / day</p>
            </div>
            <div className="d-flex" style={{gap: 10}}>
                {
                    chart === "Up" ?
                    <div className="rounded d-flex" style={{backgroundColor: '#DAF2E8', minWidth: 76, alignItems: 'center', gap: 5, justifyContent: 'center', maxHeight: 30}}>
                        <SVG src={toAbsoluteUrl("/icons/dashboard/chart_up.svg")} className={'mh-50px'} />
                        <p className="fw-bolder mt-3" style={{color: '#007745', paddingTop: 2}}>{chartValue}</p>
                    </div>
                    : chart === "Down" ?
                    <div className="rounded d-flex" style={{backgroundColor: '#FCDDDE', minWidth: 76, alignItems: 'center', gap: 5, justifyContent: 'center', maxHeight: 30}}>
                        <SVG src={toAbsoluteUrl("/icons/dashboard/chart_down.svg")} className={'mh-50px'} />
                        <p className="fw-bolder mt-3" style={{color: '#c81918', paddingTop: 2}}>{chartValue}</p>
                    </div>
                    :
                    <div className="rounded d-flex" style={{backgroundColor: '#F4F4F4', minWidth: 76, alignItems: 'center', gap: 5, justifyContent: 'center', maxHeight: 30}}>
                        <SVG src={toAbsoluteUrl("/icons/dashboard/chart_balance.svg")} className={'mh-50px'} />
                        <p className="fw-bolder mt-3" style={{color: '#696969', paddingTop: 2}}>{chartValue}</p>
                    </div>
                }
                <p className="mt-1">/ Yesterday</p>
            </div>
        </div>
    )
};

export default CardSummary;