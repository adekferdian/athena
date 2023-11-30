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
                <div className='my-1 text-break d-flex mx-9' style={{height: 50, gap: 10}}>
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
            <div className="d-flex">
                <div id="left-container">
                    <div id="gmv" className="bg-white rounded border-1 m-9" style={{minWidth: 288,}}>
                        <GmvComponent data={dummyData} />
                    </div>
                    <div id="revenue" className="bg-white rounded border-1 m-9" style={{minWidth: 288}}>
                        <RevenueComponent data={dummyData} />
                    </div>
                    <div id="transaction" className="bg-white rounded border-1 m-9" style={{minWidth: 288}}>
                        <TransactionComponent data={dummyData} />
                    </div>
                </div>
                <div id="right-container" style={{marginLeft: -40}}>
                    <div className="d-flex">
                        <div id="bu-contribution"  className="bg-white rounded border-1 m-9" style={{minWidth: 288}}>
                            <BuContributionComponent data={dummyData} filter={filterBuValue} callback={(param:any) => setFilterBuValue(param)} />
                        </div>
                        <div id="sum-promo">

                        </div>
                    </div>
                    <div id="visual-data" className="bg-white rounded border-1 m-9" style={{minWidth: 288}}>
                        <VisualitationDataComponent data={dummyData} filter={filterBuValue} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DashboardPage;