import React from 'react'
import CreateCategory from './CreateCategory'
import ListCategory from './ListCategory'
export default function AdminCategory() {
    return (
        <div style={{ marginLeft: '5px' }}>
            <CreateCategory />
            <ListCategory />
        </div>
    )
}
