import React, { useEffect, useRef } from 'react'
// Dynamically import ReactQuill to avoid SSR issues
import Quill, { QuillOptions } from "quill"
import 'quill/dist/quill.snow.css';

const Editor = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const container = containerRef.current

        const editorContainer =container?.appendChild(container.ownerDocument.createElement('div'))


        const options : QuillOptions ={
            theme: "snow"
        }

        new Quill(editorContainer,options)

        return () => {
            if(container)
            container.innerHTML = ""
        }
    },[])

    return (
        <div>
            <div className=" h-full ql-custom border-2 border-slate-200 rounded-md" 
                ref={containerRef}
            />

        </div>
    )
}

export default Editor