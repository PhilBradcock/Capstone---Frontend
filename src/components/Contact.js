import React from 'react'

function alert(){
  alert("Your message has be recieved")
}

const Contact = () => {
  return (
    <div>
        <div className='container border' style={{marginTop: "50px", width: "50%", backgroundImage:"url",
    backgroundPosition: "center", backgroundSize:"cover"}} />

        <h1 style={{marginTop:"25px", textAlign:"center"}}>Contact Form</h1>

        <form className='row' style={{margin:"25px 85px 75px 100px"}}>

            <label>Name</label>
            <input className='form-control' type="text" name="name" />

            <label>Email</label>
            <input className='form-control' type="email" name="user_email" />

            <label>Message</label>
            <textarea name="message" rows="4" />
            <input className='form-control btn btn-dark' type="submit" value="Send" onClick={alert} style={{marginTop:"15px"}} />
        </form>
    </div>
  )
}

export default Contact