import React from 'react'
import styled from 'styled-components'


const Footer = () => {
  return (
    <FooterContainer>
        <span style={{color: "#000000", position: "center"}}>
            &copy;{new Date().getFullYear()} All Rights Ignored.
        </span>
    </FooterContainer>
  )
}

export default Footer

// FOOTER CONTAINER

const FooterContainer = styled.footer`
background: #f5f5f5;
height: 130px;
position: absolute;
width: 100%;
text-align: center;
`