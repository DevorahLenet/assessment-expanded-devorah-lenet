import React from 'react'
import PlantsGrid from './PlantsGrid'
import PlantFullInfo from './PlantFullInfo'

/*
Note: Still missing from the spec: "growth" column, "style" column, and accurante individual links to each distinct plant's page.
This is becuase the only (free) route to get the growth, style and url of a plant was the individual "getById" route, 
which means that the program would have to call the API an additional 300+ times just to get that information. Since the rate limit on
the free plan is 2 requests per second, that's not feasible. (Theoretically one could time a delay between each two requests, 
resulting in a very long page loading time. I was unable to find a reasonable way to implement this.)

*/


export default function App() {

    const [data, setData] = React.useState([])
    const [onePlantId, setOnePlantId] = React.useState("")
    const [formData, setFormData] = React.useState({
        search : "",
        selected : "All Categories"
    })

    //Call GetAllLite endpoint, save data in state
    React.useEffect(function() {
        const options = {
          method: 'GET',
          headers: {
              'X-RapidAPI-Key': '9a0cf124a0msha7ed7c209db0de7p152af7jsn135da5d48410',
              'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com'
          }
      }
      
        fetch("https://house-plants2.p.rapidapi.com/all-lite", options)
            .then(res => res.json())
            .then(data => {
                setOnePlantId(data[0].id)
                setData(data)
            })
    }, [])


    //handle use of search bar and dropdown filter 
    function handleChange(event) {
        if (event.target.name === "selected"){
            console.log(event.target.value)
            setFormData(prevFormData => {
                return {
                    search : "",
                    selected: event.target.value
                }
            })
        }
        else {
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    [event.target.name]: event.target.value
                }
            })
        }
    }
    
    
    //prepare a row in the grid for each plant
    const plantElements = data.map(plantObj => {
        return <PlantsGrid key={plantObj.id} family={plantObj.Family} category={plantObj.Categories}
        latinName={plantObj["Latin name"]} commonName={plantObj["Common name"]}
        search={formData.search} selected={formData.selected}/>})

    //prepare array of category options for the dropdown filter
    const preCategoryArray = data.map(plantObj => plantObj.Categories)
    const checkArray = [...new Set(preCategoryArray)]
    const categoryArray = checkArray.map(
        category => (<option key={category}>{category}</option>)
    )


    return (
        <div className="page">

            <h1>Houseplants</h1>

            <form id="filters">
                <input
                    className="search-bar"
                    type="text"
                    name="search"
                    value={formData.search}
                    placeholder="search by family or Latin name"
                    onChange={handleChange}
                />

                <select name="selected" value={formData.selected} onChange={handleChange}>
                    <option id="all">All Categories</option>
                    {categoryArray}
                </select>
            </form>


            <div className="gridRow">
                <p className="column-title">Common Name:</p>
                <p className="column-title">Family:</p>
                <p className="column-title">Category:</p>
                <p className="column-title">Latin Name:</p>
            </div>
            {plantElements}


            <PlantFullInfo 
                dataId={onePlantId}
            />

        </div>
    );
}