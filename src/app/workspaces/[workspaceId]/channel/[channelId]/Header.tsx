import React from 'react'

interface HeaderProps {
    title: string
}
const Header = ({ title }: HeaderProps) => {
    return (
        <div>Header :{title}</div>
    )
}

export default Header