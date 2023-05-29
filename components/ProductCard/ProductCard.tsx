

export const ProductCard = ({...user}) => {
    console.log(user)
    return (
        <div className="flex flex-col gap-y-4 w-4/5">
                <h1 className="weig font-semibold text-xl">Товар</h1>
                <div className="rounded-lg border border-gray-200 px-6 py-4 bg-gray-100 flex flex-col gap-4 w-4/5">
                    <div className="flex flex-row justify-between">
                        <p className="flex justify-center">ID: </p>
                        <p><>{user.user?.id}</></p>
                    </div >
                    <div className="flex flex-row justify-between">
                        <p>АТАУЫ: </p>
                        <p> {user.user?.firstname}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>НӨМЕРІ: </p>
                        <p>{user.user?.lastname}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>ШЫҒАРЫЛУ МЕРЗІМІ: </p>
                        <p>{user.user?.IIN}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>ЖАРАМДЫЛЫҚ МЕРЗІМІ: </p>
                        <p>{user.user?.phone}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>В ҚОЛДАНЫСТА: </p>
                        <p>{user.user?.email}</p>
                    </div>
                </div>
            </div>
    )
}