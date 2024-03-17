import { useEffect, useRef, useState } from "react";
import { addQuote, deleteQuote, getAllQuotes } from "../services/quote.services";
import { deletecategories, getallCategories } from "../services/categorie.service";
import { Link } from "react-router-dom"


export function Home() {

    const token = localStorage.getItem("jwtToken");

    const [quote, setQuote] = useState([]);
    const [quoteContent, setQuoteContent] = useState("");
    const [source, setSource] = useState("");
    const [selectedCat, setSelectedCat] = useState(0);
    const [categories, setCategories] = useState([]);
    const [votes, setVotes] = useState({});


    const [formVisible, setFormVisible] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        fetchCategories();
        fetchQuotes();
    }, []);

    useEffect(() => {
        const sortedQuotes = quote
            .slice()
            .sort((a, b) => (votes[b._id]?.like || 0) - (votes[a._id]?.like || 0));
        setQuote(sortedQuotes);
    }, [votes]);


    function showHideForm() {
        setFormVisible(prevState => !prevState);
    }

    async function fetchCategories() {
        const res = await getallCategories();
        setCategories(res.data);
    }

    async function fetchQuotes() {
        const resp = await getAllQuotes();
        setQuote(resp.data);
    }

    async function handleForm(e) {
        e.preventDefault();
        const q = { "content": quoteContent, "source": source, "category": categories[selectedCat] };
        await addQuote(q);
        fetchQuotes();
        e.target.reset();
        setQuoteContent("");
        setSource("");


    }

    function signout() {
        localStorage.removeItem("jwtToken");
        fetchQuotes();
    }

    function GoHome() {
        window.location.href = "/"
    }

    async function deleteC(idC) {
        await deletecategories(idC);
        fetchCategories();
        fetchQuotes();

    }

    async function deleteQ(idQ) {
        await deleteQuote(idQ);
        fetchQuotes();
    }

    async function handleVote(quoteId, type) {
        setVotes((prevVotes) => ({
            ...prevVotes,
            [quoteId]: {
                ...prevVotes[quoteId],
                [type]: (prevVotes[quoteId]?.[type] || 0) + 1,
            },
        }));
    }




    return (
        <>
            <div className="container">
                <header className="header">
                    <div className="logo">
                        {/* <img src="logo2.png" alt="website Logo"/> */}
                        <h1 onClick={e => GoHome()}>Quote<span className="ly">ly</span></h1>
                    </div>

                    {
                        token && (
                            <button onClick={e => { signout() }} className="btnS">SignOut</button>
                        )
                    }

                    <button className="btn btn-share" onClick={showHideForm}>
                        {formVisible ? 'Close' : 'Share Quote'}
                        {/* GPT helped me with using useRef hook*/}
                    </button>
                </header>

                <form onSubmit={e => handleForm(e)} className={`quote-form ${formVisible ? '' : 'hidden'}`} ref={formRef} >
                    <input onChange={e => setQuoteContent(e.target.value)} required type="text" placeholder="Share a quote with the word ..." />

                    <input onChange={e => setSource(e.target.value)} required type="text" placeholder="trust worthy source" />
                    <select onChange={e => setSelectedCat(e.target.value)}>
                        {categories.map((c, index) => <option key={index} value={index}>{c.name}</option>)}
                    </select>
                    <input type="submit" value="Post" />
                </form>
                <main className="main">
                    <aside>
                        <ul>
                            <li><button className="btn btnall">All</button>
                            </li>
                            {
                                categories.map((cat, index) => (
                                    <li key={index}>
                                        <div>
                                            {
                                                token && (
                                                    <>
                                                        <br />
                                                        <button className="de" onClick={() => deleteC(cat._id)}>
                                                            <span className="mdi mdi-delete mdi-24px"></span>
                                                            <span className="mdi mdi-delete-empty mdi-24px"></span>
                                                            <span>Delete</span>
                                                        </button>
                                                    </>


                                                )
                                            }

                                            <button className="btn cat">{cat.name}</button>
                                        </div>

                                    </li>
                                ))
                            }



                            {
                                token && (
                                    <li><Link to={"/admin"}><button className="addcat">ADD Category</button></Link></li>
                                )
                            }


                        </ul>
                    </aside>
                    <section>
                        <ul>
                            {quote.map((q) => (
                                <li className="fact" key={q._id}>
                                    <p>{q.content} <span className="source" > By : {q.source}</span></p>
                                    <span className="tag">{q.category.name}</span>

                                    <div className="vote">
                                        <button onClick={() => handleVote(q._id, "like")}>
                                            👍 {votes[q._id]?.like || 0}
                                        </button>
                                        <button onClick={() => handleVote(q._id, "love")}>
                                            🤯 {votes[q._id]?.love || 0}
                                        </button>
                                        <button onClick={() => handleVote(q._id, "dislike")}>
                                            ⛔ {votes[q._id]?.dislike || 0}
                                        </button></div>

                                    {
                                        token && (<>

                                            <button onClick={e => deleteQ(q._id)} className="btnd btn-delete">
                                                <span className="mdi mdi-delete mdi-24px"></span>
                                                <span className="mdi mdi-delete-empty mdi-24px"></span>
                                                <span>Delete</span>
                                            </button>
                                            <Link to={`/quote/edit/${q._id}`}>
                                                <button className="btnd btn-delete">
                                                    <span className="mdi mdi-delete mdi-24px"></span>
                                                    <span className="mdi mdi-delete-empty mdi-24px"></span>
                                                    <span>Update</span>
                                                </button>
                                            </Link>


                                        </>


                                        )
                                    }

                                </li>
                            ))
                            }
                        </ul>
                    </section>
                </main>
            </div>
        </>
    );
}