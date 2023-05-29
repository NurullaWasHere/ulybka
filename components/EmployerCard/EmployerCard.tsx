

export const EmployerCard = ({...employer}) => {
    console.log(employer)
    return (
        <div className="flex flex-col gap-y-4 w-4/5">
                <h1 className="weig font-semibold text-xl">Жұмыскерлер</h1>
                <div className="rounded-lg border border-gray-200 px-6 py-4 bg-gray-100 flex flex-col gap-4 w-4/5">
                    <div className="flex flex-row justify-between">
                        <p className="flex justify-center">Жұмыскер номері: </p>
                        <p><>{employer.employer?.id}</></p>
                    </div >
                    <div className="flex flex-row justify-between">
                        <p>Аты: </p>
                        <p> {employer.employer?.firstname}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Жөні: </p>
                        <p>{employer.employer?.lastname}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Қызметі: </p>
                        <p>{employer.employer?.job}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Ұялы телефоны: </p>
                        <p>{employer.employer?.phone}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Почта: </p>
                        <p>{employer.employer?.email}</p>
                    </div>
                </div>
            </div>
    )
}