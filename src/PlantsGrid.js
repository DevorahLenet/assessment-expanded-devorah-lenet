
export default function PlantsGrid(props) {

    const {family, category, latinName, commonName, selected, search} = props

    let show = ((family.toLowerCase().includes(search) ||
    latinName.toLowerCase().includes(search)) &&
    (category === selected || selected === "All Categories"))

    return (
        <>
            {
                show &&
                <div className="gridRow">
                    
                    <span className="innerRow">{commonName}</span>
                    <span className="innerRow">{family}</span> 
                    <span className="innerRow">{category}</span>
                    <span className="innerRow">{latinName}</span>
                    
                    <span className="innerRow">
                        <a href="http://www.tropicopia.com/house-plant/detail.np/detail-121.html">More Information</a>
                    </span>
                </div>                     
            }
        </>
    )
}