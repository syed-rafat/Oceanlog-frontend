import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import axiosInstance from "../../src/lib/axiosInstance";
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
    axiosInstance.post('content/articles/', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
    
    console.log(data)};

  useEffect(() => {
    const importModule = () => {
      setLoaded(true);
    };
    importModule();
  }, []);

  return (
    <>
    <div className="w-full h-40 relative bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>
    <div className="relative p-6 mx-auto w-1/2">
      <h2 className="text-3xl mb-9">Write an article </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <label className="text-xl mb-5 bg-slate-100">Enter title</label>
        <input type="text" className="border mb-6" {...register("title")}></input>
        <label className="text-xl mb-5 bg-slate-100">Write a short description of the article</label>
        <input
          type="text"
          className="border mb-6"
          {...register("description")}
        ></input>
        <label className="text-xl mb-5 bg-slate-100">Select a cover image</label>
        <input
          type="file"
          className="border mb-6"
          {...register("coverImage")}
        ></input>
        <label className="text-xl mb-5 bg-slate-100"> Choose a category</label>
        <select className="border mb-6" {...register("category", { required: true })}>
          <option value="3">Biological oceanography</option>
          <option value="4">Physical Oceanography</option>
          <option value="5">Chemical Oceanography</option>
          <option value="6">Geological oceanography</option>
        </select>
        <label className="text-xl mb-5 mt-7 bg-slate-100">Write your article</label>
        <textarea className="h-0 mb-6" id="content" {...register("content")}></textarea>
        <Editor loaded={loaded} setValue={setValue} className="h-full" />
        <input type="submit"></input>
      </form>
      </div>
    </>
    
  );
}
