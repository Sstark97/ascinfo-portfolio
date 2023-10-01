import React from "react";
import ClipBoard from "@components/react/ClipBoard";
import ClipBoardChecked from "@components/react/ClipBoardChecked";

interface Props {
    children: React.ReactElement<HTMLElement>;
}

export const CodeBlockToCopy: React.FC<Props> = ({children}) => {
    const [isCopied, setIsCopied] = React.useState(false);
    const [codeText, setCodeText] = React.useState("");
    const codeRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if(codeRef.current) {
            setCodeText(codeRef.current.innerText)
        }
    }, [codeRef])

    const handleCopy = () => {
        navigator.clipboard.writeText(codeText);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    };

    return (
        <pre>
            <button aria-label="Copy code block" className="absolute right-8 text-xl bg-gray-800/40 hover:bg-gray-600/40 rounded px-2 py-1.5" onClick={handleCopy}>{isCopied ? <ClipBoardChecked /> : <ClipBoard />}</button>
            <code ref={codeRef}>
                {children}
            </code>
        </pre>
    );
}