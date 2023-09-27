import React from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {BsFillClipboardFill, BsFillClipboardCheckFill} from "react-icons/bs";

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
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    };

    return (
        <>
            <CopyToClipboard text={codeText} onCopy={handleCopy}>
                <button className="text-xl absolute right-2" >{isCopied ? <BsFillClipboardCheckFill className="fill-green-400" /> : <BsFillClipboardFill />}</button>
            </CopyToClipboard>
            <code ref={codeRef}>
                {children}
            </code>
        </>
    );
}