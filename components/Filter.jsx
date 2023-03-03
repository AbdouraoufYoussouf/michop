import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsFilterSquare } from 'react-icons/bs'
import { RiMoneyPoundCircleLine } from 'react-icons/ri'
import { Fade } from "react-reveal";

const prixData = [
  { min: 0, max: 10, label: "Moins de 10€" },
  { min: 10, max: 50, label: "10€ à 50€" },
  { min: 50, max: 100, label: "50€ à 100€" },
  { min: 100, max: 500, label: "100€ à 500€" },
  { min: 500, max: 1000, label: "500€ à 1000€" },
  { min: 1000, max: 2000, label: "1000€ à 2000€" },
  { min: 2000, max: 100000000, label: "Plus 2000€" }
];
const Filter = ({ data, setData,category}) => {
  const [showfiltrer, setShowfiltrer] = useState(true)
  const [isShowfiltrer, setIsShowfiltrer] = useState(false)

  var [priceFiltered, setPriceFiltered] = useState([]);
  const [isPrice, setIsPrice] = useState(false)
  // setDataMarque
  var [marqFiltered, setMarqFiltered] = useState([]);
  const [isMarque, setIsMarque] = useState(false);

  const marques = Array.from(new Set(
    data.filter(product => product.category === category)
      .map(product => product.marque)
  ));

  // Fonction qui gere les marques cochés ou decochés
  var handleMarque = (e) => {
    let isChecked = e.target.checked;
    let marque = e.target.value;
    let id = e.target.id;
    setIsMarque(!isMarque);
    let temp = { id: id, marque: marque };
    if (isChecked === true) {
      marqFiltered.push(temp);
    }
    if (isChecked === false) {
      var temps = marqFiltered?.filter((m) => m.id !== id);
      setMarqFiltered(temps);
    }
  };

  // fonction qui gere les prix cochés
  const handlePriceChange = (e) => {
    let isChecked = e.target.checked;
    let price = e.target.value;
    let id = e.target.id;
    setIsPrice(!isPrice);
    let temp = prixData[id];
    if (isChecked === true) {
      priceFiltered.push(temp);
    }
    if (isChecked === false) {
      var temps = priceFiltered?.filter((p) => p.label !== price);
      setPriceFiltered(temps);
    }
  };
  // Fonction qui va filitrer automatiquement dans useEffect+
  // la data selon les marques selectionnés et  prix selection
  function filterProducts(products, marqueFilters, priceFilters) {
    let filtered = [...products];
  
    if (marqueFilters.length > 0) {
      filtered = filtered.filter(product => {
        for (const filter of marqueFilters) {
          if (product.marque.toLowerCase().includes(filter.marque.toLowerCase())) {
            return true;
          }
        }
        return false;
      });
    }
  
    if (priceFilters.length > 0) {
      filtered = filtered.filter(product => {
        for (const filter of priceFilters) {
          if (product.price >= filter.min && product.price < filter.max) {
            return true;
          }
        }
        return false;
      });
    }
  
    return filtered;
  }

  useEffect(() => {
    const filtered = filterProducts(data, marqFiltered, priceFiltered);
    setData(filtered);
  }, [isMarque, isPrice]);
  
  // hide filter
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 768) {
        setShowfiltrer(true);
        setIsShowfiltrer(true)
      } else {
        setShowfiltrer(false);
        setIsShowfiltrer(false)
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
<Fade left duration={500}>
    <div className="w-[230px] md:min-h-90 bg-gray-100 rounded-lg text-gray-600 p-1 flex flex-col sticky top-0  max-md:w-full "  >
      <div className="flex  cursor-pointer justify-between hover:bg-gray-200 hover:rounded-lg p-1 " onClick={() => !isShowfiltrer && setShowfiltrer(!showfiltrer)}>

        <BsFilterSquare className="hover:text-red-600" size={30} />
        <RiMoneyPoundCircleLine className="hover:text-red-600" size={34} />
      </div>
      {
        showfiltrer &&
        <div className="flex flex-col max-md:flex-row p-1 gap-3 bg-gray-100 rounded-lg">

          <div className=" flex flex-col  basis-1">
            <h3 className="text-left font-bold text-lg">Marque</h3>
            <div className="flex flex-col max-md:flex-row max-md:flex-wrap max-md:justify-cennter max-md:items-start max-xs:gap-1 max-md:max-h-32  overflow-y-auto">
              {marques.map(
                (marq, index) =>
                  marq !== "" && (
                    <div key={index} className="flex items-center gap-2 max-md:gap-0.5 max-md:min-w-[4.5rem] mr-4">
                      <input
                        onChange={(e) => handleMarque(e)}
                        type="checkbox"
                        id={index}
                        name={marq}
                        value={marq}
                      />
                      <h5 className="capitalize text-xm font-bold font-tury text-gray-500">{marq}</h5>
                    </div>
                  )
              )}
            </div>
          </div>
          <div className="flex flex-col flex-1">

            <h3 className="text-left font-bold text-lg">Prix</h3>
            <div className=" grid sm:grid-cols-2 xx:grid-cols-3  md:grid-cols-1 max-xs:gap-1 max-md:max-h-32 overflow-y-auto">
              {prixData.map((range, index) => (
                <div key={range.label} className="flex gap-2 items-center  ">
                  <input
                    type="checkbox"
                    id={index}
                    value={range.label}
                    onChange={handlePriceChange}
                  />
                  <h5 className="italic text-xl font-mono font-bold text-gray-500">{range.label}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      }


    </div>
</Fade>
  );
};

export default Filter;


const Prix = styled.div`
  overflow: scroll;
  overflow: auto;
`;