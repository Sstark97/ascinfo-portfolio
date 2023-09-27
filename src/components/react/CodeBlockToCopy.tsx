import React from "react";
import ClipBoard from "./ClipBoard";
import ClipBoardChecked from "./ClipBoardChecked";

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
        <div>
            <button className="text-xl absolute right-2" onClick={handleCopy}>{isCopied ? <ClipBoardChecked /> : <ClipBoard />}</button>
            <code ref={codeRef}>
                {children}
            </code>
        </div>
    );
}