import React from 'react';
import BarChart from '../charts/barChart';

export const UpstreamNetworksVsEmission = () => {
  const labelsArr = ['Network 1', 'Network 2', 'Network 3', 'Network 4', 'Network 5']
  const barDataArr = ['670', '310', '390', '270', '170']
  const totalData = [{
    bu_id: "4f895080-0f76-4fac-8356-6f66b1f299f8",
    bu_name: "PGTR",
    destination_country: "PL",
    emission: 0.42,
    lane: "Ritthem-Łódź",
    source_country: "NL",
    sub_activity: "Road",
  },
  {
    bu_id: "4f895080-0f76-4fac-8356-6f66b1f299f8",
    bu_name: "PGTR",
    destination_country: "PL",
    emission: 0.42,
    lane: "Ritthem-Łódź",
    source_country: "NL",
    sub_activity: "Road",
  }]
  const backgroundColorArr = ["#555f63", "#d05761", "#b1000e", "#00183F", " #00A0CA"]
  return (

    <BarChart
      single={true}
      roundBar={true}
      type={"lanes"}
      showgraditentBar={true}
      labelsArr={labelsArr}
      barDataArr={barDataArr}
      subBu={"upstreamNetworksVsEmission"}
      // loading={loading}
      backgroundColorArr={backgroundColorArr}
      totalData={totalData}
    />
  )
}
