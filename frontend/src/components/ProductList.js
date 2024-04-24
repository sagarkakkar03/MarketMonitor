import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const [search, setSearch] = useState('')
  const getProducts = async () => {
    let result = await fetch('http://localhost:5000/products');
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id)=>{
    let result = await fetch(`http://localhost:5000/products/${id}`, {
        method:"Delete"
    })
    result = await result.json()

    if (result.deletedCount){
        getProducts()
    }
  }
  const handleSearch = async(key) => {
    let result = await fetch(`http://localhost:5000/search/${key}`)
    result = await result.json()
    console.log(result)
    if (result){
      setProducts(result)
    }
    console.log(products)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold my-6">Product List</h1>
      <div class="flex items-center justify-center">
        <input class="w-1/2 border border-gray-400 py-2 px-4 rounded-md text-gray-700 leading-tight focus:outline-none focus:border-blue-500" type="text" placeholder="Search Product" onChange={(e)=> {setSearch(e.target.value)}}></input>
        <button onClick={()=>{handleSearch(search)}} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-4">
          Search
        </button>
      </div>
      <ul className="w-full grid grid-cols-6 gap-6 border-b-2 border-gray-300 mb-6">
        <li className="py-1 col-span-1">S no.</li>
        <li className="py-1 col-span-1">Name</li>
        <li className="py-1 col-span-1">Company</li>
        <li className="py-1 col-span-1">Price</li>
        <li className="py-1 col-span-1 text-center">Delete</li>
        <li className="py-1 col-span-1 text-center">Update</li>
      </ul>
      { products.length ? products.map((product, index) => (
        <ul
          key={product._id}
          className="w-full grid grid-cols-6 gap-6 border-b-2 border-gray-300 mb-2"
        >
          <li className="py-2 col-span-1">{index + 1}</li>
          <li className="py-2 col-span-1">{product.name}</li>
          <li className="py-2 col-span-1">{product.company}</li>
          <li className="py-2 col-span-1">{product.price}</li>
          <li className="py-2 col-span-1 text-center flex justify-center"><button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={()=> {deleteProduct(product._id)}}>Delete</button></li>
          <li className="py-2 col-span-1 text-center flex justify-center"><button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" ><Link to = {`/update/${product._id}`}>Update</Link></button></li>
        </ul>
      )) : <h1>No result found</h1>}
    </div>
  );
};

export default ProductList;