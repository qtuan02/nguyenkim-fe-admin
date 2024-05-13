import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import CreateModal from './CreateModal';
import DeleteModal from './DeleteModal';
import UpdateModal from './EditModal';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface IProps {
    categories: ICategory[]
}
const CatagoriesList = (props: IProps) => {
    const { categories } = props

    const [category, setCategory] = useState<ICategory | null>(null)
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);

    return (
        <>
            <div className="mb-3 d-flex justify-between ">
                <h3>Categories</h3>
                <Button variant='primary' onClick={() => setShowModalCreate(true)}>Add new</Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(item => {
                        return (
                            <tr key={item.category_id}>
                                <td>{item.category_id}</td>
                                <td>{item.category_name}</td>
                                <td>
                                    <Button variant='warning' className='mr-3'
                                        onClick={() => {
                                            setCategory(item)
                                            setShowModalUpdate(true)
                                        }}
                                    ><EditOutlined /></Button>
                                    <Button variant='danger'
                                        onClick={() => {
                                            setCategory(item)
                                            setShowModalDelete(true)
                                        }}
                                    ><DeleteOutlined /></Button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
            <CreateModal
                showModalCreate={showModalCreate}
                setShowModalCreate={setShowModalCreate}
            />
            <DeleteModal
                showModalDelete={showModalDelete}
                setShowModalDelete={setShowModalDelete}
                category={category}
                setCategory={setCategory}
            />
            <UpdateModal
                showModalUpdate={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
                category={category}
                setCategory={setCategory}
            />
        </>
    )
}
export default CatagoriesList
