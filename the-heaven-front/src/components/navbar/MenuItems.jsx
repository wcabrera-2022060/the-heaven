export const MenuItems = [
    {
        title: 'Home',
        url: '/',
        cName: 'nav-links',
        icon: 'fa-solid fa-house-chimney',
    },
    {
        title: 'Hotels',
        url: '/hotels',
        cName: 'nav-links',
        icon: 'fa-solid fa-circle-info',
    },
    {
        title: 'About us',
        url: '/aboutus',
        cName: 'nav-links',
        icon: 'fa-solid fa-briefcase',
    },
    {
        title: 'Admin',
        cName: 'nav-links',
        icon: 'fa-solid fa-user',
        subItems: [
            {
                title: 'Hotel',
                url: '/hotelA',
                cName: 'nav-links btn',
            },
            {
                title: 'Reservation',
                url: '/reservationA',
                cName: 'nav-links btn',
            },
            {
                title: 'Room',
                url: '/roomA',
                cName: 'nav-links btn',
            },
            {
                title: 'Service',
                url: '/serviceA',
                cName: 'nav-links btn',
            },

            {
                title: 'Event',
                url: '/EventA',
                cName: 'nav-links btn',
            },
        ],
    },
    {
        title: 'Sign in',
        url: '/signin',
        cName: 'nav-links btn',
    },
]
