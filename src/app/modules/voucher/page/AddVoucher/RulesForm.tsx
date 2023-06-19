/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
    // useContext,
  } from 'react';
  
  // import { FormContext } from './index';
  
  export const RulesForm = () => {
  
  // Use for passing form values
  // const contextState = useContext(FormContext);
  
    return (
      <>
        <div className="mt-12">
          <h4>Define rules to be applied to the voucher</h4>
          <p className="text-gray-600">Choose payment method, logistic, product & other to be applied to the voucher</p>
        </div>
  
        <div className="mb-10 row">
          <div className="card mb-4 py-12 px-8">
            <div className="d-flex">
              <div className="col-12">
                <div className="dashed-button mt-4">
                  <p className="m-0">Add New Rule</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  