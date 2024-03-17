import { useState } from "react";
import { addCategories } from "../services/categorie.service";


export function AdminPage() {
    const [cat, setCat] = useState("");


    async function addCat(e) {
        e.preventDefault();
        const c = { "name": cat };
        await addCategories(c);
        e.target.reset();
        window.location.href = "/home"
    }

    return (
        <>
            <header className="header">
                <form className="quote-form" onSubmit={e => addCat(e)}>
                    <input type="text" onChange={e => setCat(e.target.value)} />
                    <input type="submit" value="Add" />
                </form>
            </header>
        </>
    );
}