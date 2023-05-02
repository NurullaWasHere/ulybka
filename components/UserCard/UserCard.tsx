

export const UserCard = ({...user}) => {
    console.log(user)
    return (
        <div className="flex flex-col gap-y-4 w-4/5">
                <h1 className="weig font-semibold text-xl">Данные пользвателя</h1>
                <div className="rounded-lg border border-gray-200 px-6 py-4 bg-gray-100 flex flex-col gap-4 w-4/5">
                    <div className="flex flex-row justify-between">
                        <p className="flex justify-center">ID клиента: </p>
                        <p><>{user.user?.id}</></p>
                    </div >
                    <div className="flex flex-row justify-between">
                        <p>Имя: </p>
                        <p> {user.user?.firstname}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Фамилия: </p>
                        <p>{user.user?.lastname}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>ИИН: </p>
                        <p>{user.user?.IIN}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Номер телефона: </p>
                        <p>{user.user?.phone}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Почта: </p>
                        <p>{user.user?.email}</p>
                    </div>
                </div>
            </div>
    )
}