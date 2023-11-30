import React from 'react';
import {PageTitle} from 'src/_metronic/layout/core';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    FormGroup,
    Input,
    Button
} from 'reactstrap';
import {
    ChevronDown, ChevronUp
} from 'react-feather';
import GmvComponent from 'src/app/components/dashboard/Gmv';
import RevenueComponent from 'src/app/components/dashboard/Revenue';
import TransactionComponent from 'src/app/components/dashboard/Transaction';
import BuContributionComponent from 'src/app/components/dashboard/BuContribution';
import VisualitationDataComponent from 'src/app/components/dashboard/VisualizationData';
import { convertToRupiah } from 'src/_metronic/helpers/convertToRupiah';


const DashboardPage = () => {
    const [filterDateValue, setFilterDateValue] = React.useState("Today");
    const [filterBuValue, setFilterBuValue] = React.useState("All Business Unit");
    const [filterTempBuValue, setFilterTempBuValue] = React.useState("All Business Unit");
    const [filterPovValue, setFilterPovValue] = React.useState("Commercial");
    const [dropdownOpen1, setDropdownOpen1] = React.useState(false);
    const [dropdownOpen2, setDropdownOpen2] = React.useState(false);
    const [dropdownOpen3, setDropdownOpen3] = React.useState(false);
    const toggle1 = () => setDropdownOpen1(!dropdownOpen1);
    const toggle2 = () => setDropdownOpen2(!dropdownOpen2);
    const toggle3 = () => setDropdownOpen3(!dropdownOpen3);

    const dummyData = {}

    return (
        <div>
            <PageTitle>
                Dashboard
            </PageTitle>
            <div className="w-100 bg-white d-flex">
                <div className='my-1 d-flex mx-9' style={{height: 50, gap: 10}}>
                    <Dropdown isOpen={dropdownOpen1} toggle={toggle1} className="cursor-pointer">
                        <DropdownToggle
                            data-toggle="dropdown"
                            tag="span"
                        >
                            <div className="d-flex border rounded" style={{height: 40, minWidth: 84, justifyContent: 'center', alignItems: 'center', gap: 3}}>
                                <p className="pt-3">{filterDateValue}</p>
                                {
                                    dropdownOpen1 ? <ChevronUp size={19} /> : <ChevronDown size={19} />
                                }
                            </div>
                        </DropdownToggle>
                        <DropdownMenu className="rounded bg-white">
                            <div className="filter-dashboard" onClick={() => {
                                setFilterDateValue("Today")
                                toggle1()
                            }}>
                                <p className="p-1">
                                    Today
                                </p>
                            </div>
                            <div className="filter-dashboard" onClick={() => {
                                setFilterDateValue("This Week")
                                toggle1()
                            }}>
                                <p className="p-1">
                                    This Week
                                </p>
                            </div>
                            <div className="filter-dashboard" onClick={() => {
                                setFilterDateValue("This Month")
                                toggle1()
                            }}>
                                <p className="p-1">
                                    This Month
                                </p>
                            </div>
                            <div className="filter-dashboard" onClick={() => {
                                setFilterDateValue("Custom Period")
                                toggle1()
                            }}>
                                <p className="p-1">
                                    Custom Period
                                </p>
                            </div>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown isOpen={dropdownOpen2} toggle={toggle2} className="cursor-pointer">
                        <DropdownToggle
                            data-toggle="dropdown"
                            tag="span"
                        >
                            <div className="d-flex border rounded" style={{height: 40, minWidth: 136, justifyContent: 'center', alignItems: 'center', gap: 3}}>
                                <p className="pt-3">{filterBuValue}</p>
                                {
                                    dropdownOpen2 ? <ChevronUp size={19} /> : <ChevronDown size={19} />
                                }
                            </div>
                        </DropdownToggle>
                        <DropdownMenu className="rounded bg-white" style={{minWidth: 150}}>
                            <FormGroup className="mb-3 filter-dashboard d-flex" style={{gap: 5, backgroundColor: filterTempBuValue === "All Business Unit" ? '#D5FAFD' : "white", height: 40, alignItems: 'center'}} onClick={(e:any) => setFilterTempBuValue("All Business Unit")}>
                                <Input
                                    inline
                                    type="checkbox"
                                    label="Checkbox"
                                    style={{
                                        backgroundColor: filterTempBuValue === "All Business Unit" ? '#2BBECB' : "#c9c9c9",
                                        width: 23,
                                        height: 20,
                                        marginLeft: 5
                                    }}
                                    value="All Business Unit"
                                    checked={true}
                                />
                                <p style={{color: '#2BBECB', fontSize: 14, marginTop: 12}} >All Business Unit</p>
                            </FormGroup>
                            <FormGroup className="mb-3 filter-dashboard d-flex" style={{gap: 5, backgroundColor: filterTempBuValue === "Mitra" ? '#D5FAFD' : "white", height: 40, alignItems: 'center'}} onClick={(e:any) => setFilterTempBuValue("Mitra")}>
                                <Input
                                    inline
                                    type="checkbox"
                                    label="Checkbox"
                                    style={{
                                        backgroundColor: filterTempBuValue === "Mitra" ? '#2BBECB' : "#c9c9c9",
                                        width: 23,
                                        height: 20,
                                        marginLeft: 5
                                    }}
                                    value="Mitra"
                                    checked={true}
                                />
                                <p style={{color: '#2BBECB', fontSize: 14, marginTop: 12}}>Mitra</p>
                            </FormGroup>
                            <FormGroup className="mb-3 filter-dashboard d-flex" style={{gap: 5, backgroundColor: filterTempBuValue === "Logistic" ? '#D5FAFD' : "white", height: 40, alignItems: 'center'}} onClick={(e:any) => setFilterTempBuValue("Logistic")}>
                                <Input
                                    inline
                                    type="checkbox"
                                    label="Checkbox"
                                    style={{
                                        backgroundColor: filterTempBuValue === "Logistic" ? '#2BBECB' : "#c9c9c9",
                                        width: 23,
                                        height: 20,
                                        marginLeft: 5
                                    }}
                                    value="Logistic"
                                    checked={true}
                                />
                                <p style={{color: '#2BBECB', fontSize: 14, marginTop: 12}}>Logistic</p>
                            </FormGroup>
                            <FormGroup className="d-flex justify-content-center">
                                <Button style={{height: 40, width: '80%'}} onClick={() => {
                                    setFilterBuValue(filterTempBuValue)
                                    toggle2()
                                }}>
                                    <p style={{marginTop: -3}}>Apply</p>
                                </Button>
                            </FormGroup>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown isOpen={dropdownOpen3} toggle={toggle3} className="cursor-pointer">
                        <DropdownToggle
                            data-toggle="dropdown"
                            tag="span"
                        >
                            <div className="d-flex border rounded" style={{height: 40, minWidth: 126, justifyContent: 'center', alignItems: 'center', gap: 3}}>
                                <p className="pt-3">{filterPovValue}</p>
                                {
                                    dropdownOpen3 ? <ChevronUp size={19} /> : <ChevronDown size={19} />
                                }
                            </div>
                        </DropdownToggle>
                        <DropdownMenu className="rounded bg-white">
                            <div className="filter-dashboard" onClick={() => {
                                setFilterPovValue("Commercial")
                                toggle3()
                            }}>
                                <p className="p-1">
                                    Commercial
                                </p>
                            </div>
                            <div className="filter-dashboard" onClick={() => {
                                setFilterPovValue("Financial")
                                toggle3()
                            }}>
                                <p className="p-1">
                                    Financial
                                </p>
                            </div>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div className="d-flex w-100 justify-content-start">
                <div id="left-container" className="w-100" style={{maxWidth: '28%'}}>
                    <div id="gmv" className="bg-white rounded border-1 my-9 mx-5">
                        <GmvComponent data={dummyData} filter={filterBuValue} />
                    </div>
                    <div id="revenue" className="bg-white rounded border-1 my-9 mx-5">
                        <RevenueComponent data={dummyData} filter={filterBuValue} />
                    </div>
                    <div id="transaction" className="bg-white rounded border-1 my-9 mx-5">
                        <TransactionComponent data={dummyData} filter={filterBuValue} />
                    </div>
                </div>
                <div id="right-container" className="w-100 mx-2">
                    <div className="d-flex" style={{gap: 5, width: '100%'}}>
                        <div id="bu-contribution"  className="bg-white rounded border-1 my-9 d-flex" style={{width: '70%'}}>
                            <BuContributionComponent data={dummyData} filter={filterBuValue} callback={(param:any) => setFilterBuValue(param)} />
                        </div>
                        <div id="sum-promo" style={{width: "30%"}}>
                            <div id="gmv" className="bg-white rounded border-1 my-9" style={{width: '100%'}}>
                                <div className="p-3">
                                    <p className="text-uppercase" style={{fontSize: 14}}>summary promo</p>
                                    <p className="fw-bolder" style={{marginTop: -10, fontSize: 12}}>{filterBuValue}</p>
                                    <p style={{fontSize: 14}}>Budget Used:</p>
                                    <p style={{fontSize: 26}} className="fw-bolder responsive-font-example">{convertToRupiah(160000000)}</p>
                                    <div className="d-flex justify-content-between">
                                        <p style={{fontSize: 14}}>Allocation:</p>
                                        <p style={{fontSize: 14}} className="fw-bolder">{convertToRupiah(200000000)}</p>
                                    </div>
                                    <div className="mb-2" style={{border: ".5px solid #F4F4F4", width: '100%', marginTop: -10}} />
                                    <div className="d-flex justify-content-between" style={{width: '95%'}}>
                                        <div>
                                            <p>Total Promo:</p>
                                            <p className="fw-bolder" style={{marginTop: -10}}>24</p>
                                            <p>Promo Claimed:</p>
                                            <p className="fw-bolder" style={{marginTop: -10}}>1500</p>
                                        </div>
                                        <div>
                                            <p>Total Quota:</p>
                                            <p className="fw-bolder" style={{marginTop: -10}}>2400</p>
                                            <p>Promo Used:</p>
                                            <p className="fw-bolder" style={{marginTop: -10}}>1240</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="visual-data" className="bg-white rounded border-1 my-2" style={{width: '100%'}}>
                        <VisualitationDataComponent data={dummyData} filter={filterBuValue} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DashboardPage;