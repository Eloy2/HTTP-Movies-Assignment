import React, { useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";

const UpdateForm = ({ update, setUpdate }) => {
    const [ form, setForm ] = useState({
        title: "",
        director: "",
        metascore: "",
        actor1: "",
        actor2: "",
        actor3: ""
    })

    const [ sendTo, setSendTo ] = useState(null);

    const params = useParams();

    const formatForm = (item) => {
        return (
            {
                ...item,
                stars: [
                    item.actor1,
                    item.actor2,
                    item.actor3
                ],
                id: params.id
            }
        )
    }

    const changeHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = e => {
        e.preventDefault();

        var formatedForm = formatForm(form);

        axios.put(`http://localhost:5000/api/movies/${params.id}`, formatedForm)
            .then(res => console.log("Response from update form", res))
            .catch(err => console.log("Error from update form", err))
        
        setForm({
            title: "",
            director: "",
            metascore: "",
            actor1: "",
            actor2: "",
            actor3: ""
        });

        setTimeout(() => {
            setUpdate(Date.now);
        }, 50)

        setSendTo("/");
    }


    if (sendTo){
        return <Redirect to={sendTo}/>
    }
    else {
        return (
            <form onSubmit={submitHandler}>
                <input
                    name="title"
                    placeholder="title"
                    value={form.title}
                    onChange={changeHandler}
                />
                <input
                    name="director"
                    placeholder="director"
                    value={form.director}
                    onChange={changeHandler}
                />
                <input
                    name="metascore"
                    placeholder="metascore"
                    value={form.metascore}
                    onChange={changeHandler}
                />
                <h3>Actors:</h3>
                <input
                    name="actor1"
                    placeholder="actor"
                    value={form.actor1}
                    onChange={changeHandler}
                />
                <input
                    name="actor2"
                    placeholder="actor"
                    value={form.actor2}
                    onChange={changeHandler}
                />
                <input
                    name="actor3"
                    placeholder="actor"
                    value={form.actor3}
                    onChange={changeHandler}
                />
                <button type="submit" >Click here for PUT</button>
            </form>
        )
    }
}

export default UpdateForm;