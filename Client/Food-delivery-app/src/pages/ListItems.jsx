import React from 'react'

function ListItems() {
  return (
    <>
<div>
    <h3>All Foods List</h3>
    <table className='table'>
        <thead>
            <tr>
                <td>Image</td>
                <td>Name</td>
                <td>Category</td>
                <td>Price</td>
                <td>Remove</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <img height={'70px'} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtoy-RFjbq4NLO0HrUb440KR76FQ1uDJl6XLM_ErvtPw&s" alt="" />
                </td>
                <td>Greek Salad</td>
                <td>Salad</td>
                <td>$12</td>
                <td><i className="fa-solid fa-trash"></i></td>
            </tr>
        </tbody>
    </table>
</div>
    </>
  )
}

export default ListItems