import { useContext } from "react";
import AdContext from "../contexts/AdContext";
import AdCard from "./AdCards";

const Ads = () =>{
    const { ads } = useContext(AdContext);
    return(
        <div className="grid md:grid-cols-2 mx-10 gap-10 pt-5">
      
        {ads ? (
          ads.map((ad, index) => (
            <AdCard
              key={
                ad.id
                  ? `ad-${ad.id}`
                  : `index-${index}`
              }
              ad={ad}
            />
          ))
        ) : (
          <p>No advertisement found</p>
        )}
      </div>
    
    )
}

export default Ads; 