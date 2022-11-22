import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../src/lib/axiosInstance";
/**
 * 'Write post here' page built with ckeditor5
 */
const Editor = dynamic(() => import("../../src/components/TextEditor/Editor"), {
  ssr: false,
});

export default function WritePost() {
  const [loaded, setLoaded] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("coverImage", data.coverImage[0]);
    formData.append("title", data.title)
    formData.append("content", data.content)
    formData.append("category", data.category)
    formData.append("description", data.description)
    formData.append("tag", "1")
    console.log(formData, "Formdata");


    axiosInstance.post('http://127.0.0.1:8000/content/articles/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }).catch(err=> console.log(err))

    console.log(data);
  };

  useEffect(() => {
    const importModule = () => {
      setLoaded(true);
    };
    importModule();
  }, []);

  return (
    <>
      <div className="w-full h-40 relative bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-yellow-200 via-emerald-200 to-yellow-200 opacity-50"></div>
      <div className="relative p-6 mx-auto w-1/2 shadow-2xl border-2">
        <h2 className="text-3xl mb-9 opacity-90">
          Write an article{" "}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col opacity-90"
        >
          <label className="text-xl text-teal-900 mb-5">Enter title</label>
          <input
            type="text"
            className="border-b-2 mb-10 p-2"
            placeholder="Title"
            {...register("title")}
          ></input>
          <label className="text-xl text-teal-900 mb-5">
            Write a short description of the article
          </label>
          <input
            type="text"
            className="border-b-2 mb-10 p-2"
            placeholder="Description..."
            {...register("description")}
          ></input>
          <label className="text-xl text-teal-900  mb-5">
            Select a cover image
          </label>
          <input
            type="file"
            className="border-b-2 mb-10 p-2"
            placeholder="Select and upload an image"
            {...register("coverImage")}
          ></input>
          <label className="text-xl mb-5 text-teal-900">
            {" "}
            Choose a category
          </label>
          <select
            className="border-b-2 mb-10 p-2 pl-5 rounded-3xl"
            {...register("category", { required: true })}
          >
            <option value="3">Biological oceanography</option>
            <option value="4">Physical Oceanography</option>
            <option value="5">Chemical Oceanography</option>
            <option value="6">Geological oceanography</option>
          </select>
          <label className="text-xl mb-5 mt-7 text-teal-900">
            Write your article
          </label>
          <textarea
            className="h-0 mb-6"
            id="content"
            {...register("content")}
          ></textarea>
          <Editor loaded={loaded} setValue={setValue} className="h-full" />
          <input
            type="submit"
            className="block border m-6 p-2 bg-emerald-800 bg-opacity-20 rounded-2xl hover:bg-opacity-40"
            value="Publish"
          ></input>
        </form>
      </div>
    </>
  );
}
