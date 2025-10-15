export async function loginAsDiner(page: any) {
    await page.route('*/**/api/auth', async (route: any) => {
        await route.fulfill({ json: loginAsDinerRes });
    });

    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Login' }).click();

    await page.getByRole('textbox', { name: 'Email address' }).fill(loginAsDinerReq.email);
    await page.getByRole('textbox', { name: 'Password' }).fill(loginAsDinerReq.password);
    await page.getByRole('button', { name: 'Login' }).click();
}

export async function loginAsChangingDiner(page: any) {
    await page.route('*/**/api/auth', async (route: any) => {
        await route.fulfill({ json: loginAsDiner2Res });
    });

    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Login' }).click();

    await page.getByRole('textbox', { name: 'Email address' }).fill(loginAsDiner2Req.email);
    await page.getByRole('textbox', { name: 'Password' }).fill(loginAsDiner2Req.password);
    await page.getByRole('button', { name: 'Login' }).click();
}

export async function loginAsAdmin(page: any) {
    await page.route('*/**/api/auth', async (route: any) => {
        await route.fulfill({ json: loginAsAdminRes });
    })
    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Login' }).click();

    await page.getByRole('textbox', { name: 'Email address' }).fill(loginAsAdminReq.email);
    await page.getByRole('textbox', { name: 'Password' }).fill(loginAsAdminReq.password);
    await page.getByRole('button', { name: 'Login' }).click();
}

export const loginAsDinerReq = { email: 'diner@jwt.com', password: 'diner' };
export const loginAsDinerRes = {
    user: {
        id: 3,
        name: 'fullName',
        email: 'diner@jwt.com',
        roles: [{ role: 'diner' }],
    },
    token: 'fake_token',
};

export const loginAsDiner2Req = { email: 'diner@jwt.com', password: 'diner' };
export const loginAsDiner2Res = {
    user: {
        id: 3,
        name: 'fullName',
        email: 'diner@jwt.com',
        roles: [{ role: 'diner' }],
    },
    token: 'fake_token',
};

export const loginAsAdminReq = { email: 'email@jwt.com', password: 'adminPassword' };
export const loginAsAdminRes = {
    user: {
        id: 1,
        name: "super",
        email: "email@jwt.com",
        roles: [
            {
                objectId: 0,
                role: "admin"
            }
        ]
    },
    token: "admin_token"
}

export const registerReq = { name: "fullName" ,email: 'diner@jwt.com', password: 'diner' };
export const registerRes = {
    user: {
        name: "fullName",
        email: "diner@jwt.com",
        roles: [{ role: "diner" }],
        id: 3
    },
    token: "fake_token"
};

export const menuRes = [
    {
        id: 1,
        title: "Veggie",
        image: "pizza1.png",
        price: 0.0038,
        description: "A garden of delight"
    },
    {
        id: 2,
        title: "Pepperoni",
        image: "pizza2.png",
        price: 0.0042,
        description: "Spicy treat"
    },
    {
        id: 3,
        title: "Margarita",
        image: "pizza3.png",
        price: 0.0042,
        description: "Essential classic"
    },
    {
        id: 4,
        title: "Crusty",
        image: "pizza4.png",
        price: 0.0028,
        description: "A dry mouthed favorite"
    },
    {
        id: 5,
        title: "Charred Leopard",
        image: "pizza5.png",
        price: 0.0099,
        description: "For those with a darker side"
    }
]

export let franchiseRes = {
    franchises: [
        {
            id: 1,
            name: "pizzaPocket",
            stores: [
                {
                    id: 1,
                    name: "SLC"
                },
                {
                    id: 2,
                    name: "test loc"
                }
            ]
        }
    ],
    more: false
}

const originalFranchiseRes = {
    franchises: [
        {
            id: 1,
            name: "pizzaPocket",
            stores: [
                {
                    id: 1,
                    name: "SLC"
                },
                {
                    id: 2,
                    name: "test loc"
                }
            ]
        }
    ],
    more: false
}

export const meRes = {
    name: "fullName",
    email: "diner@jwt.com",
    roles: [{ role: "diner" }],
    id: 3,
    iat: 1759442593
}

