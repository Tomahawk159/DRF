import React from "react";

const FooterBlock = ({ elem }) => {
    return (
        <li><a href={elem.link}>{elem.name}</a></li>
    )
}


const FooterList = ({ elems }) => {
    return (
        <div className="footer">
            {elems.map((elem) => <FooterBlock elem={elem} />)}
        </div>
    )
}

export default FooterList;
