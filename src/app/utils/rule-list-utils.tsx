import InlineSVG from 'react-inlinesvg/esm';

const ruleList = [{
  label: 'Category',
  value: 'category',
  smallLabel: '',
}, {
  label: 'Distributor',
  value: 'distributor',
  smallLabel: '',
}, {
  label: 'Order Type',
  value: 'order-type',
  smallLabel: '',
}, {
  label: 'Payment Method',
  value: 'payment-method',
  smallLabel: '',
}, {
  label: 'Logistic',
  value: 'logistic',
  smallLabel: '',
}, {
  label: 'Product',
  value: 'product',
  smallLabel: '',
}, {
  label: 'Store Type',
  value: 'store-type',
  smallLabel: '',
}, {
  label: 'Store',
  value: 'store',
  smallLabel: '',
}, {
  label: 'Time can be claimed',
  value: 'time-can-be-claimed',
  smallLabel: 'Tentukan waktu campaign bisa diklaim setiap harinya',
}, {
  label: 'Unit',
  value: 'unit',
  smallLabel: '',
}];

const timeList = [{
  label: 'Custom Time (Pilih waktu sesuka Anda)',
  value: 'custom-time',
}, {
  label: 'Regular Flash Sale (05:00 - 17:00)',
  value: 'regular',
}, {
  label: 'Midnight Sale (00:00 - 02:00)',
  value: 'midnight',
}, {
  label: 'Rush Hour (07:00 - 09:00)',
  value: 'rush',
}];

const paymentList = [{
  id: 0,
  label: 'Bayar cash di tempat',
  img: (<img src="/media/icons/payment/cod.svg" alt="" height="16" className="me-2" />),
  value: 'cod',
  category: 'courier',
}, {
  id: 1,
  label: 'BCA Virtual Account',
  img: (<InlineSVG src="/media/icons/payment/bca.svg" height={16} className="me-2" />),
  value: 'bca',
  category: 'virtual-account',
}, {
  id: 2,
  label: 'BRI Virtual Account',
  img: (<img src="/media/icons/payment/bri.png" alt="" height="16" className="me-2" />),
  value: 'bri',
  category: 'virtual-account',
}, {
  id: 3,
  label: 'BNI Virtual Account',
  img: (<img src="/media/icons/payment/bni.png" alt="" height={16} className="me-2" />),
  value: 'bni',
  category: 'virtual-account',
}, {
  id: 4,
  label: 'Mandiri Virtual Account',
  img: (<img src="/media/icons/payment/mandiri.png" alt="" height={16} className="me-2" />),
  value: 'mandiri',
  category: 'virtual-account',
}, {
  id: 5,
  label: 'QRIS',
  img: (<img src="/media/icons/payment/qris.png" alt="" height="16" className="me-2" />),
  value: 'qris',
  category: 'instant',
}, {
  id: 6,
  label: 'OVO',
  img: (<InlineSVG src="/media/icons/payment/ovo.svg" height={16} className="me-2" />),
  value: 'ovo',
  category: 'instant',
}, {
  id: 7,
  label: 'DANA',
  img: (<img src="/media/icons/payment/dana.png" alt="" height="16" className="me-2" />),
  value: 'dana',
  category: 'instant',
}, {
  id: 8,
  label: 'Link Aja',
  img: (<InlineSVG src="/media/icons/payment/linkaja.svg" height={16} className="me-2" />),
  value: 'linkaja',
  category: 'instant',
}, {
  id: 9,
  label: 'Shopee Pay',
  img: (<img src="/media/icons/payment/shopeepay.png" alt="" height="16" className="me-2" />),
  value: 'shopeepay',
  category: 'instant',
}];

const logisticList = [{
  id: 0,
  label: 'LOG by eDOT',
  img: (<img src="/media/icons/logistic/elog.png" alt="" height="16" className="me-2" />),
  value: 'elog',
  category: 'log-instant',
}, {
  id: 1,
  label: 'Gojek',
  img: (<img src="/media/icons/logistic/gojek.png" alt="" height="16" className="me-2" />),
  value: 'gojek',
  category: 'log-instant',
}, {
  id: 2,
  label: 'AnterAja',
  img: (<img src="/media/icons/logistic/anteraja.png" alt="" height="16" className="me-2" />),
  value: 'anteraja',
  category: 'log-next-day',
}, {
  id: 3,
  label: 'JNE',
  img: (<img src="/media/icons/logistic/jne.png" alt="" height="16" className="me-2" />),
  value: 'jne',
  category: 'log-next-day',
}, {
  id: 4,
  label: 'Anteraja',
  img: (<img src="/media/icons/logistic/anteraja.png" alt="" height="16" className="me-2" />),
  value: 'anteraja-kargo',
  category: 'log-kargo',
}, {
  id: 5,
  label: 'JNE',
  img: (<img src="/media/icons/logistic/jne.png" alt="" height="16" className="me-2" />),
  value: 'jne-log-kargo',
  category: 'log-kargo',
}];

const orderTypeList = [{
  id: 0,
  label: 'Delivery',
  value: 'delivery',
}, {
  id: 1,
  label: 'Pick Up',
  value: 'pickup',
}];

export {
  ruleList,
  timeList,
  paymentList,
  logisticList,
  orderTypeList,
};
