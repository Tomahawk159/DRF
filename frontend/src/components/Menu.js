import React from "react";

const Menu = ({ elem }) => {
    return (
        <li><a href={elem.link}>{elem.name}</a></li>
    )
}


const MenuList = ({ elems }) => {
    return (
        <ul className="menu">
            {elems.map((elem) => <Menu elem={elem} />)}
        </ul>
    )
}

export default MenuList;
