import GenerateRandomKeys from "@/Componets/GenerateRandomKeys";

export type Variables ={
    date: Date | (() => number),
    new_url:string,
    url_name:string,
    url?:string,
    errors?: string,
    report?: string,
    user?: string,
}


export async function fetchGraphQL(operationsDoc:string, operationName:string, 
    variables:Partial<Variables>) {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_HASURA_URL}`,
    {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret": `${process.env.NEXT_PUBLIC_HASURA_USER_SECRET_KEY}`
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

export const hasuraQueryUrlReport = (url:string,report:string,user:string) => {
    const date = new Date();
  const operationsDoc = `
    mutation UrlReport($url: String!, $report: String!, $date: date, $user: String!) {
      insert_reported_site(objects: {date: $date, url: $url, user: $user, report: $report}) {
        returning {
          url
        }
      }
    }
  `;

  
  function executeUrlReport() {
    return fetchGraphQL(
      operationsDoc,
      "UrlReport",
      {url,report,date,user}
    );
  }

  const startExecuteUrlReportMutation = async():Promise<Partial<Variables>> => {
      const { errors, data } = await executeUrlReport();
      return { errors, ...data }
  }
  type startExecuteCreateNewUrlQueryReturnType =Awaited<ReturnType<typeof startExecuteUrlReportMutation>>
  return startExecuteUrlReportMutation();
}


export const getAllUrlData = async () => {
  
  const operationsDoc = `
    query GetAllUrl {
      urls {
        new_url
        id
        url_name
      }
    }
  `;

  function fetchGetAllUrl() {
    return fetchGraphQL(
      operationsDoc,
      "GetAllUrl",
      {}
    );
  }

  const startFetchGetAllUrl = async() => {
      const { errors, data } = await fetchGetAllUrl();
      return { errors, data }
  }

  type startExecuteCreateNewUrlQueryReturnType =Awaited<ReturnType<typeof startFetchGetAllUrl>>
  return startFetchGetAllUrl();

}


export async function getSingleUrlQuery(url:string) {

  const operationsDoc = `
    query MyQuery {
      urls(where: {new_url: {_eq: ${url}}}) {
        id
        url_name
        new_url
      }
    }
  `;

  function fetchMyQuery() {
    return fetchGraphQL(
      operationsDoc,
      "MyQuery",
      {}
    );
  }


  const { errors, data } = await fetchMyQuery();
  if (errors) {
    return errors
  }
  return data
}

  
