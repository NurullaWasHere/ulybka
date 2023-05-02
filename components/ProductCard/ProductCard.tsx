

export const ProductCard = ({...user}) => {
    console.log(user)
    return (
        <div className="flex flex-col gap-y-4 w-4/5">
                <h1 className="weig font-semibold text-xl">Данные о товаре</h1>
                <div className="rounded-lg border border-gray-200 px-6 py-4 bg-gray-100 flex flex-col gap-4 w-4/5">
                    <div className="flex flex-row justify-between">
                        <p className="flex justify-center">ID товара: </p>
                        <p><>{user.user?.id}</></p>
                    </div >
                    <div className="flex flex-row justify-between">
                        <p>НАЗВАНИЕ: </p>
                        <p> {user.user?.firstname}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>СЕРИЙНЫЙ НОМЕР: </p>
                        <p>{user.user?.lastname}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>СРОК ПРОИЗВОДСТВА: </p>
                        <p>{user.user?.IIN}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>СРОК ГОДНОСТИ: </p>
                        <p>{user.user?.phone}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>В НАЛИЧИЙ: </p>
                        <p>{user.user?.email}</p>
                    </div>
                </div>
            </div>
    )
}