import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { createCategory, getCategories, removeCategory } from '../../../functions/category';
import { Link } from "react-router-dom"

import { EditOutlined, DeleteOutlined } from "@ant-design/icons"

export default function CreateCategory() {
    const { user } = useSelector((state) => ({ ...state }))
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([])

    useEffect(() => {
        loadcategories()
    }, [])

    const loadcategories = () => {
        getCategories().then((c) => { setCategories(c.data.data) })
    }
    const handelSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        createCategory({ name }, user.token.token)
            .then((res) => {
                console.log(res)
                setLoading(false)
                setName("")
                toast.success(`${res.data.data.name} is created`)
                loadcategories()
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
                if (err.response.status === 400) toast.error(err.response.data)
            })

    }

    const createcategoryform = () =>
        <form className="form-group" style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', marginLeft: '5px' }} onSubmit={handelSubmit}>
            <input style={{ verticalAlign: 'middle', marginLeft: '5px' }} className="form-control" type="text" placeholder="Category Name" onChange={(e) => { setName(e.target.value) }} value={name} required />
            <button style={{ verticalAlign: 'middle', marginLeft: '5px' }} className="btn btn-outline-primary">Add Category</button>
        </form>


    return (
        <div>
            {loading ? (<h3 className="text-danger">Loading</h3>) : (<h3>Create New Category</h3>)}
            <>{createcategoryform()}</>
            {loading ? (<h3 className="text-danger">Loading</h3>) : (<h3>List Category</h3>)}
            {categories.map((c) => (
                <div className="alert alert-secondary" key={c._id}>
                    {c.name}<span className="btn btn-sm" style={{ float: 'right', marginLeft: 2 }} ><DeleteOutlined className="text-danger" /></span>
                    <Link to={'/'}><span className="btn btn-sm" style={{ float: 'right', marginLeft: 2 }}><EditOutlined className="text-warning" /></span></Link>
                </div>
            ))}
        </div>
    )
}