export const pizzaOrderRes = {
    order: {
        items: [
            {
                menuId: 1,
                description: "Veggie",
                price: 0.0038
            }
        ],
        storeId: "1",
        franchiseId: 1,
        id: 11
    },
    jwt: "eyJpYXQiOjE3NTk0NDQyNTAsImV4cCI6MTc1OTUzMDY1MCwiaXNzIjoiY3MzMjkuY2xpY2siLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9TcF94VzhlM3kwNk1KS3ZIeW9sRFZMaXZXX2hnTWxhcFZSUVFQVndiY0UifQ.eyJ2ZW5kb3IiOnsiaWQiOiJzY2xpbmdvIiwibmFtZSI6IlNwZW5jZXIgQ2xpbmdvIn0sImRpbmVyIjp7ImlkIjo0NSwibmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAbWUifSwib3JkZXIiOnsiaXRlbXMiOlt7Im1lbnVJZCI6MSwiZGVzY3JpcHRpb24iOiJWZWdnaWUiLCJwcmljZSI6MC4wMDM4fV0sInN0b3JlSWQiOiIxIiwiZnJhbmNoaXNlSWQiOjEsImlkIjoxMX19.L39AwtMdH1FhAtrcjrOHvr9oOQFKg3ECTxe6FmpsRqcQCaOSELCGq1X9dZ5pLLPfbGp6vIhhrTGY6feeZqqpK5FC-dQTbxiWsXZ1T58hxpeNnhrstBNzGp4FBAu_AJ7M6FuM-EP79cZHhgkPVtYaH5Oc3qcVE34h0ejghwOdDb58UZXfDTQDzvL-8cfit7W83AU0iFLKD-s7MpiZfpDhuq43NuCKs6JaVYVJiMTpdlm899w1tCSnZoyz0WuzYIGHvjnfzGxKRalTEOpicppo24O-g4MS3jl6bQI-2u9HjAMQ9DhYe5pU6ZX5vc-J1CrqUWArhQLQXE3H4BFgzb6-BQ5MjWoZ3rMrtzMLH-0IxA55c8yfZ0XXaZQeC6_YVyE4Sgr_j58bhpcZWvMM3yhHGLaf1pZHkyo17Ka4yBOVZML-J0i5ex01mr-u3LVFfl8tyjyV0qsCP3QkbYBdqg64tbFIXE3CFFTU22Iw_xkvxuarwkB_QF0dQCgUtRsysp91xbnujUFpzhHLCp5oFPVB-AlxHpGJbB36vXZJsYc4sqMGlJF-dRwPf2gNpbeRPQSmIYXq3DvH425n-BNAu-v_KYZSynnmoIVejQIdgGvDg2Eacc_kI8Ot8sFG-egBKgykrxKaAAksMRd7QzXwFkA-NpVvWkwMdB0ccCJTxBurySA"
}

export const createFranchiseReq = {
    stores: [],
    id: "",
    name: "testFranchise",
    admins: [
        {
            email: "existingEmail@jwt.com"
        }
    ]
}
export const createFranchiseRes = {
    stores: [],
    id: 2,
    name: "testFranchise",
    admins: [
        {
            email: "existingEmail@jwt.com",
            id: 3,
            name: "existingUser"
        }
    ]
}
export const getAllUsersRes = {
    more: false,
    users: [
        {
            id: 1,
            name: "fullName",
            email: "existingEmail@jwt.com",
            roles: "diner, franchisee"
        },
        {
            id: 2,
            name: "name",
            email: "existingEmail@jwt.com",
            roles: "diner"
        },
        {
            id: 3,
            name: "admin",
            email: "admin@jwt.com",
            roles: "admin"
        }
    ]
}

export async function setupMocks(page: any) {
    await page.route('*/**/api/order/menu', async (route: any) => {
        await route.fulfill({ json: menuRes });
    });
    await page.route('*/**/api/franchise?page=0&limit=*&name=*', async (route: any) => {
        await route.fulfill({ json: franchiseRes });
        franchiseRes = originalFranchiseRes;
    });
    await page.route('*/**/api/user?page=0&limit=*&name=*', async (route: any) => {
        await route.fulfill({ json: getAllUsersRes})
    })
    await page.route('*/**/api/user/me', async (route: any) => {
        await route.fulfill({ json: meRes });
    });
    await page.route('*/**/api/order', async (route: any) => {
        await route.fulfill({ json: pizzaOrderRes })
    });
    await page.route('*/**/api/franchise', async (route: any) => {
        franchiseRes.franchises.push(createFranchiseRes)
        await route.fulfill({ json: createFranchiseRes });
    });
    await page.route(/api\/user\/(?!me$).*/, async (route: any) => {
        const requestBody = route.request().postDataJSON();
        loginAsDiner2Res.user.name = requestBody.name;
        await route.fulfill({ json: loginAsDiner2Res });
    });
}

export async function createFranchise(page: any) {
    await page.getByRole('link', { name: 'Admin' }).click();

    await page.getByRole('button', { name: 'Add Franchise' }).click();
    await page.getByRole('textbox', { name: 'franchise name' }).fill(createFranchiseReq.name);
    await page.getByRole('textbox', { name: 'franchisee admin email' }).fill(createFranchiseReq.admins[0].email);
    await page.getByRole('button', { name: 'Create' }).click();
}