import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Build() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [Ingredients, setIngredients] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState([]);

  const handleOptionChange = (e,arr) => {
    if (e.target.checked == true){
      setSelectedOption(arr);
    }
    
  };

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/pizzas`)
        .then(res=>{
            setData(res.data);
        })
        .catch(err=>console.log(err));
    axios.get(`${process.env.REACT_APP_API_URL}/ingredients`)
    .then(res=>{
        setIngredients(res.data);
    })
    .catch(err=>console.log(err));
  },[])

  function handleIngredientChange(ingredient, checked) {
    const updatedIngredients = checked
      ? [...selectedIngredients, ingredient]
      : selectedIngredients.filter(item => item.id !== ingredient.id);

    setSelectedIngredients(updatedIngredients);

    const newTotal = updatedIngredients.reduce((acc, item) => acc + item.price, 0);
    setTotalCost(newTotal+selectedOption[2]);
  };

  function handleSubmit(e){
    e.preventDefault();
    let arr = [];
    for(let i of selectedIngredients){
        arr.push(i.tname);
    }
    var data = {
        name : selectedOption[0],
        image : selectedOption[1],
        ingredients : arr,
        price : totalCost,
    }
    const token = localStorage.getItem('token');
    axios.post(`${process.env.REACT_APP_API_URL}/build`,
        data,
        { headers:{Authorization:token} }
    )
    .then(res=>{
        navigate('/cart');
    })
    .catch(err=>console.log(err));
  }

  return (
    <div className="container mt-5">
      <p style={{textAlign:"center"}}>Pizzeria now gives you options to build your own pizza. 
        Customize your pizza by choosing ingredients from the list given below</p>


      <div className='row'>
        <div className='col-sm-4'></div>
        <div className='col-sm-4'>

        <h3 style={{color:"blue", textAlign:"center"}}><b>Select Base Pizza</b></h3>
        <div style={{ height: '200px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
      {
        data.map((value,key)=>(
          <div key={key}>
        <input
          type="radio"
          id={key}
          name="options"
          value={[value.name, value.image, value.price]}
          onChange={(e)=>handleOptionChange(e,[value.name, value.image, value.price])}
        /><img alt="no-data" src={value.image} height="40px" width="40px" />
        <label htmlFor="option1">{value.name}  &nbsp;
        <button style={{width:'20px', height:'20px', backgroundColor: value.type==="veg" ? "green":"red", borderColor:value.type==="veg" ? "green":"red"}}></button>
        &nbsp;&nbsp;&nbsp;&nbsp;  ₹ {value.price}</label>
      </div>
        ))
      }
      

    </div>

        </div>
      </div>

      <h3 style={{color:"orange", textAlign:"center"}}><br/><br/>Select Ingredient to add in pizza</h3>

      <div className='row'>
        <div className='col-sm-2'></div>
        <div className='col-sm-8'>


      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
          </thead>
          <tbody>

        {
            Ingredients.map((ingredient,index) => (

              <tr key={ingredient.id}>
                <td>
                  <img src={ingredient.image} alt="" width="100" height="70" />
                </td>
                <td><b>{ingredient.tname}</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    ₹{ingredient.price}.00</td>
                <td style={{color:"orange"}}>
                  <input type="checkbox" onChange={e => handleIngredientChange(ingredient, e.target.checked)} />
                  &nbsp;&nbsp;&nbsp; Add
                </td>
              </tr>

            ))
        }

          </tbody>
        </table>
      </div>


      </div>
      </div>

      <h3 style={{color:"SlateBlue", textAlign:"center"}}><b>Total Cost: ₹{totalCost}</b></h3>
      <p><br/><br/></p>
      <div className="text-center">

        <form>
        <button className="btn" style={{color:"orange", backgroundColor:"black",borderColor:"orange", height:"50px", width:"200px"}} onClick={(e)=>handleSubmit(e)}><b>Click to Build Ur Pizza</b></button>
        </form>
        
      </div>
      <p><br/><br/></p><p><br/><br/></p>
    </div>
  );
};

export default Build;
