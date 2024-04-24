import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
 
const UpdateProduct = () =>{ 
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [name, setName] = useState('')
    const [company, setCompany] = useState('')
    const params = useParams()
    const navigate = useNavigate()
    const updateProduct = async()=>{
        console.log(name,price, category, company)
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'Put', 
            body: JSON.stringify({name, price, category, company}),
            headers: {
                'Content-type': "application/json"
            }})
        result = await result.text()
        JSON.parse(result);
        navigate('/')

    }
    useEffect(() => {
        getProductDetails()
    }, [])

    const getProductDetails = async ()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`)
        result = await result.json()
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }
    return(
        <div className=" flex justify-center align-items-center">
        <div className='text-center'>
            <h1 className='m-auto text-2xl'> Update Product </h1>
                <input className='input-box' type = 'text' placeholder="Product name" value = {name} onChange={(e)=>setName(e.target.value)}></input>
                <input className='input-box' type = 'text' placeholder="Price" value = {price} onChange={(e)=>setPrice(e.target.value)}></input>
                <input className='input-box' type = 'text' placeholder="Category" value = {category} onChange={(e)=>setCategory(e.target.value)}></input>
                <input className='input-box' type = 'text' placeholder="Company" value = {company} onChange={(e)=>setCompany(e.target.value)}></input>
                <button className=' rounded-lg p-3 w-15 bg-blue-200 border-b-21' type='button' onClick={updateProduct}>Update Product</button>
          
            </div>
        </div>
    )
}

export default UpdateProduct