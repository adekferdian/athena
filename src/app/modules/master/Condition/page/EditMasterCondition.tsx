import clsx from 'clsx';
import { useFormik } from 'formik';
import { FC, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { SelectComponentsConfig } from 'react-select';
import Select from 'react-select';
import { PageTitle } from 'src/_metronic/layout/core';
import AlertSuccess from 'src/app/components/AlertSuccess';
import { ReactSelectMetronicTheme } from 'src/app/components/CustomReactSelect';
import { getTitle } from 'src/app/utils/title-utils';
import * as Yup from 'yup';
import MasterConditionScreens from '../Screens';
import { getMasterConditionDetail, updateMasterCondition } from '../redux/MasterConditionCRUD';
import { getMasterConditionTypeList } from '../../ConditionType/redux/MasterConditionTypeCRUD';

const editSchema = Yup.object().shape({
  condition: Yup.string().required('This field is required'),
});

const initialValues = {
  condition_type_id: '',
  condition: '',
  value: '',
  status: '',
};

const EditMasterCondition: FC = () => {
  // Variables
  const { id } = useParams<any>();
  const history = useHistory();

  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const [selectedConditionType, setSelectedConditionType] = useState<{
    label: string;
    value: number;
  }>();
  const [conditionType, setConditionType] = useState<any>([]);

  const [data, setData] = useState<any>();

  const [selectedStatus, setSelectedStatus] = useState<{ label: string; value: string } | undefined>();
  const statList = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'not_active' },
  ];

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: editSchema,
    onSubmit: (values: any) => {
      saveMasterCondition(values);
    },
  });

  const saveMasterCondition = async (values: any) => {
    formik.setSubmitting(true);
    setLoading(true);
    setTimeout(() => {
      updateMasterCondition(
        id,
        values.condition_id,
        values.condition,
        values.value,
        selectedStatus?.value ?? values.status
      )
        .then(() => {
          setLoading(false);
          formik.setSubmitting(false);
          history.goBack();
        })
        .catch(() => {
          setLoading(false);
          formik.setSubmitting(false);
          formik.setStatus('Update Master Condition Failed.');
        });
    }, 1000);
  };

  // start::TITLE_FUNC
  const pageTitle = useMemo(() => MasterConditionScreens.EDIT_MASTER_CONDITION.TITLE, []);

  const breadcrumbs = useMemo(
    () => [
      {
        isActive: false,
        path: MasterConditionScreens.LIST_MASTER_CONDITION.PATH,
        title: MasterConditionScreens.LIST_MASTER_CONDITION.TITLE,
      },
      { isActive: false, path: '', title: '', isSeparator: true },
    ],
    []
  );

  const getConditionType = async () => {
    try {
      const masterConditionType = await getMasterConditionTypeList({});
      setConditionType(masterConditionType.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const detail = await getMasterConditionDetail(id);
        setData(detail.data.data ?? null);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
    getConditionType();
  }, [id]);

  useEffect(() => {
    if (data) {
      setSelectedConditionType({
        label: data.condition_type,
        value: data.condition_type_id,
      });

      data?.status === 'not_active'
        ? setSelectedStatus({ label: 'Inactive', value: data?.status })
        : setSelectedStatus({ label: 'Active', value: data?.status ?? 'active' });
      formik.setFieldValue('condition', data?.condition);
      formik.setFieldValue('value', data?.value);
      formik.setFieldValue('condition_type_id', selectedConditionType?.value);
      formik.setFieldValue('status', selectedStatus?.value);
    }
  }, [data]);

  useEffect(() => {
    document.title = getTitle(pageTitle);
  }, [pageTitle]);
  // end::TITLE_FUNC

  return (
    <div className='card'>
      <PageTitle breadcrumbs={breadcrumbs}>{pageTitle}</PageTitle>
      <div className='card-body'>
        <AlertSuccess message={success} handleClose={() => setSuccess('')} />
        <form className='form w-100' onSubmit={formik.handleSubmit} noValidate>
          <div className='mb-10 col'>
            <div className='col-12 col-md-6 mb-10 mb-md-0 mt-10'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>
                Condition Name<span className='text-danger'>*</span>
              </label>
              <input
                placeholder='Input Condition Name'
                {...formik.getFieldProps('condition')}
                className={clsx('form-control form-control-lg form-control-solid', {
                  'border-danger': formik.touched.condition && formik.errors.condition,
                })}
                type='text'
                name='condition'
                autoComplete='off'
              />
              {formik.touched.condition && formik.errors.condition && (
                <div className='fv-plugins-message-container mt-2 text-danger'>
                  <span role='alert'>{formik.errors.condition}</span>
                </div>
              )}
            </div>
            <div className='col-12 col-md-6 mb-10 mb-md-0 mt-10'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>Value</label>
              <input
                placeholder='Input Value'
                {...formik.getFieldProps('value')}
                className={clsx('form-control form-control-lg form-control-solid', {
                  'border-danger': formik.touched.value && formik.errors.value,
                })}
                type='text'
                name='value'
                autoComplete='off'
              />
              {formik.touched.value && formik.errors.value && (
                <div className='fv-plugins-message-container mt-2 text-danger'>
                  <span role='alert'>{formik.errors.value}</span>
                </div>
              )}
            </div>
            <div className='col-12 col-md-6 mt-10'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>
                Condition Type<span className='text-danger'>*</span>
              </label>
              <Select
                placeholder='Select'
                cacheOptions
                defaultOptions
                components={ReactSelectMetronicTheme as SelectComponentsConfig<any, true>}
                value={selectedConditionType}
                options={conditionType.map((data: any) => ({
                  label: data.condition_type,
                  value: data.condition_type_id,
                }))}
                onChange={(value: any) => {
                  setSelectedConditionType(value);
                  formik.setFieldValue('condition_type_id', value.value);
                }}
              />
              {formik.touched.condition_type_id && formik.errors.condition_type_id && (
                <div className='fv-plugins-message-container mt-3 text-danger'>
                  <span role='alert'>{formik.errors.condition_type_id}</span>
                </div>
              )}
            </div>
            <div className='col-12 col-md-6 mt-10'>
              <label className='flex-fill form-label fs-6 fw-bolder text-gray-800'>
                Status<span className='text-danger'>*</span>
              </label>
              <Select
                placeholder='Select'
                cacheOptions
                defaultOptions
                components={ReactSelectMetronicTheme as SelectComponentsConfig<any, true>}
                value={selectedStatus}
                options={statList}
                onChange={(value: any) => {
                  setSelectedStatus(value);
                  formik.setFieldValue('status', value.value);
                }}
              />
              {formik.touched.status && formik.errors.status && (
                <div className='fv-plugins-message-container mt-3 text-danger'>
                  <span role='alert'>{formik.errors.status}</span>
                </div>
              )}
            </div>
          </div>
          <div className='border-top pt-10 cardfooter-btns'>
            <button
              type='button'
              className={`btn btn-lg btn-light fw-bolder me-4`}
              onClick={() => history.goBack()}
              tabIndex={8}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='btn btn-lg btn-secondary fw-bolder me-4'
              disabled={formik.isSubmitting}
            >
              {!loading && <span className='indicator-label'>Save</span>}
              {loading && (
                <span className='indicator-progress' style={{ display: 'block' }}>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export {EditMasterCondition};
