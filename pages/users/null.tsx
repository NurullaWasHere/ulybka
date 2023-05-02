import { FC } from "react";


const NullUser: FC = () => {
    return ( 
        <div className="mt-7 border-l border-gray-400 background-white flex flex-row gap-y-3 gap-x-7 w-4/5 justify-center">
            <h1 className="font-semibold text-lg">Пользвателя не существует!</h1>
        </div>
    )
}

export default NullUser