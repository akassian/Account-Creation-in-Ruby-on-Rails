export enum Routes {
    ROOT = '/',
    ACCOUNT_SELECTION = '/signup/account-selection',
    CREATE_ACCOUNT = '/create-account',
    CREATE_USER = '/signup/create-user',
    JOINT_ACCESS = '/signup/joint-access',
    STOCK_RESTRICTIONS = '/signup/stock-restrictions',
    DEPOSIT = '/signup/deposit'
}

export enum ApiRoutes {
    CREATE_ACCOUNT = '/api/create-account'
}

export enum Status {
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected'
}

export const PUBLIC_ROUTES = [Routes.ROOT, Routes.CREATE_ACCOUNT];