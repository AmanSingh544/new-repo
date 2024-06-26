import MultiSeriesDonut from "../charts/multiSeriesDonut"
export default function CostFuel({ single, labelsArr, data }) {
    console.log("3333",single,labelsArr,data)
    return (
        <MultiSeriesDonut type={"cost-fuel"} single={single} labelsArr={labelsArr} data={data} />
    )
}