import React from "react";
import {ClipBoard} from "@components/react/clipBoard";
import {ClipBoardChecked} from "@components/react/clipBoardChecked";

interface Props {
    children: React.ReactElement<HTMLElement>;
    onCopy?: (text: string) => void;
}

export const CodeBlockToCopy: React.FC<Props> = ({children, onCopy}) => {
    const [isCopied, setIsCopied] = React.useState(false);
    const [codeText, setCodeText] = React.useState("");
    const codeRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if(codeRef.current) {
            setCodeText(codeRef.current.innerText)
        }
    }, [codeRef])

    const copyToClipboard = (text: string) => {
        onCopy ? onCopy(text) : navigator.clipboard.writeText(text);
    }

    const handleCopy = () => {
        copyToClipboard(codeText);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    };

    return (
        <pre className="my-3">
            <button aria-label="Copy code block" className="absolute right-8 text-xl bg-gray-800/40 hover:bg-gray-600/40 rounded px-2 py-1.5" onClick={handleCopy}>{isCopied ? <ClipBoardChecked /> : <ClipBoard />}</button>
            <code className="flex" ref={codeRef}>
                {children}
            </code>
        </pre>
    );
}