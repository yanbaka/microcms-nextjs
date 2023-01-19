import Link from "next/link";
import { client } from "libs/client";
import { useRouter } from "next/router";

export default function Home({ blog }) {
  const router = useRouter();
  const query = router.query;

  const search = (blog) => {
    if (query.keyword) {
      const index = blog.title.indexOf(query.keyword);
      return index > -1 ? true : false;
    }
  }

  return (
    <div>
      <ul>
        {blog.map((blog) => (
          search(blog) &&
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
  const data = await client.get({
    endpoint: "blog"
  });

  console.log(data.contents)

  return {
    props: {
      blog: data.contents,
    },
  };
};