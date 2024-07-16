import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import Cards from './Cards';
import { Row, Col} from 'react-bootstrap';

function FoodDisplay({ category }) {
    const { food_list } = useContext(StoreContext);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8
    const totalPages = Math.ceil(food_list?.length/productsPerPage)
    // Logic for pagination
    const lastProductIndex = currentPage * productsPerPage
  const firstProductIndex = lastProductIndex - productsPerPage
    const currentItems = food_list.slice(firstProductIndex,lastProductIndex);

   
    const navigateToNext = ()=>{
        if(currentPage!=totalPages){
          setCurrentPage(currentPage+1)
        }
      }
      const navigateToPrev = ()=>{
        if(currentPage!=1){
          setCurrentPage(currentPage-1)
        }
      }
    return (
        <>
            <Row>
            {currentItems.map((item, index) => {
    if (category === "All" || category === item.category) {
        return (
            <Col key={index} className='mb-5' sm={12} md={6} lg={4} xl={3}>
                <Cards
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                />
            </Col>
        );
    } else {
        return null; // Or any other JSX element if needed
    }
})}
            </Row>
            <div className='d-flex justify-content-center align-items-center   mb-5'>
  <span onClick={navigateToPrev} style={{cursor:'pointer'}}> <i className='fa-solid fa-backward me-5'></i> </span>
  <span className='fw-bolder'>{currentPage}  of  {totalPages}</span>
  <span onClick={navigateToNext} style={{cursor:'pointer'}}><i className='fa-solid fa-forward ms-5'></i> </span>
</div>
        </>
    );
}

export default FoodDisplay;
