import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useDataTable } from "../../../../hooks/useDataTable";
import { deletePost, getAllPostsForUser } from "../../../../services/index/posts";
import { userActions } from "../../../../store/reducers/userReducers";
import { images, stables } from "../../../../constants";
import DataTable from "../../components/DataTable";
import { toast } from "react-hot-toast";

const MemberManagePosts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  

  const {
    currentPage,
    searchKeyword,
    data: postsData,
    isLoading,
    isFetching,
    setCurrentPage,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
  } = useDataTable({
    dataQueryFn: () => getAllPostsForUser(userState.userInfo._id, searchKeyword, currentPage),
    dataQueryKey: "memberPosts",
    deleteDataMessage: "Post is deleted",
    mutateDeleteFn: ({ slug }) => {
      return deletePost({ slug, token: userState.userInfo.token });
    },
  });

  return (
    <DataTable
      pageTitle="Member Posts"
      dataListName="Posts"
      searchInputPlaceHolder="Post title..."
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={["Title", "Category", "Created At", "Tags", ""]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={postsData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={postsData?.headers}
    >
      {postsData?.data.map((post) => (
        <tr key={post.slug}>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">
                  <img
                    src={
                      post?.photo
                        ? stables.UPLOAD_FOLDER_BASE_URL + post?.photo
                        : images.samplePostImage
                    }
                    alt={post.title}
                    className="mx-auto object-cover rounded-lg w-10 aspect-square"
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">{post.title}</p>
              </div>
            </div>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {post.categories.length > 0
                ? post.categories
                    .slice(0, 3)
                    .map(
                      (category, index) =>
                        `${category.title}${
                          post.categories.slice(0, 3).length === index + 1
                            ? ""
                            : ", "
                        }`
                    )
                : "Uncategorized"}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex gap-x-2">
              {post.tags.length > 0
                ? post.tags.map((tag, index) => (
                    <p key={index}>
                      {tag}
                      {post.tags.length - 1 !== index && ","}
                    </p>
                  ))
                : "No tags"}
            </div>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
            <button
              type="button"
              className="text-red-600 hover:text-red-900"
              onClick={() => {
                deleteDataHandler({ slug: post?.slug });
              }}
            >
              Delete
            </button>
            <Link
              to={`/member/posts/manage/edit/${post?.slug}`}
              className="text-green-600 hover:text-green-900"
            >
              Edit
            </Link>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default MemberManagePosts;
