import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [products, setProducts] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  })
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:5000/api/products')
    setProducts(response.data)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editId) {
      await axios.put(`http://localhost:5000/api/products/${editId}`, formData)
    } else {
      await axios.post('http://localhost:5000/api/products', formData)
    }
    fetchProducts()
    setFormData({ name: '', price: '', description: '' })
    setEditId(null)
  }

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
    })
    setEditId(product._id)
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`)
    fetchProducts()
  }

  return (
    <div className='container mx-auto p-4 bg-green-500'>
      <h1 className='text-2xl font-bold'>Product CRUD</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          placeholder='Product Name'
          className='border p-2 w-full'
        />
        <input
          type='number'
          name='price'
          value={formData.price}
          onChange={handleChange}
          placeholder='Product Price'
          className='border p-2 w-full'
        />
        <textarea
          name='description'
          value={formData.description}
          onChange={handleChange}
          placeholder='Product Description'
          className='border p-2 w-full'
        />
        <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
          {editId ? 'Update Product' : 'Create Product'}
        </button>
      </form>

      <div className='mt-8'>
        <h2 className='text-xl font-bold'>Product List</h2>
        <ul>
          {products.map((product) => (
            <li
              key={product._id}
              className='border p-2 my-2 flex justify-between'
            >
              <div>
                <strong>{product.name}</strong> - ${product.price}
                <p>{product.description}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(product)}
                  className='bg-yellow-500 text-white p-1 mx-1'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className='bg-red-500 text-white p-1 mx-1'
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
