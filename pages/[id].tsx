import { Variables, getAllUrlData, getSingleUrlQuery } from "@/Db/hasuraQuery";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const UrlRedirect = ({ url_name }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && url_name) {
      const redirectToUrl = async () => {
        if (url_name.includes("https://") || url_name.includes("http://")) {
          window.location.assign(url_name);
        } else {
          window.location.assign(`http://${url_name}`);
        }
      };

      redirectToUrl();
    }
  }, [url_name]);

  if (router.isFallback) {
    return (
      <div className="grid place-content-center h-full w-full font-bold text-2xl text-blue-700">
        Loading...
      </div>
    );
  }

  return null;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const url = context?.params?.id as string;

  if (!url) {
    return {
      props: {},
      revalidate: 10, // In seconds
    };
  }

  const res = await getSingleUrlQuery(url);
  const url_name = res?.urls[0]?.url_name || null;

  return {
    props: {
      url_name,
    },
    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  const res = await getAllUrlData();
  const paths = res?.data?.urls?.map((post: Partial<Variables>) => ({
    params: { id: post.new_url },
  })) || [];

  return { paths, fallback: true };
}

export default UrlRedirect;
