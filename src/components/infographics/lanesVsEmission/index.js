import BarChart from "../charts/barChart";
export default function LanesEmission(props){
  const {
    barDataArr,
    maxEmissionBySupplier,
    loading,
    type,
    labelsArr,
    single,
    roundBar,
    totalData,
    chartViewPage,
    graphPosition,
  }=props
    //console.log('labelsArr-',  labelsArr,' barDataArr- ',barDataArr,' totalData- ',  totalData, "lanesvsEmissiondata");
  return (
    <BarChart
      single={single}
      graphPosition={graphPosition}
      // roundBar={true}
      // type={type}
      // labelsArr={labelsArr}
      // barDataArr={barDataArr}
      // maxEmissionBySupplier={maxEmissionBySupplier}
      // loading={loading}
      chartViewPage={chartViewPage}
      roundBar={roundBar}
      type={type}
      labelsArr={labelsArr}
      barDataArr={barDataArr}
      loading={loading}
      totalData={totalData}
    />
  );
}
