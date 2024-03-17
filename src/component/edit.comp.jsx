import { useEffect, useState } from "react";
import { getQuoteById, updateQuote } from "../services/quote.services";
import { useNavigate, useParams } from "react-router-dom";
import { getallCategories } from "../services/categorie.service";


export function Update() {
    const [quoteContent, setQuoteContent] = useState("");
    const [source, setSource] = useState("");
    const [selectedCat, setSelectedCat] = useState(0);
    const [categories, setCategories] = useState([]);

    const { id } = useParams();
    useEffect(() => {

        fetchQuotes();
        fetchCategories();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const navigate = useNavigate();

    async function fetchQuotes() {
        const resp = await getQuoteById(id);
        setQuoteContent(resp.data.content);
        setSource(resp.data.source);
        setSelectedCat(resp.data.category);
    }

    async function fetchCategories() {
        const res = await getallCategories();
        setCategories(res.data);
    }

    async function handleForm(e) { // fonction qui vat traiter le formulaire 
        e.preventDefault(); // pour eviter d'actualiser le formulaire a chaque fois
        const q = { "content": quoteContent, "source": source, "category": categories[selectedCat] };
        // await addProduct(q); // cette fonction est creer dans le dossier service 
        // console.log(q)
        await updateQuote(q, id);
        navigate("/home"); // 
    }

    return (
        <>
            <form onSubmit={e => handleForm(e)} className={"quote-form"}  >
                <input value={quoteContent} onChange={e => setQuoteContent(e.target.value)} type="text" />
                <input value={source} onChange={e => setSource(e.target.value)} type="text" />
                <select onChange={e => setSelectedCat(e.target.value)}>
                    {categories.map((cat, index) => {
                        if (cat._id === selectedCat) {
                            return <option key={index} defaultValue >{cat.name}</option>
                        } else return <option key={index} >{cat.name}</option>
                    }
                    )}

                    {/* {categories.map((c, index) => <option key={index} value={index}>{c.name}</option>)} */}

                </select>
                <input type="submit" value="Post" />
            </form>

        </>
    );
}