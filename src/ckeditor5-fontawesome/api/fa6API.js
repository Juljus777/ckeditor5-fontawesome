const endpoint = "https://api.fontawesome.com";

export const apiFontAwesome6Search = async ({query = "", version = "6.0.0", count = 5, membership = "free"}) => {
    if (!query) console.err("Incorrect query");

    const {data} = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "query": `query {search (version: \"${version}"\, query: \"${query}\", first: ${count}) {id membership { ${membership} }}}`
        })
    })
        .then(response => response.json())
        .catch(err => {
            console.log(err);
        })
    return data;
}

const iconTypeToClassMap = new Map([
  ["duotone", "fad"],
  ["solid", "fas"],
  ["regular", "far"],
  ["light", "fal"],
]);

export const getIconData = (iconDefinition, membership = 'free') => {
    return;
}
