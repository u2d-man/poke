type Props = {
    types: string[] | undefined;
}

export function TypeCard({types}: Props) {
    let typeClassName: string[][] = []
    if (types) {
        types.map((name) => {
            if (name === "ノーマル") {
                typeClassName.push(["ノーマル", "bg-normal"])
            } else if (name === "かくとう") {
                typeClassName.push(["かくとう", "bg-fighting"])
            } else if (name === "ひこう") {
                typeClassName.push(["ひこう", "bg-flying"])
            } else if (name === "どく") {
                typeClassName.push(["どく", "bg-poison"])
            } else if (name === "じめん") {
                typeClassName.push(["じめん", "bg-ground"])
            } else if (name === "いわ") {
                typeClassName.push(["いわ", "bg-rock"])
            } else if (name === "むし") {
                typeClassName.push(["むし", "bg-bug"])
            } else if (name === "ゴースト") {
                typeClassName.push(["ゴースト", "bg-ghost"])
            } else if (name === "はがね") {
                typeClassName.push(["はがね", "bg-steel"])
            } else if (name === "ほのお") {
                typeClassName.push(["ほのお", "bg-fire"])
            } else if (name === "みず") {
                typeClassName.push(["みず", "bg-water"])
            } else if (name === "くさ") {
                typeClassName.push(["くさ", "bg-grass"])
            } else if (name === "でんき") {
                typeClassName.push(["でんき", "bg-electric"])
            } else if (name === "エスパー") {
                typeClassName.push(["エスパー", "bg-psychic"])
            } else if (name === "こおり") {
                typeClassName.push(["こおり", "bg-ice"])
            } else if (name === "ドラゴン") {
                typeClassName.push(["ドラゴン", "bg-dragon"])
            } else if (name === "あく") {
                typeClassName.push(["あく", "bg-dark"])
            } else {
                typeClassName.push(["フェアリー", "bg-fairy"])
            }
        })
    }

    return (
        <div className="text-white text-center flex">
            { typeClassName.map((set, index) =>
                <p className={"w-24 rounded-md mr-4 " + set[1]} key={index}>{set[0]}</p>) }
        </div>
    );
}
