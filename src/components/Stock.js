import React, {useState, useEffect} from 'react'
import axios from 'axios'



function Table() {

    //STATE FOR RERENDERING AFTER CHANGES
    const [shouldRerender, setShouldRerender] = useState(false)
    
    // STATE FOR TRACKING THE ID
    const [currentId, setCurrentId] = useState('')
    const [currentTitle, setCurrentTitle] = useState('')
    const [currentCategory, setCurrentCategory] = useState('')

    // STATE FOR SHOWING DATA TABLE
    const[item, setItem] = useState([])
    
    // STATE FOR ADDING NEW ENTRY
    const[addItem, setAddItem] = useState({
        id:'',
        title:'',
        price:'',
        item_description:'',
        category:'',
        image:''
    })


    //GET 'ADD' ITEM DATA AND STORE IT IN VARIABLE
    const handleChange = (input) => (event) => {
        event.preventDefault()
        console.log(addItem)
        setAddItem({...addItem, [input]: event.target.value})
    }

    //ADD ITEM TO DATABASE

    const handleNewItem = (event) => {
        event.preventDefault()

        const newItem = {
            id: addItem.id,
            title: addItem.title,
            price: addItem.price,
            item_description: addItem.item_description,
            category: addItem.category,
            image: addItem.image
        }

        const newItems = [...item, newItem]
        setAddItem (newItems)
    }

        //STATES FOR EDITING ITEM DATA

        const [editItem, setEditItem] = useState (null) // editItem not being called needs to be fixed
        const[editItemData, setEditItemData] = useState ({
            id:'',
            title:'',
            price:'',
            item_description:'',
            category:'',
            image:''
        })

    //GET 'EDIT' ITEM DATA AND STORE IT IN VARIABLE

        const handleEditChange = (input) => (event) => {
            event.preventDefault()
            // console.log(editItemData)
            setEditItemData({...editItemData, [input]: event.target.value})
        }

    // UPDATE EDIT DATA IN DATABASE

        const handleEdit = (event) => {
            event.preventDefault()
            console.log(item[0])
            

            const editChange = {
                id: editItem.id,
                title: editItem.title,
                price: editItem.price,
                item_description: editItem.item_description,
                category: editItem.category,
                image: editItem.image
            }
            const edit = [...item, editChange]
        setEditItem (edit)
        console.log(editItem)
        }


    // POPULATES TABLE

    useEffect(() => {
        const fakestore=`http://localhost:8080/fakestore/all`
        console.log(fakestore)
        axios.get(fakestore)
        .then(response=> {console.log(response); setItem(response.data)})
        .catch(error => {console.log(error)})
        },[shouldRerender])
    
    // CREATES NEW ENTRY & RERENDERS
        const addData = () => {
            const fakeCreate=`http://localhost:8080/fakestore/create`
                console.log(fakeCreate)
                axios.post(fakeCreate, addItem)
                .then(response=> {console.log(response); setAddItem(true); setShouldRerender(!shouldRerender)})
                .catch(error => {console.log(error)})
          }

    // EDIT ITEM & RERENDERS
    const editData = () => {
        const update=`http://localhost:8080/fakestore/update/${currentId}`
            console.log(update)
            axios.put(update, editItemData)
            .then(response=> {console.log(response); setEditItem(true); setShouldRerender(!shouldRerender)})
            .catch(error => {console.log(error)})
      }
      
      // DELETE ITEM FROM DATABASE AND RERENDERS

      const deleteData = () => {
        const remove=`http://localhost:8080/fakestore/delete/${currentId}`
            console.log(remove)
            axios.delete(remove, item)
            .then(response=> {console.log(response); setShouldRerender(!shouldRerender) })
            .catch(error => {console.log(error)})
      }
// const stockIndex = item[currentId -1].title


  return (
    <div>
        {/* BOOTSTRAP MODAL */}
        <div className='d-flex flex-row'>
            <button
            type='button'
            className='me-3 btn btn-primary ml-auto d-block mb-2'
            data-bs-toggle='modal'
            data-bs-target='#addModalForm'>
                Add Data +
            </button>
        </div>

        {/* TABLE LAYOUT */}
        <table className='table table-bordered border-primary table-responsible'>
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Item Description</th>
                    <th scope="col">Category</th>
                    <th scope="col">Image</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
        
            <tbody>
                {item.map((post) =>
                <tr>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.price}</td>
                    <td>{post.item_description}</td>
                    <td>{post.category}</td>
                    <td>{post.image}</td>
                    <td>
                    <button
                        type='button'
                        className='me-3 btn btn-primary ml-auto d-block mb-2'
                        data-bs-toggle='modal'
                        data-bs-target='#editModalForm'
                        onClick={() => {setCurrentId (post.id); setCurrentTitle(post.title); setCurrentCategory(post.category)}}
                        > 
                            Edit
                        </button> {/*STATE FOR TRACKING ID */}
                                </td>
                            </tr>
                            )}
            </tbody>
        </table>
        {/* ADD MODAL DESIGN */}
        <div className='modal fade' id="addModalForm" tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title' id='exampleModalLabel'>Add New Item</h5>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <form onSubmit={handleNewItem}>
                            <div className='mb-3'>
                                <label className='form-label'>Id</label>
                                <input type='text' className='form-control' name='id' placeholder='Id' required onChange={handleChange("id")}/>
                                {/* BUG - Need to figure out how to disable this field without breaking the back end  */}
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Title</label>
                                <input type='text' className='form-control' name='title' placeholder='Title' required onChange={handleChange("title")}  />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Price</label>
                                <input type='text' className='form-control' name='price' placeholder='Price' required onChange={handleChange("price")} />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Item Description</label>
                                <input type='text' className='form-control' name='item_description' placeholder='Item Description' required onChange={handleChange("item_description")} />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Category</label>
                                <input type='text' className='form-control' name='category' placeholder='Category' required onChange={handleChange("category")} />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Image</label>
                                <input type='text' className='form-control' name='image' placeholder='Image' required onChange={handleChange("image")} />
                            </div>
                            <div className='modal-footer d-block'> {/* CALLING THE ADD ROUTE FUNCTION */}
                                <button onClick={addData} type='submit' data-bs-dismiss='modal' className='btn btn-warning float-end'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        {/* EDIT MODAL DESIGN */}
        <div className='modal fade' id="editModalForm" tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title' id='exampleModalLabel'>Edit Item</h5>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <form onSubmit={handleEdit}>
                            <div className='mb-3'>
                                <label className='form-label'>Id</label>
                                <input type='text' className='form-control' name='id' placeholder='Id cannot be edited' required disabled onChange={handleEditChange("id")}/>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Title</label>
                                <input type='text' className='form-control' name='title' placeholder='{stockIndex}' value={currentTitle} onChange={handleEditChange("title")} />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Price</label>
                                <input type='text' className='form-control' name='price' placeholder='Price' onChange={handleEditChange("price")} />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Item Description</label>
                                <input type='text' className='form-control' name='item-description' placeholder='Item Description'  onChange={handleEditChange("item_description")} />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Category</label>
                                <input type='text' className='form-control' name='category' placeholder='Category' value={currentCategory} onChange={handleEditChange("category")} />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Image</label>
                                <input type='text' className='form-control' name='image' placeholder='Image' onChange={handleEditChange("image")} />
                            </div>
                            <div className='modal-footer d-block'> 
                            {/* CALLING UPDATE ROUTE FUNCTION */}
                                <button onClick={editData}type='save' data-bs-dismiss='modal' className='btn btn-success float-end'>Save Item</button>
                            {/* CALLING DELETE ROUTE FUNCTION */}
                            {/* Bug - the screen tries to rerender but requires to be refreshed manually to repopulate table */}  
                                <button onClick={deleteData} type='delete' data-bs-dismiss='modal' className='btn btn-danger float-start'>Delete Item</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Table