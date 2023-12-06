import React, { useState, useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, 
          Inject, LineSeries, Legend, Tooltip, Zoom } from '@syncfusion/ej2-react-charts';
import Swal from 'sweetalert2';

const LineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/data")
      .then(res => res.json())
      .then(data => {
        console.log('Fetched data:', data);
        setData(data);
        Swal.fire({
          title: 'Warning!',
          text: 'This patient is likely to have heart problems',
          icon: 'warning',
          confirmButtonText: 'Ok'
        });
      });
  }, []);

  return (
    <>
      {data && (
        <ChartComponent legendSettings={{visible: true}} tooltip={{enable: true}} 
            zoomSettings={{enableSelectionZooming: true, enablePan: true, 
            toolbarItems:["ZoomIn", "ZoomOut", "Reset", "Pan"]}}> 
          <Inject services={[LineSeries, Legend, Tooltip, Zoom]}></Inject>
          <SeriesCollectionDirective>
            <SeriesDirective type="Line" dataSource={data[0]}
            xName="x" yName="y" name="Nirav's heart rate" width="2"
            marker={{visible: true, width: 1, height: 1, shape: 'Circle'}}
            ></SeriesDirective>
            <SeriesDirective type="Line" dataSource={data[1]}
            xName="x" yName="y" name="Abnormal heart rate" width="2"
            marker={{visible: true, width: 1, height: 1}}
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      )}
    </>
  );  
}

export default LineChart;