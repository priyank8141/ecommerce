import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { createCategory, getCategories, removeCategory, updateCategory } from '../../../functions/category';

import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { Modal } from 'antd';

export default function CreateCategory() {
    const { user } = useSelector((state) => ({ ...state }))
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [category, setCategory] = useState("");
    const [slug, setSlug] = useState("");

    useEffect(() => {
        loadcategories()
    }, [])

    const loadcategories = async () => {
        await getCategories().then((c) => { setCategories(c.data.data) })
    }
    const handelSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        await createCategory({ name }, user.token.token)
            .then((res) => {
                setLoading(false)
                setName("")
                toast.success(`${res.data.data.name} is created`)
                loadcategories()
            })
            .catch((err) => {
                console.log(err.response.data)
                setLoading(false)
                toast.error(err.response.data)
            })

    }

    const handleRemove = async (slug) => {
        setLoading(true)
        await removeCategory(slug, user.token.token)
            .then((res) => {
                setLoading(false)
                toast.success(`${res.data.message}`)
                loadcategories()
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
                toast.error(err.response.data)
            })

    }

    const showModal = (slug, category) => {
        setCategory(category)
        setSlug(slug)
        setIsModalVisible(true);
    };

    const handleupdate = async (e) => {
        e.preventDefault();
        setLoading(true)
        console.log(user.token.token)
        await updateCategory(slug, user.token.token)
            .then((res) => {
                setLoading(false)
                setName("")
                toast.success(`${res.data.data.name} is updated`)
                loadcategories()
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
                toast.error(err.response.data)
            })

        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

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
            {categories.map((cate) => (
                <div className="alert alert-secondary " key={cate._id}>
                    {cate.name}<span onClick={() => handleRemove(cate.slug)} className="btn btn-sm" style={{ float: 'right', marginLeft: 2 }} ><DeleteOutlined className="text-danger" /></span>
                    <span onClick={() => { showModal(cate.slug, cate.name) }} className="btn btn-sm" style={{ float: 'right', marginLeft: 2 }}><EditOutlined className="text-warning" /></span>
                </div>
            ))}

            <Modal title="Update Category" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                <form className="form-group" style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', marginLeft: '5px' }} onSubmit={handleupdate}>
                    <input style={{ verticalAlign: 'middle', marginLeft: '5px' }} className="form-control" type="text" placeholder="Category Name" onChange={(e) => { setCategory(e.target.value) }} value={category} required />
                    <button style={{ verticalAlign: 'middle', marginLeft: '5px' }} className="btn btn-outline-primary">Update</button>
                </form>
            </Modal>
        </div>
    )
}
