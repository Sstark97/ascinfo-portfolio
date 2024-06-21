const capitalizeFirstWordAndNouns = (index: number, word: string) => {
    const excludeList = ["de", "la", "y", "en", "el", "los"]; // Añade las palabras que quieras excluir
    if (index === 0 || !excludeList.includes(word.toLowerCase())) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
        return word.toLowerCase();
    }
};

const capitalizeTitle = (title: string): string => {
    return title.split("-")
        .map((word, index) => capitalizeFirstWordAndNouns(index, word))
        .join(" ");
}

export {
    capitalizeTitle
}