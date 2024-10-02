import { useState } from "react"

export const Input = ({ placeholder, classname, image }:
    { placeholder?: string, classname?: string, image?: string }) => {
    const [search, setSearch] = useState('')
    return (
        <form className={classname} onSubmit={(e) => {
            e.preventDefault();
            setSearch('');
        }}>
            <input type="text" placeholder={placeholder} value={search} onChange={(e) => { setSearch(e.target.value) }} />
            {image && <button type="submit"><img src={image} /></button>}
        </form>
    )
}
