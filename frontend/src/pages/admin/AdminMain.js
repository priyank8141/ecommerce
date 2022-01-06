import React, { useState } from 'react'
import { Row } from "antd";
import AdminNav from '../../components/nav/AdminNav';
import AdminDashboard from './AdminDashboard';
import AdminProduct from './AdminProduct';
import AdminProducts from './AdminProducts';
import AdminCategory from './category/AdminCategory';
import AdminSubCategory from './AdminSubCategory';
import AdminCoupon from './AdminCoupon';
import AdminPasswords from './AdminPasswords';

export default function AdminMain() {

    const [componentNo, setComponentNo] = useState(0);
    const handleClick = (x) => {
        setComponentNo(x);
    };

    var rightSideComponent = [<AdminDashboard />, <AdminProduct />, <AdminProducts />, <AdminCategory />, <AdminSubCategory />, <AdminCoupon />, <AdminPasswords />];
    return (
        <>
            <Row style={{ margin: '5' }}>
                <col-6>
                    <AdminNav handleClick={handleClick} />
                </col-6>
                <col-15>
                    <div>{rightSideComponent[componentNo]}</div>
                </col-15>
            </Row>
        </>
    )
}
