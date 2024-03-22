import { Variables, getAllUrlData, getSingleUrlQuery } from "@/Db/hasuraQuery"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"
import {useEffect} from "react"

// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   return {
//     props: { [key: string]: any }
//   }
// }


function UrlRedirect(props:InferGetStaticPropsType<typeof getStaticProps>) {
    const {url_name} = props?.posts
    const router =  useRouter()
    if (router?.isFallback) return <div className="grid place-content-center h-full w-full font-bold text-2xl text-blue-700">Loading...</div>
    useEffect(()=>{
        // window.location.assign(`//${url_name}`);
        if(url_name.includes("https://") || url_name.includes("http://")){
          return window.location.assign(url_name);
        }
        return window.location.assign(`http://${url_name}`);
    },[url_name])
    return
}
   
export async function getStaticProps(context:GetStaticPropsContext) {
    const url = context?.params?.id as string
    if (!url) {
        return {
            props: {},
            revalidate: 10, // In seconds
          }
    }
    const res = await getSingleUrlQuery(url)
    const posts = res?.urls[0]
    
    return {
      props: {
        posts,
      },
      revalidate: 10, // In seconds
    }
  }
   
  export async function getStaticPaths() {
    const res = await getAllUrlData()
    const paths = await res?.data?.urls?.map((post:Partial<Variables> ) => ({
      params: { id: post.new_url },
    }))
    return { paths, fallback: "blocking" }
  }
   
  export default UrlRedirect