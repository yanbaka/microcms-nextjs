import Link from "next/link";
import { client } from "libs/client";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home({ blog, category, tag }) {
  const { asPath } = useRouter

  useEffect(() => {
    try {
      const script = document.createElement('script');

      script.src = "https://cse.google.com/cse.js?cx=258808720498d42a4";
      script.async = true;

      document.body.appendChild(script);
      document.body.removeChild(script);

    } catch (error) {
      console.error(error);
    }
  }, [asPath])

  return (
    <div>
      <h3>サイト内検索</h3>
      <div className="gcse-search"></div>
      <h3>タグ一覧</h3>
      <ul>
        {tag.map((tag) => (
          <li key={tag.id}>
            <Link href={`/tag/${tag.id}`}>{tag.name}</Link>
          </li>
        ))}
      </ul>
      <h3>カテゴリー一覧</h3>
      <ul>
        {category.map((category) => (
          <li key={category.id}>
            <Link href={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
      <h3>記事一覧</h3>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });
  // カテゴリーコンテンツの取得
  const categoryData = await client.get({ endpoint: "categories" });
  // タグ
  // const tagData = await client.get({ endpoint: "blog", queries: { filters: `tags[contains]jh4uru737` } });
  const tagData = await client.get({ endpoint: "tags" });

  return {
    props: {
      blog: data.contents,
      category: categoryData.contents,
      tag: tagData.contents,
    },
  };
};