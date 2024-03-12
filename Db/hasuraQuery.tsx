import GenerateRandomKeys from "@/Componets/GenerateRandomKeys";

export type Variables ={
    date: Date,
    new_url:string,
    url_name:string,
    errors?: string,
}


export async function fetchGraphQL(operationsDoc:string, operationName:string, 
    variables:Partial<Variables>) {
    const result = await fetch(
    "https://saving-gar-96.hasura.app/v1/graphql",
    {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret":"es39cy6eo4ghrYiATK4lTpi31gvJIY1EyKaOPb0rasHqJE773IJONOjRxUqc1F5x"
        },
        body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
        })
    }
    );

    return await result.json();
}

export const hasuraQueryUrlShortner = (url_name:string) => {
    
    const operationsDoc = `
        mutation CreateNewUrlQuery($new_url: String!, $url_name: String!) {
        insert_urls(objects: {new_url: $new_url, url_name: $url_name}) {
            returning {
            new_url
            url_name
            }
        }
        }
    `;
    const new_url:string = GenerateRandomKeys()
    function executeCreateNewUrlQuery() {
        return fetchGraphQL(
        operationsDoc,
        "CreateNewUrlQuery",
        {new_url,url_name}
        );
    }
    
    const startExecuteCreateNewUrlQuery = async():Promise<Partial<Variables>> => {
        const { errors, data } = await executeCreateNewUrlQuery();
        return { errors, ...data.insert_urls.returning[0] }
    }
    type startExecuteCreateNewUrlQueryReturnType =Awaited<ReturnType<typeof startExecuteCreateNewUrlQuery>>

    return startExecuteCreateNewUrlQuery();
}

