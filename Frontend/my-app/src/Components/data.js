let getData = () =>
{

    const data = [
        {
            pk: 0,
            brand: "Ford",
            name: "Transit",
            image: "https://fordsite.ru/uploads/rewievs/Ford_Transit_2007/autowp.ru_ford_transit_swb_van_1.jpg",
            capacity: 8,
            price: 18000,
            payload: 6,
            description: "Самый лучший способ доставить небольшие вещи",
        },
        {
            pk: 1,
            brand: "Mercedes",
            name: "Actros",
            image: "http://www.truckebook.com/wp-content/uploads/2018/05/mercedes_actros_mp4_1101.jpg",
            capacity: 16,
            payload: 16,
            price: 50000,
            description: "Самый лучший способ доставить безопасно вещи",
        },
        {
            pk: 2,
            brand: "KAMAZ",
            name: "5490",
            image: "https://ic.pics.livejournal.com/kamaz/45416147/291113/291113_original.jpg",
            capacity: 16,
            payload: 16,
            price: 20000,
            description: "Самый русский способ доставить вещи"
        },
        {
            pk: 3,
            brand: "Renault",
            name: "Magnum",
            image: "https://pustojbak.ru/wp-content/uploads/2018/05/maxresdefault-1-1.jpg",
            capacity: 16,
            payload: 16,
            price: 30000,
            description: "Самый средний способ доставить безопасно вещи",
        },
    ]
    return data
}
export default getData