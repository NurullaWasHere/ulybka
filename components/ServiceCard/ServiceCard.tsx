

export const ServiceCard = ({...service}) => {
    console.log(service)
    return (
        <div className="flex flex-col gap-y-4 w-4/5">
                <h1 className="weig font-semibold text-xl">Сервис туралы ақпарат</h1>
                <div className="rounded-lg border border-gray-200 px-6 py-4 bg-gray-100 flex flex-col gap-4 w-4/5">
                    <div className="flex flex-row justify-between">
                        <p className="flex justify-center">ID: </p>
                        <p><>{service.service?.id}</></p>
                    </div >
                    <div className="flex flex-row justify-between">
                        <p>Атауы: </p>
                        <p> {service.service?.name}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Бағасы: </p>
                        <p>{service.service?.price}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Акция: </p>
                        <p>{service.service?.discount}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Суреті: </p>
                        <p>{service.service?.service_image}</p>
                    </div>
                </div>
            </div>
    )
}