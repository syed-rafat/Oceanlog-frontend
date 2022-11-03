import React, {useState, useEffect} from "react";
import dynamic from "next/dynamic";
/**
 * 'Write post here' page built with ckeditor5
 */
 const Editor = dynamic(() => import("../../src/components/TextEditor/Editor"), {ssr: false})

export default function WritePost() {
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        const importModule = () => {
            setLoaded(true)
        }
        importModule()
    }, [])

    return (
        <div className="p-6 m-8">
            <h2>Write an article </h2>
            <Editor loaded={loaded} className="h-2/3"/>
        </div>
    );
}