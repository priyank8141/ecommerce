import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { createCategory, getCategories, removeCategory } from '../../../functions/category';

export default function CreateCategory() {
    const { user } = useSelector((state) => ({ ...state }))
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    console.log(user.token.token)
    const handelSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        createCategory({ name }, user.token.token)
            .then((res) => {
                console.log(res)
                setLoading(false)
                setName("")
                toast.success(`${res.data.data.name} is created`)
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
            <h3>Create New Category</h3>
            <>{createcategoryform()}</>
        </div>
    )
}
