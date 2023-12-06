import React from 'react';
import { AiOutlineStock } from 'react-icons/ai';
import { IoMdContacts } from 'react-icons/io';
import avatar from './avatar.jpg';
import avatar2 from './avatar2.jpg';
import avatar3 from './avatar3.png';
import avatar4 from './avatar4.jpg';

export const gridOrderImage = (props) => (
  <div>
    <img
      className="rounded-xl h-20 md:ml-3"
      src={props.ProductImage}
      alt="order-item"
    />
  </div>
);
const customerGridImage = (props) => (
  <div className="image flex gap-4">
    <img
      className="rounded-full w-10 h-10"
      src={props.CustomerImage}
      alt="employee"
    />
    <div>
      <p>{props.CustomerName}</p>
      <p>{props.CustomerEmail}</p>
    </div>
  </div>
);

const customerGridStatus = (props) => (
  <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
    <p style={{ background: props.StatusBg }} className="rounded-full h-3 w-3" />
    <p>{props.Condition}</p>
  </div>
);
export const areaPrimaryXAxis = {
  valueType: 'DateTime',
  labelFormat: 'y',
  majorGridLines: { width: 0 },
  intervalType: 'Years',
  edgeLabelPlacement: 'Shift',
  labelStyle: { color: 'gray' },
};

export const areaPrimaryYAxis = {
  labelFormat: '{value}%',
  lineStyle: { width: 0 },
  maximum: 4,
  interval: 1,
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelStyle: { color: 'gray' },

};

export const LinePrimaryXAxis = {
  valueType: '{value}',
  intervalType: 'Numeric',
  interval: 7,
  edgeLabelPlacement: 'Shift',
  majorGridLines: { width: 0 },
  background: 'white',
};

export const LinePrimaryYAxis = {
  labelFormat: '{value}',
  rangePadding: 'None',
  minimum: 0,
  maximum: 1,
  interval: 0.1,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
};

export const customersGrid = [
  { type: 'checkbox', width: '50' },
  { headerText: 'Name',
    width: '150',
    template: customerGridImage,
    textAlign: 'Center' },
  { field: 'Age',
    headerText: 'Age',
    width: '80',
    textAlign: 'Center' },
    { field: 'Gender',
    headerText: 'Gender',
    width: '100',
    textAlign: 'Center' },
  { field: 'Condition',
    headerText: 'Condition',
    width: '100',
    format: 'yMd',
    textAlign: 'Center',
    template: customerGridStatus },
  {
    field: 'Diagnostic',
    headerText: 'Diagnostic',
    width: '130',
    format: 'C2',
    textAlign: 'Center' },
  { field: 'Service',
    headerText: 'Service',
    width: '130',
    format: 'yMd',
    textAlign: 'Center' },
  { field: 'CustomerID',
    headerText: 'Customer ID',
    width: '120',
    textAlign: 'Center',
    isPrimaryKey: true,
  },

];

export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'patients',
        icon: <IoMdContacts />,
      },
      {
        name: 'line',
        icon: <AiOutlineStock />,
      }
    ],
  },
];

export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];

