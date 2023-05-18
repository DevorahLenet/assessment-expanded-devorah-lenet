import React from "react";

export default function PlantFullInfo(props) {
        
    const [onePlantData, setOnePlantData] = React.useState({})

    //Call GetById endpoint to get full plant information (for the one plant whose ID was harvested in the App component)
    React.useEffect(function() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '9a0cf124a0msha7ed7c209db0de7p152af7jsn135da5d48410',
                'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com'
            }
        }

        if(props.dataId) {
            const url = `https://house-plants2.p.rapidapi.com/id/${props.dataId}`

            fetch(url, options)
                .then(res => res.json())
                .then(data => {
                    setOnePlantData(data)
                })
        }
    }, [props.dataId])


    const plantInfoElements = []
    
    //Prepare data recieved from API for display
    for (const item in onePlantData){
        if(typeof(onePlantData[item]) === 'object' && onePlantData[item] !== null && !Array.isArray(onePlantData[item])){
            let infoString = ""
            Object.entries(onePlantData[item]).forEach(([key, value]) => {
                infoString = infoString + `${key}: ${value}  `
                })

            plantInfoElements.push(<p key={item}><b>{item}:</b> {infoString}</p>)
        }
        else {
            plantInfoElements.push(<p key={item}><b>{item}</b>: {onePlantData[item] ? onePlantData[item].toString() : ""}</p>)
        }
        
    }

    return (
        <div id="plantInfoContainer">
            <h1>{onePlantData["Common name"]}</h1>

            <img id="plantImg" src={onePlantData.Img} alt={onePlantData["Common name"]}></img>
            <div className="plantInfoList">
                {plantInfoElements}
            </div>

        </div>

    )
}