

export const ServiceCard = ({...service}) => {
    console.log(service)
    return (
        <div className="flex flex-col gap-y-4 w-4/5">
                <h1 className="weig font-semibold text-xl">Данные сервиса</h1>
                <div className="rounded-lg border border-gray-200 px-6 py-4 bg-gray-100 flex flex-col gap-4 w-4/5">
                    <div className="flex flex-row justify-between">
                        <p className="flex justify-center">ID сервиса: </p>
                        <p><>{service.service?.id}</></p>
                    </div >
                    <div className="flex flex-row justify-between">
                        <p>Имя: </p>
                        <p> {service.service?.name}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Цена: </p>
                        <p>{service.service?.price}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Скидка: </p>
                        <p>{service.service?.discount}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Ссылка изображения: </p>
                        <p>{service.service?.service_image}</p>
                    </div>
                </div>
            </div>
    )
}