const endpoint = "https://api.fontawesome.com";

export const apiFontAwesome6Search = async ({query = "", version = "6.0.0", count = 5}) => {
    if (!query) console.err("Incorrect query");

    const {data} = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "query": `query {search (version: \"${version}"\, query: \"${query}\", first: ${count}) {id}}`
        })
    })
        .then(response => response.json())
        .catch(err => {
            console.log(err);
        })
    return data;
}
