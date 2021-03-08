import React, { useState, useEffect } from "react"
import CityItem from "./CityItem"
import Pagination from "./Pagination"
import Toggle from "./Toggle"
import "./Body.css"

function Body(){

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false)
    const [curPage, setCurPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);
    const [minPostsPerPage] = useState(1);
    const [maxPostsPerPage] = useState(50);
    const [toggleOnlyImages, setToggleOnlyImages] = useState(true);
    const [error, setError] = useState();
    
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setLoading(true)

        const url = "http://localhost:9000/HelsinkiAPI";
        const response = await fetch(url).catch((err) =>{
            if (!err.response) {
                // network error
                setError('Network Error');
            } else {
                setError(err.response.data.message);
            }
            setLoading(false);
       });

       console.log(error);

        if(error===undefined && response.ok){
            let it = await response.json();
            setItems(it);

            setLoading(false);
        }
    }

    const paginate = curPage => setCurPage(curPage);
    const toggle = () => setToggleOnlyImages(value => !value);
    const postsPerPageValidation = e =>{
        if(e.target.value > maxPostsPerPage) setPostsPerPage(maxPostsPerPage);
        else if(e.target.value < minPostsPerPage) setPostsPerPage(minPostsPerPage);
        else setPostsPerPage(e.target.value);
    }

    if(loading){
        return <p className="centered">Loading...</p>
    }

    if(error!=undefined){
        return <p className="centered">Sorry, there was an error: {error}</p>
    }

    if (!items.length) {
        return null;
    }

    //Renders many of the same CityItem component and gives them unique props
    function renderMany() {
        
        let startingItem =(curPage-1)*postsPerPage;
        //Change the starting point if user has only elected to see image results, so the pages won't duplicate posts
        if(toggleOnlyImages){
            for(var k=0; k<startingItem; k++){
                if(!items[k].image) startingItem++;
            }
        }

        const comps = [];
    
        for(var i=startingItem; comps.length<postsPerPage;i++) {
            //If the user has decided to only see results with images, don't push components that would have no images
            if((toggleOnlyImages && items[i].image) || !toggleOnlyImages){
                comps.push(<CityItem key={i} 
                src ={items[i].image} 
                name ={items[i].name}
                address ={items[i].address}
                open ={items[i].open} />);
            }
        }
        return comps;

    } 

    return(
        <div>
            <div>
                <div className ="centered">
                    <Toggle 
                    handleToggle={toggle}
                    checked={toggleOnlyImages}
                    />
                    <br />
                    <label>Results per page:
                        <input
                            type="number"
                            value={postsPerPage}
                            onChange={e => postsPerPageValidation(e)}
                        />
                    </label>
                </div>
                {renderMany()}
                <Pagination 
                paginate={paginate}
                curPage={curPage}  
                />
            </div>                
        </div>
    )
}

export default Body