export const customersData = [
  {
    CustomerID: 1001,
    CustomerName: 'Nirav Joshi',
    CustomerEmail: 'nirav@gmail.com',
    CustomerImage:
      avatar2,
    Age: '21',
    Gender: 'Female',
    Condition: 'Good',
    StatusBg: '#8BE78B',
    Diagnostic: 'Cancer',
    Service: 'Surgery',
  },
  {
    CustomerID: 1002,
    CustomerName: 'Sunil Joshi',
    CustomerEmail: 'sunil@gmail.com',
    CustomerImage:
      avatar3,
    Age: '22',
    Gender: 'Male',
    Condition: 'Good',
    StatusBg: '#8BE78B',
    Diagnostic: 'African sleeping sickness',
    Service: 'Surgery',
  },
  {
    CustomerID: 1003,
    CustomerName: 'Andrew McDownland',
    CustomerEmail: 'andrew@gmail.com',
    CustomerImage:
      avatar4,
    Age: '23',
    Gender: 'Male',
    Condition: 'Caution',
    StatusBg: '#FEC90F',
    Diagnostic: 'Scurvy',
    Service: 'Give medicine',
  },
  {
    CustomerID: 1004,
    CustomerName: 'Christopher Jamil',
    CustomerEmail: 'jamil@gmail.com',
    CustomerImage:
      avatar,
    Age: '24',
    Gender: 'Male',
    Condition: 'Good',
    StatusBg: '#8BE78B',
    Diagnostic: 'Gnathostomiasis',
    Service: 'Take care of him',
  },
  {
    CustomerID: 1005,
    CustomerName: 'Michael',
    CustomerEmail: 'michael@gmail.com',
    CustomerImage:
      avatar2,
    Age: '25',
    Gender: 'Female',
    Condition: 'Bad',
    StatusBg: 'red',
    Diagnostic: 'Human granulocytic anaplasmosis',
    Service: 'Take care of her',
  },
  {
    CustomerID: 1006,
    CustomerName: 'Nirav Joshi',
    CustomerEmail: 'nirav@gmail.com',
    CustomerImage:
      avatar2,
    Age: '25',
    Gender: 'Female',
    Condition: 'Good',
    StatusBg: '#8BE78B',
    Diagnostic: 'Crohns disease',
    Service: 'Surgery',
  },
  {
    CustomerID: 1007,
    CustomerName: 'Sunil Joshi',
    CustomerEmail: 'sunil@gmail.com',
    CustomerImage:
      avatar3,
    Age: '26',
    Gender: 'Male',
    Condition: 'Caution',
    StatusBg: '#FEC90F',
    Diagnostic: 'Cryptococcosis',
    Service: 'Surgery',
  },
  {
    CustomerID: 1008,
    CustomerName: 'Andrew McDownland',
    CustomerEmail: 'andrew@gmail.com',
    CustomerImage:
      avatar4,
    Age: '27',
    Gender: 'Male',
    Condition: 'Caution',
    StatusBg: '#FEC90F',
    Diagnostic: 'Susacs syndrome',
    Service: 'Surgery',
  },
  {
    CustomerID: 1009,
    CustomerName: 'Christopher Jamil',
    CustomerEmail: 'jamil@gmail.com',
    CustomerImage:
      avatar,
    Age: '28',
    Gender: 'Male',
    Condition: 'Good',
    StatusBg: '#8BE78B',
    Diagnostic: 'Vasovagal syncope',
    Service: 'Surgery',
  },
  {
    CustomerID: 1010,
    CustomerName: 'Michael',
    CustomerEmail: 'michael@gmail.com',
    CustomerImage:
      avatar2,
    Age: '29',
    Gender: 'Female',
    Condition: 'Good',
    StatusBg: '#8BE78B',
    Diagnostic: 'Type 1 diabetes',
    Service: 'Give medicine',
  },
  {
    CustomerID: 1011,
    CustomerName: 'Nirav Joshi',
    CustomerEmail: 'nirav@gmail.com',
    CustomerImage:
      avatar2,
    Age: '30',
    Gender: 'Female',
    Condition: 'Good',
    StatusBg: '#8BE78B',
    Diagnostic: 'Cancer',
    Service: 'Give medicine',
  },
  {
    CustomerID: 1012,
    CustomerName: 'Sunil Joshi',
    CustomerEmail: 'sunil@gmail.com',
    CustomerImage:
      avatar3,
    Age: '32',
    Gender: 'Male',
    Condition: 'Good',
    StatusBg: '#8BE78B',
    Diagnostic: 'Myopia',
    Service: 'Give drops and lenses',
  },
  {
    CustomerID: 1013,
    CustomerName: 'Andrew McDownland',
    CustomerEmail: 'andrew@gmail.com',
    CustomerImage:
      avatar4,
    Age: '33',
    Gender: 'Male',
    Condition: 'Caution',
    StatusBg: '#FEC90F',
    Diagnostic: 'Graves disease',
    Service: 'Hospitalize the patient',
  },
  {
    CustomerID: 1014,
    CustomerName: 'Christopher Jamil',
    CustomerEmail: 'jamil@gmail.com',
    CustomerImage:
      avatar,
    Age: '33',
    Gender: 'Male',
    Condition: 'Good',
    StatusBg: '#8BE78B',
    Diagnostic: 'Listeriosis',
    Service: 'Hospitalize the patient',
  },
  {
    CustomerID: 1015,

    CustomerName: 'Michael',
    CustomerEmail: 'michael@gmail.com',
    CustomerImage:
      avatar2,
    Age: '34',
    Gender: 'Female',
    Condition: 'Bad',
    StatusBg: 'red',
    Diagnostic: 'Brucellosis',
    Service: 'Hospitalize the patient',
  },
];

export const lineChartData = [
  [
    { x: new Date(2005, 0, 1), y: 21 },
    { x: new Date(2006, 0, 1), y: 24 },
    { x: new Date(2007, 0, 1), y: 36 },
    { x: new Date(2008, 0, 1), y: 38 },
    { x: new Date(2009, 0, 1), y: 54 },
    { x: new Date(2010, 0, 1), y: 57 },
    { x: new Date(2011, 0, 1), y: 70 },
  ],
  [
    { x: new Date(2005, 0, 1), y: 28 },
    { x: new Date(2006, 0, 1), y: 44 },
    { x: new Date(2007, 0, 1), y: 48 },
    { x: new Date(2008, 0, 1), y: 50 },
    { x: new Date(2009, 0, 1), y: 66 },
    { x: new Date(2010, 0, 1), y: 78 },
    { x: new Date(2011, 0, 1), y: 84 },
  ],

  [
    { x: new Date(2005, 0, 1), y: 10 },
    { x: new Date(2006, 0, 1), y: 20 },
    { x: new Date(2007, 0, 1), y: 30 },
    { x: new Date(2008, 0, 1), y: 39 },
    { x: new Date(2009, 0, 1), y: 50 },
    { x: new Date(2010, 0, 1), y: 70 },
    { x: new Date(2011, 0, 1), y: 100 },
  ],
];

export const lineCustomSeries = [
  { dataSource: lineChartData[0],
    xName: 'x',
    yName: 'y',
    name: "Patient's heart rate",
    width: '2',
    marker: { visible: true, width: 10, height: 10 },
    type: 'Line' },

  { dataSource: lineChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'Arrhythmia',
    width: '2',
    marker: { visible: true, width: 10, height: 10 },
    type: 'Line' },
];
